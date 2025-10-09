import Image from "next/image";
import Link from "next/link";
import Button from "/src/components/Button";
import ContentContainer from "/src/components/ContentContainer";

export default function Register() {
  return (
    <div className="w-full h-full bg-[url('/background.png')] bg-cover bg-center flex items-center justify-end md:overflow-hidden ">
      <div className="flex flex-1 max-w-2xl rounded-3xl bg-white h-full px-6 py-8 md:px-0 relative -bottom-10 md:items-center justify-center md:-bottom-4 md:-right-5 ">
        <div className="max-w-sm w-full flex flex-col gap-6 items-center">
          <Image
            alt="Logo do site HelpDesk"
            src={"/logo-help-desk.png"}
            width={130}
            height={130}
          />

          <ContentContainer>
            <form className="flex flex-col gap-4">
              <div>
                <h2>Cire sua conta</h2>
                <p>Informe seu nome, e-mail e senha</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="uppercase text-xs">
                  Nome
                </label>
                <input
                  type="text"
                  className="border p-3 border-gray-200 rounded-md"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="uppercase text-xs">
                  E-mail
                </label>
                <input
                  type="email"
                  className="border p-3 border-gray-200 rounded-md"
                  placeholder="exemplo@mail.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="uppercase text-xs">
                  senha
                </label>
                <input
                  type="password"
                  className="p-3 border border-gray-200 rounded-md"
                  placeholder="Digite sua senha"
                />
              </div>

              <Button type="secondary" fullWidth>
                <span className="font-bold">Cadastrar</span>
              </Button>
            </form>
          </ContentContainer>

          <ContentContainer>
            <div>
              <h2>Já tem uma conta?</h2>

              <p>Entre agora mesmo</p>
            </div>

            <Button fullWidth>
              <Link href={"/login"}>Acessar Conta</Link>
            </Button>
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}
