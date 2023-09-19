import SummaryAddress from "@/components/SummaryAddress";
import SummaryProducts from "@/components/SummaryProducts";
import ExButt from "./components/ExButt";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const GeneratePDF = async () => {
  const { user } = await getServerSession(authOptions);
  // console.log(user.id);
  // console.log(user);
  return (
    <div>
      <div className="flex flex-col justify-center m-4 md:flex-row">
        <div className="p-6 mx-2 mb-4 bg-white rounded-lg shadow-lg md:w-2/5 md:mb-0">
          <h3 className="mb-4 text-xl font-bold text-center text-primaryBlue">
            Resumen de compra
          </h3>
          <SummaryProducts></SummaryProducts>
        </div>
        <div className="p-6 mx-2 align-middle bg-white rounded-lg shadow-lg md:w-2/5">
          <h3 className="mb-4 text-xl font-bold text-center text-primaryBlue">
            Dirección de envío
          </h3>
          <SummaryAddress></SummaryAddress>
        </div>
      </div>
      <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
        <div className="flex justify-center mb-4">
          <ExButt user={user}></ExButt>
        </div>
      </div>
    </div>
  );
};

export default GeneratePDF;
