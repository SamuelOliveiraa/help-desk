"use server";

import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { sendEmail } from "@/lib/mailjet";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // verificar se o usuario existe
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "E-mail informado não existe, por favor cadastre-se.",
        },
        { status: 401 },
      );
    }

    // Gerar token (ex: 6 digitos numericos)
    const token = Math.floor(100000 + Math.random() * 90000).toString();

    // Expira em 10 minutos
    // const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const expiresAt = new Date(Date.now() + 30 * 1000); // 30 segundos

    // Caso exista tokens antigos do usuario, apagamos
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Criamos um passwordResetToken no banco
    const newPasswordToken = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #0070f3;">Olá, ${user.name}</h2>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Help Desk</strong>.</p>

            <p>
              Se foi você, clique no botão abaixo para criar uma nova senha:
            </p>
            
            <p style="margin: 20px 0; text-align: center;">
              <a
                href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${newPasswordToken.id}" 
                style="background-color: #0070f3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                Redefinir minha senha
              </a>
            </p>

            <p>Se você não fez essa solicitação, basta ignorar este e-mail.</p>

            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />

            <p style="font-size: 12px; color: #888888;">Este link expira em 10 minutos.</p>
            <p style="font-size: 12px; color: #888888;">Help Desk &copy; 2025</p>
          </div>
    `;

    // Enviamos o e-mail para o cliente
    const mailjetResponse = await sendEmail({
      to: email,
      name: user.name,
      subject: "Resetar a senha de usuario do Help Desk",
      html,
    });

    return NextResponse.json({
      message: "E-mail enviado com sucesso! Acesse sua caixa de e-mails.",
      tokenID: newPasswordToken.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          "Erro interno de servidor, por favor tente novamente. (backend)",
      },
      { status: 500 },
    );
  }
}
