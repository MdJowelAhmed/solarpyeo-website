"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PigeonHub() {
  const router=useRouter();
  const handleFileNewRecordClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="w-full h-[70vh] relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/bg-banner.png)" }}
        ></div>

        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-2xl mt-40 relative text-center">
            <Image src="/assests/logo.png" alt="logo" width={100} height={100} className="mx-auto"/>
            <h2 className="text-white text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6 font-bold">Glass File</h2>
            <h2 className="text-white text-xl md:text-2xl mb-4">
              DOCUMENT. VERIFY. PROTECT.
            </h2>
            <p className="text-white">
             A public archive of relationship conduct—documented, accessible, and preserved for awareness and safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-24">
              <Button className="px-16 py-6 text-white bg-primary rounded-lg" onClick={handleFileNewRecordClick}>
                File New Record
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}