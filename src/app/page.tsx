"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoArrowDownRight } from "react-icons/go";

export default function Home() {
  const router = useRouter();
  const [isActiveAnimation, setIsActiveAnimation] = useState<boolean>(false);
  return (
    <section className="w-full h-full text-2xl flex flex-col gap-6 justify-center items-center">

      <div className="flex flex-col text-center gap-4">
          <span className="flex flex-col justify-start items-center gap-4">
            <h2 className="text-[80px] text-white font-bold stroke-1 stroke-cyan-500"> DEVCHAT </h2>
            <h4 className="text-custom-text-secondary-color text-lg tracking-wide"> Daniel Hernández Vieira </h4>
          </span>
      </div>

      <div className="flex gap-4 text-lg">
      <button
        onClick={() => router.push("/register")}
        type="button"
        className={` px-4 py-2 rounded-xl flex gap-2 items-center font-bold text-custom-tertiary-color bg-custom-resalt-color`}
      >
        Registrarme
      </button>
      <button
        onClick={() => router.push("/login")}
        onMouseEnter={() => setIsActiveAnimation(true)}
        onMouseLeave={() => setIsActiveAnimation(false)}
        type="button"
        className={`transition-all duration-150 bg-custom-secondary-color px-4 py-2 rounded-xl flex gap-2 items-center border  
        ${
          isActiveAnimation
            ? "text-custom-text-color font-md scale-110 border-custom-resalt-color"
            : "text-custom-text-secondary-color animate-pulse scale-100 border-custom-border-color"
        }`}
      >
        Ya tengo cuenta
        <span
          className={`transition-all duration-150 ${
            isActiveAnimation ? "-rotate-90" : "rotate-0"
          }`}
        >
          { isActiveAnimation ? <GoArrowDownRight color="#3EFFA2" /> : <GoArrowDownRight color="#474747" />}
        </span>
      </button>
      </div>
    </section>
  );
}
