"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { cardContents } from "../Constants";
import LottieAnimation from "../ui/LottieAnimation";
import Modal from "../ui/Modal"; // Import your modal component

const KnowMachine: React.FC = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  return (
    <div className="lg:p-6 px-2 lg:px-0 mt-40 w-full  h-full">
      <div className="text-center"></div>
      <div className="flex flex-col lg:flex-row justify-around space-y-4 lg:space-x-6 lg:mr-10">
        {cardContents.map((content, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-lg overflow-hidden w-full h-[12rem] lg:w-[35%] lg:h-[32rem] lg:ml-10 group"
          >
            <Image
              src={content.image}
              alt={content.title}
              height={400}
              width={400}
              className="h-full w-full scale-100 group"
            />
            <div
              className="absolute top-0 z-30 right-0 m-2 cursor-pointer"
              onClick={() => handleOpenModal(index)}
            >
              <GrAddCircle size={30} className="text-white" />
            </div>
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black flex items-center justify-center">
              <h2 className="lg:mb-[50rem] font-bold top-0 w-[80%] text-center text-xl lg:text-4xl text-white">
                {content.title}
              </h2>
            </div>
            <div className="absolute m-2 transform scale-[600%] bottom-32 right-1/2 translate-x-1/2 translate-y-1/2 transition-transform duration-300">
              <LottieAnimation
                animationData={content.lottieAnimation}
                className="h-4 w-4 lg:h-10 lg:w-10" // Example Tailwind CSS classes for size
              />
            </div>
          </div>
        ))}
      </div>

      {openModalIndex !== null && (
        <Modal
          image={cardContents[openModalIndex].image}
          title={cardContents[openModalIndex].title}
          firstname={cardContents[openModalIndex].title}
          description="" // Include any additional props for the modal here
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default KnowMachine;
