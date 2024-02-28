import Navbar from "@/components/Navbar";
import { getDictionary } from "@/utils/dictionary";

export default async function DashboardLayout({ children, params }) {
  const lang = await getDictionary("es");
  return (
    <>
      <Navbar lang={lang}></Navbar>
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
