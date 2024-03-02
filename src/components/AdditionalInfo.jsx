"use client";
import useAddress from "@/app/hooks/use-address";
import { useState } from "react";

export default function AdditionalInfo() {
  const addressState = useAddress();

  const [additionalInfo, setAdditionalInfo] = useState({
    attentionName: "",
    commentsShipping: "",
  });

  // const form = useRef(null);

  const handleChange = (e) => {
    setAdditionalInfo({
      ...additionalInfo,
      [e.target.name]: e.target.value,
    });
    // console.log(additionalInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addressState.addAdditionalInfo(additionalInfo);
    window.location.href = "/dashboard/checkout";
    // setAdditionalInfo({
    //   ...additionalInfo,
    //   [e.target.name]: e.target.value,
    // });
    // console.log(additionalInfo);
  };

  return (
    <form
      className="px-8 pt-6 pb-8 mb-4 bg-white"
      onSubmit={handleSubmit}
      // ref={form}
    >
      <label
        htmlFor="attentionName"
        className="block mb-2 text-sm font-bold text-primaryBlue"
      >
        {/* {lang[params.lang]["item-name"]}: */}
        Nombre de la persona quien recibe el pedido:
      </label>
      <input
        name="attentionName"
        type="text"
        onChange={handleChange}
        className="w-full px-3 py-2 border shadow appearance-none"
        required
        autoFocus
      />

      <label
        htmlFor="commentsShipping"
        className="block my-2 text-sm font-bold text-primaryBlue"
      >
        {/* {lang[params.lang]["units-package"]}: */}
        Comentarios adicionales:
      </label>
      <textarea
        name="commentsShipping"
        onChange={handleChange}
        className="w-full px-3 py-2 border shadow appearance-none"
      />
      <br />
      <br />
      {/* <a
        href={`/dashboard/checkout`}
        className="px-4 py-2 mt-5 text-xs text-white shadow bg-primaryBlue md:text-sm"
      >
        Finalizar pedido
      </a> */}
      <button
        // onClick={handleSubmit}
        className="block w-full px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
      >
        Finalizar pedido
      </button>
    </form>
  );
}
