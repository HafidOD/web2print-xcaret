import AdditionalInfo from "@/components/AdditionalInfo";
export default async function EntregaPage() {
  return (
    <div className="w-full px-2 py-16 m-auto md:w-2/5 sm:px-0">
      <h2 className="mb-5 text-2xl text-primaryBlue">Información de entrega</h2>

      <section className="">
        <div className="w-full p-2 my-3 bg-white rounded-lg shadow-2xl">
          <AdditionalInfo />
        </div>
      </section>
    </div>
  );
}
