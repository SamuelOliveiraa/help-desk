import Image from "next/image";
import Link from "next/link";
import Button from "/src/components/Button";
import ContentContainer from "/src/components/ContentContainer";

export default function Login() {
  return (
    <div className="w-full h-full bg-[url('/background.png')] bg-cover bg-center flex items-center justify-end overflow-hidden ">
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
                <h2>Acesse o portal</h2>
                <p>Entre usando seu e-mail e senha cadastrados</p>
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
                <Link href={"/dashboard"}>
                  <span className="font-bold">Entrar</span>
                </Link>
              </Button>
            </form>
          </ContentContainer>

          <ContentContainer>
            <div>
              <h2>Ainda não tem uma conta?</h2>

              <p>Cadastre agora mesmo</p>
            </div>

            <Button fullWidth>
              <Link href={"/register"}>Criar Conta</Link>
            </Button>
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}
