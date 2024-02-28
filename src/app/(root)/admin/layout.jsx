import NavbarAdmin from "@/components/NavbarAdmin";
import { getDictionary } from "@/utils/dictionary";

export default async function AdminLayout({ children, params }) {
  const lang = await getDictionary("es");
  // console.log(params.lang);
  return (
    <>
      <NavbarAdmin lang={lang} langparam={"es"} />
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
