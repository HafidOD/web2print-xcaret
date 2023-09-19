import FormLogin from "@/components/FormLogin";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex-col items-center min-h-screen justify-evenly bg-[url('/images/layout/Triangulos.png')] bg-no-repeat bg-right-bottom bg-[length:350px] bg-fixed">
      <div className="grid min-h-screen md:grid-cols-2 bg-[url('/images/layout/triangulo.png')] bg-no-repeat bg-left-top bg-[length:250px] bg-fixed">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-light md:text-7xl text-primaryBlue">
            Bienvenido
          </h2>
          <h2 className="text-5xl font-bold md:text-7xl text-primaryBlue lg:ml-[-200px]">
            Welcome
          </h2>
        </div>
        <div className="flex flex-col items-center justify-evenly lg:mr-40">
          <div className="">
            <Image
              className=""
              src="/web2print.svg"
              alt="Web 2 Print Logo"
              width={250}
              height={100}
              priority
            />
          </div>
          <FormLogin></FormLogin>
          <div className="">
            <Image
              className=""
              src="/Logopowered.svg"
              alt="Web 2 Print Logo"
              width={180}
              height={81}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
