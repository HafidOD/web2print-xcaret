"use client";
// import PritingForm from "./PrintingForm";
import toast from "react-hot-toast";
// import { Stage, Layer, Text } from "react-konva";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import useCart from "@/app/hooks/use-cart";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContentForm({ product, user, params }) {
  // console.log(params);
  const [isMounted, setIsMounted] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const cart = useCart();
  const isTarjeta = product.categories.some(
    (categoria) => categoria.categoryName === "Tarjetas"
  );
  // console.log(isTarjeta);
  const prices = { 1: "priceLocal", 2: "priceNacional", 3: "priceExtE" };
  // const priceProduct = product[prices[user.typePrice]];
  // console.log(priceProduct);
  product.priceExtE = Math.round(product.priceLocal / 18.5);
  const data = {
    ...product,
    currency: user.currency,
    price: product[prices[user.typePrice]],
  };
  const [formData, setFormData] = useState({
    cardName: "",
    position: "",
    position2: "",
    position3: "",
    cardEmail: "",
    cardPhone: "",
    cardExt: "",
    cardPhone2: "",
    cardAddress: "",
    cardCP: "",
    cardComments: "",
    cardQuantity: null,
  });

  // const [imageData, setImageData] = useState(null);
  const tableRef = useRef();
  const paragraphRef = useRef(null);

  const handleCapture = async () => {
    const table = tableRef.current;

    try {
      const canvas = await html2canvas(table);
      const dataUrl = canvas.toDataURL("image/png");
      const response = await fetch(`${URL}/save-img/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUrl),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      data.imgTarjeta = res.imageName;
      // console.log(res.imageName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenPDF = async () => {
    // Obtén el elemento de la tabla por su id o clase
    const element = document.getElementById("tarjeta");

    // Configura las opciones para la generación del PDF
    const options = {
      margin: 10,
      filename: "documento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const pdf = await html2pdf().set(options).from(element).save();
  };

  // const [state, setState] = useState({
  //   isDragging: false,
  //   x: 500,
  //   y: 0,
  // });

  const form = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lógica de formato específica para cada campo
    let formattedValue = value;
    if (name === "cardPhone") {
      formattedValue = formatPhoneNumber(value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(dataForm);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Lógica de formato para el número de teléfono
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Extraer los segmentos del número
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    // Si hay coincidencias, formatear el número
    if (match) {
      phoneNumber = "(" + match[1] + ") " + match[2] + " - " + match[3];
      console.log(phoneNumber);
    }

    // return phoneNumber; // Devuelve el número formateado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTarjeta) {
      if (
        !formData.cardName ||
        !formData.cardEmail ||
        !formData.position ||
        !formData.cardPhone ||
        !formData.cardQuantity
      ) {
        const camposVacios = [];

        if (!formData.cardName && isTarjeta) {
          camposVacios.push("Nombre");
        }

        if (!formData.cardEmail && isTarjeta) {
          camposVacios.push("Correo");
        }

        if (!formData.position && isTarjeta) {
          camposVacios.push("Cargo");
        }

        if (!formData.cardPhone && isTarjeta) {
          camposVacios.push("Teléfono");
        }
        if (!formData.cardQuantity) {
          camposVacios.push("Cantidad");
        }
        // console.log(e);
        // toast.error("Por favor, completa todos los campos obligatorios.");
        const mensaje = `Por favor, completa los siguientes campos obligatorios: ${camposVacios.join(
          ", "
        )}.`;

        toast.error(mensaje);
        return;
      }
      await handleCapture();
    }
    data.quantity = formData.cardQuantity;
    data.formData = formData;
    data.total = data.price;
    cart.addItem(data);
    setAddItem(true);
    // window.location.href = `/${lang}/dashboard/thankyou?saleId=${data.sale.id}&email=${primaryEmail}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="grid-cols-2 gap-10 lg:grid justify-items-center">
      <div className="w-full p-2 my-3 bg-white rounded-lg shadow-2xl md:w-2/3">
        <div className="w-full p-2 my-3 bg-white">
          {/* <PritingForm onSubmit={handleFormSubmit} /> */}
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-white"
            onSubmit={handleSubmit}
            ref={form}
          >
            {isTarjeta ? (
              <>
                <label
                  htmlFor="cardName"
                  className="block mb-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["item-name"]}: */}
                  Nombre
                  <i className="font-light">
                    <span className="text-red-700"> *</span>
                  </i>
                </label>
                <input
                  name="cardName"
                  type="text"
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                  autoFocus
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="position"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  Cargo:
                  <i className="font-light">
                    <span className="text-red-700"> *</span>
                  </i>
                </label>
                <input
                  name="position"
                  type="text"
                  maxLength={57}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="position2"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["local-price"]}: */}
                  Cargo 2
                </label>
                <input
                  name="position2"
                  type="text"
                  maxLength={50}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="position3"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["national-price"]}: */}
                  Cargo 3
                </label>
                <input
                  name="position3"
                  type="text"
                  maxLength={50}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="cardEmail"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["product-description"]}: */}
                  Correo
                  <i className="font-light">
                    <span className="text-red-700"> *</span>
                  </i>
                </label>
                <input
                  name="cardEmail"
                  type="email"
                  maxLength={27}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <div className="flex">
                  <div className="w-3/5 pr-2">
                    <label
                      htmlFor="cardPhone"
                      className="block my-2 text-sm font-bold text-primaryBlue"
                    >
                      Teléfono:
                      <i className="font-light">
                        <span className="text-red-700"> *</span>
                      </i>
                    </label>
                    <input
                      name="cardPhone"
                      type="text"
                      maxLength={10}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border shadow appearance-none"
                      required
                    />
                  </div>
                  <div className="w-2/5 pl-2">
                    <label
                      htmlFor="cardExt"
                      className="block my-2 text-sm font-bold text-primaryBlue"
                    >
                      Extención:
                      <i className="font-light">
                        <span className="text-red-700"> *</span>
                      </i>
                    </label>
                    <input
                      name="cardExt"
                      type="text"
                      maxLength={6}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border shadow appearance-none"
                      required
                    />
                  </div>
                </div>
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="cardPhone2"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["units-package"]}: */}
                  Celular
                </label>
                <input
                  name="cardPhone2"
                  type="text"
                  maxLength={27}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="cardAddress"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["visibility"]}: */}
                  Dirección
                </label>

                <select
                  name="cardAddress"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border shadow"
                >
                  <option value="">Seleccionar</option>
                  <option value="Carretera Chetumal Puerto Juárez, Km 282, Municipio de Solidaridad, Playa del Carmen, Quintana Roo, México, C.P.77710">
                    Ctra. Chetumal Puerto Juárez, Km 282, Municipio de
                    Solidaridad, Playa del Carmen, Quintana Roo, México,
                    C.P.77710
                  </option>
                  <option value="Ctra. Chetumal - Puerto Juárez 282, Rancho Xcaret, Quintana Roo, C.P.77710">
                    Ctra. Chetumal - Puerto Juárez, Km 282, Rancho Xcaret,
                    Quintana Roo, C.P.77710
                  </option>
                  <option value="Carretera Chetumal Puerto Juárez, km 240, Locales 1 & 2, Módulo B, Xel-Há, Quintana Roo, México, C.P. 77780">
                    Carretera Chetumal Puerto Juárez, km 240, Locales 1 & 2,
                    Módulo B, Xel-Há, Quintana Roo, México, C.P. 77780
                  </option>
                  <option value="Carretera Chetumal Puerto Juárez, Km 282, Municipio de Solidaridad, Playa del Carmen, Quintana Roo, México, C.P.77710">
                    Carretera Chetumal Puerto Juárez, Km 282, Municipio de
                    Solidaridad, Playa del Carmen, Quintana Roo, México,
                    C.P.77710
                  </option>
                  <option value="Carretera Chetumal Puerto Juárez, Km 282, Municipio de Solidaridad, Playa del Carmen, Quintana Roo, México, C.P.77710">
                    Carretera Chetumal Puerto Juárez, Km 282, Municipio de
                    Solidaridad, Playa del Carmen, Quintana Roo, México,
                    C.P.77710
                  </option>
                  <option value="Carretera Federal Cancún Puerto Morelos No. exterior Mz 01 No interior l 1-02005 Puerto Morelos, México, C.P. 77580">
                    Carretera Federal Cancún Puerto Morelos No. exterior Mz 01
                    No interior l 1-02005 Puerto Morelos, México, C.P. 77580
                  </option>
                </select>
              </>
            ) : null}

            <label
              htmlFor="cardComments"
              className="block my-2 text-sm font-bold text-primaryBlue"
            >
              {/* {lang[params.lang]["units-package"]}: */}
              Comentarios adicionales:
            </label>
            <textarea
              name="cardComments"
              onChange={handleChange}
              className="w-full px-3 py-2 border shadow appearance-none"
            />

            <label
              htmlFor="cardQuantity"
              className="block my-2 text-sm font-bold text-primaryBlue"
            >
              {/* {lang[params.lang]["visibility"]}: */}
              Cantidad
              <i className="font-light">
                <span className="text-red-700"> *</span>
              </i>
            </label>

            <select
              name="cardQuantity"
              onChange={handleChange}
              className="w-full px-3 py-2 border shadow"
              required
            >
              <option value="">Seleccionar</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>
            </select>

            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
        {/* <ContentForm /> */}
      </div>
      <div className="">
        <div ref={tableRef} id="tarjeta">
          {/* <div>
          <Stage width="100vw" height={window.innerHeight}>
            <Layer>
              <Text
                text={formData.cardName}
                x={state.x}
                y={state.y}
                draggable
                fill={state.isDragging ? "green" : "black"}
                onDragStart={() => {
                  setState({
                    isDragging: true,
                  });
                }}
                onDragEnd={(e) => {
                  setState({
                    isDragging: false,
                    x: e.target.x(),
                    y: e.target.y(),
                  });
                }}
              />
            </Layer>
          </Stage>
        </div> */}
          {/* {(formData.cardEmail.length * 16) / 248}
        {formData.cardEmail.length / 248} */}
          {isTarjeta ? (
            <>
              <table
                background={product.imageProduct}
                className="bg-no-repeat bg-cover"
                width="498"
                height="275"
              >
                <tr background="/images/marca_agua.svg" height="50%">
                  <td width="45%"></td>
                  <td width="55%" className="align-top">
                    <p className="py-0 pt-5 pr-5 my-0 text-lg font-bold text-right capitalize font-avenir-back">
                      {formData.cardName}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-right capitalize font-avenir-medium">
                      {formData.position}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-right capitalize font-avenir-medium">
                      {formData.position2}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-right capitalize font-avenir-medium">
                      {formData.position3}
                    </p>
                  </td>
                </tr>
                <tr background="/images/marca_agua.svg" height="50%">
                  <td width="45%"></td>
                  <td width="55%">
                    <p
                      className="py-0 pr-5 my-0 leading-3 text-justify font-avenir-roman text-[13px]"
                      ref={paragraphRef}
                    >
                      {formData.cardEmail}
                    </p>
                    <p className="leading-3">
                      {formData.cardPhone && (
                        <span className="py-0 pr-5 my-0 leading-3 capitalize font-avenir-roman text-[13px]">
                          Tel. {formData.cardPhone}
                        </span>
                      )}
                      {formData.cardExt && (
                        <span className="py-0 pr-5 my-0 leading-3 capitalize font-avenir-roman text-[13px]">
                          Ext. {formData.cardExt}
                        </span>
                      )}
                    </p>
                    {formData.cardPhone2 && (
                      <p className="py-0 pr-5 my-0 leading-3 capitalize font-avenir-roman text-[13px]">
                        Cel. {formData.cardPhone2}
                      </p>
                    )}
                    <p className="py-0 pr-5 my-0 leading-3 text-justify text-[13px] capitalize font-avenir-roman">
                      {formData.cardAddress}
                    </p>
                  </td>
                </tr>
              </table>
            </>
          ) : (
            <img src={product.imageProduct} width={500} alt="" />
          )}
          <br />
          <br />
          {product.imageProduct2 ? (
            <img src={product.imageProduct2} width={500} alt="" />
          ) : null}
          <br />
          <p>
            Esta representación es lo mas cercano posible a la tarjeta final
          </p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="w-full mb-4">
            {isTarjeta ? (
              <button
                onClick={handleOpenPDF}
                className="block w-full px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Generar PDF
              </button>
            ) : null}
            {/* <button onClick={handleCapture}>Capturar como imagen</button> */}

            {/* {imageData && (
              <div>
                <p>Imagen generada:</p>
                <img src={imageData} alt="Captura de tabla" width={495} />
              </div>
            )} */}
          </div>
          <div className="w-full">
            <button
              onClick={handleSubmit}
              className="block w-full px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
            >
              Agregar al carrito
            </button>
          </div>
          {addItem ? (
            <div className="w-full">
              <a
                href={`/${params.lang}/dashboard/${params.enterpriseId}/${params.categoryParentId}`}
                className="block w-full px-4 py-2 mt-4 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Seguir comprando
              </a>
            </div>
          ) : null}
          {/* <div className="w-full">
            <button
              onClick={handleCapture}
              className="block w-full px-4 py-2 mt-4 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
            >
              Guardad PDF
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
