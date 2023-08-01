"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

// const handleChange = (event) => {
//   const { name, value } = event.target;
//   setFormValues({ ...formValues, [name]: value });
// };

export default function FormLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const data = await request.formData();
      // console.log(data);
      setFormValues({ email: "hola@mundo.com", password: "holamundo1" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return (
    <div className="max-w-2xl w-full md:w-4/12">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <form className="space-y-6" onSubmit={onSubmit}>
          <h3 className="text-xl font-medium text-center text-blue-700">
            Iniciar Sesión
          </h3>
          <div>
            {/* <label for="email" class="text-sm font-medium">Correo Electrónico</label> */}
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              placeholder="Correo Electrónico"
              required={true}
            ></input>
          </div>
          <div>
            {/* <label for="password" class="text-sm font-medium  block mb-2 dark:text-gray-300">Contraseña</label> */}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              required={true}
            ></input>
          </div>
          {/* <div className="flex justify-center">
            <a
              href="/dashboard"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Iniciar Sesión
            </a>
          </div> */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}