"use client";

// import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

// import ButtonProduct from "./ButtonProduct";

export default function ProductCard({
  params,
  product,
  typePrice,
  currency,
  paramslang,
}) {
  product.priceExtE = Math.round(product.priceLocal / 18.5);
  // console.log(params);
  // console.log(product.descriptionProduct == "null");
  const prices = { 1: "priceLocal", 2: "priceNacional", 3: "priceExtE" };
  const priceProduct = product[prices[typePrice]];
  const cart = useCart();
  const data = {
    ...product,
    currency: currency,
    price: product[prices[typePrice]],
  };
  // const data2 = { ...product, price: product[prices[typePrice]] };
  // console.log(data2);
  // console.log(product);

  const [showImage1, setShowImage1] = useState(true);

  const handleToggleImage = () => {
    console.log(showImage1);
    if (showImage1) {
      setShowImage1(false);
    } else {
      setShowImage1(true);
    }
  };

  return (
    // <div className="flex items-center justify-between p-2 my-3 bg-white rounded-lg shadow-xl">
    <div>
      <div className="p-2 my-3 bg-white rounded-lg shadow-2xl">
        <div className="items-center">
          <div className="relative slider-container">
            <a href={`${params.categoryParentId}/${product.id}`}>
              <img
                className="product-image"
                width={400}
                src={showImage1 ? product.imageProduct : product.imageProduct2}
                alt={product.nameProduct}
              />
            </a>
            {product.imageProduct2 != null ? (
              <>
                <button
                  className="absolute p-1 text-white rounded-full top-1/2 bg-primaryBlue left-2"
                  onClick={() => handleToggleImage()}
                >
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  className="absolute p-1 text-white rounded-full bg-primaryBlue top-1/2 right-2"
                  onClick={() => handleToggleImage()}
                >
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            ) : // <div className="absolute w-full px-2 button-container inset-y-1/2">
            //   <div className="flex justify-between ">
            //     <button
            //       className="p-1 text-white rounded-full bg-primaryBlue"
            //       onClick={() => handleToggleImage()}
            //     >
            //       <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            //     </button>
            //     <button
            //       className="p-1 text-white rounded-full bg-primaryBlue"
            //       onClick={() => handleToggleImage()}
            //     >
            //       <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            //     </button>
            //   </div>
            // </div>
            null}
          </div>
          <a href={`${params.categoryParentId}/${product.id}`}>
            <div className="flex flex-col pl-4 justify-evenly">
              <h4 className="mb-2 text-sm font-semibold leading-tight md:text-lg text-primaryBlue">
                {product.nameProduct}
              </h4>
              <div>
                <p className="text-xs leading-normal text-secondGray md:text-sm">
                  {product.descriptionProduct}
                </p>
                {priceProduct != 0 && (
                  <p className="text-xs leading-normal text-secondGray md:text-sm">
                    ${priceProduct} {currency}
                  </p>
                )}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
