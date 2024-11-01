'use client'

import { ErrorResponse, FieldError, ILoginRequest } from "@/app/core/application/dto";
import { FormField } from "@/ui/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from 'next/link';

const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .email("El correo es inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const handleLogin = async (data: ILoginRequest) => {
    console.log(data);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.userName,
        password: data.password,
      });

      console.log(result);

      if (result?.error) {
        console.log("Ocurrió un error", JSON.parse(result.error));
        handleError(JSON.parse(result.error));
        return;
      }
      router.push("/dashboard/services");
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: unknown) => {
    const errorData = error as ErrorResponse;
    if (errorData && errorData.errors) {
      if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
        errorData.errors.forEach((fieldError) => {
          const { field, error } = fieldError as FieldError;
          setError(field as keyof ILoginRequest, {
            message: error,
          });
        });
      } else {
        if ("message" in errorData.errors[0]) {
          setError("userName", {
            message: errorData.errors[0].message,
          });
        }
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 space-y-6 font-sans">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-[#262626]">Iniciar Sesión</h1>
        <p className="text-sm text-[#797979]">Bienvenido de vuelta, te hemos extrañado</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <FormField<ILoginRequest>
          control={control}
          type="email"
          label="Correo Electrónico"
          name="userName"
          error={errors.userName}
          placeholder="ejemplo@correo.com"
        />

        <div className="space-y-1">
          <FormField<ILoginRequest>
            control={control}
            type="password"
            label="Contraseña"
            name="password"
            error={errors.password}
            placeholder="Ingresa tu contraseña"
          />
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-[#E75A5A] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#E75A5A] text-white rounded-full font-medium hover:bg-[#E75A5A]/90 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-[#797979]">O inicia sesión con</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="sr-only">Iniciar sesión con Apple</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="sr-only">Iniciar sesión con Google</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
        </button>
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="sr-only">Iniciar sesión con Facebook</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </button>
      </div>
    </div>
  );
};
