'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
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

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if(result.error){
      toast.error(result.error)
      return
    }
    toast.success("Se ha iniciado sesión correctamente!")
    router.push('/chat')
  };
  return (
    <section className="flex items-center justify-center w-full h-full rounded-3xl bg-custom-tertiary-color border-[1px] border-custom-border-color">
      <form action="">
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
          <button onClick={(e) => handleSubmit(e)} className="bg-[#0cfdc6] mb-2 font-bold w-full rounded-lg py-3 shadow-md shadow-[#5ed6ba33] text-black">
            INICIAR SESIÓN
          </button>
          <p className="text-custom-resalt-color text-sm tracking-widest cursor-pointer">
            ¿No tienes cuenta? Regístrate!
          </p>
        </section>
      </form>
    </section>
  );
}
