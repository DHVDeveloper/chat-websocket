'use client'
import { useUserContext } from "@/context/user/User.context";
import { loginServices } from "@/services/loginService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export interface LoginFormData {
  email: string,
  password: string
}

export function LoginPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const {handleReloadUserData} = useUserContext()
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    const loginResponse = await loginServices.login(formData)
    if(loginResponse.error){
      return toast.error("No se ha encontrado el usuario con estas credenciales.")
    }
    toast.success("Se ha iniciado sesión correctamente!")
    handleReloadUserData()
    router.push('/chat')
  };
  return (
    <section className="flex items-center justify-center w-full h-full rounded-3xl bg-custom-tertiary-color border-[1px] border-custom-border-color">
      <form ref={formRef} action="">
        <section className="flex items-center justify-center flex-col">
          <h2 className="font-bold text-4xl tracking-widest">
            BIENVENIDO DE NUEVO!
          </h2>
          <p className="text-custom-text-secondary-color">
            Chatea con quien tu quieras desde donde quieras.
          </p>
          <section className="py-4 flex flex-col gap-4 w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-[#27272A80] py-3 ps-2 rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="bg-[#27272A80] py-3 ps-2 rounded-lg"
              required
            />
          </section>
          <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-[#0cfdc6] mb-2 font-bold w-full rounded-lg py-3 shadow-md shadow-[#5ed6ba33] text-black">
            INICIAR SESIÓN
          </button>
          <Link href={'/register'} className="text-custom-resalt-color text-sm tracking-widest cursor-pointer">
            ¿No tienes cuenta? Regístrate!
          </Link>
        </section>
      </form>
    </section>
  );
}
