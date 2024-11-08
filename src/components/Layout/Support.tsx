import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import bgPick from "../../../public/assets/nav_support/BgMapImage.png"
type SupportItem = {
  title: string;
  image: StaticImageData;
};
type supportMobile = {
  mobileFirst: string;
  mobileSecond: string;
};
interface SupportGridProps {
  supporItem: SupportItem[];
  supportMobile: supportMobile;
}
const ITEMS_PER_PAGE = 4;

const SupportGrid: React.FC<SupportGridProps> = ({
  supporItem,
  supportMobile,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const shouldShowArrows = supporItem.length > 4;
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < supporItem.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const chunkItems = (arr: SupportItem[], size: number): SupportItem[][] =>
    arr.length
      ? [arr.slice(0, size), ...chunkItems(arr.slice(size), size)]
      : [];

  const paginatedItems = chunkItems(supporItem, 4);

  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-4 w-[100vw]">
      {/* desktop view */}
      {shouldShowArrows && (
        <button
          className="h-12 w-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <FaArrowLeft className="text-xl text-gray-500" />
        </button>
      )}
      <div
        className={`hidden lg:flex overflow-x-auto py-8 ${
          shouldShowArrows ? "scroll-smooth" : ""
        } [scrollbar-width:none] gap-8`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {supporItem.map((item, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <motion.div
              className="flex-shrink-0 w-72 h-40 rounded-3xl p-4 flex flex-col justify-center items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${bgPick.src})` }}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={imageVariants}
            >
              <Image
                src={item.image.src}
                alt={item.title}
                width={96}
                height={96}
                className="object-contain"
              />
            </motion.div>

            <p className="relative font-poppins text-center mt-4 text-black font-medium hover:text-[#483d78] hover:font-bold text-16">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {shouldShowArrows && (
        <button
          className="h-12 w-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <FaArrowRight className="text-xl text-gray-500" />
        </button>
      )}
      {/* mobile view */}

      <div className="relative p-1 h-screen  flex lg:hidden flex-col items-center">
        <div
          className="w-full h-[45%] py-2 overflow-x-scroll scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row gap-2">
            {paginatedItems.map((group, groupIndex) => (
              <motion.div
                key={`slide-${groupIndex}`}
                className="min-w-full p-1 grid grid-cols-2 grid-rows-2 gap-4"
              >
                {group.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="relative w-40 h-36 border-[1px] bg-white rounded-xl  flex flex-col justify-start items-center p-2"
                    initial="hidden"
                    animate="visible"
                    custom={itemIndex}
                    variants={imageVariants}
                  >
                    <div className="relative w-32 bg-white rounded-xl border-[1px] h-16 flex justify-center items-center">
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="object-contain h-16 w-32"
                      />
                    </div>
                    <p className="relative font-poppins text-center mt-4 text-black font-medium hover:text-[#483d78] hover:font-bold text-16">
                      {item.title}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        {shouldShowArrows && (
          <div className="flex h-[5%] justify-center w-full ">
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <FaArrowLeft className="text-xl text-gray-500" />
            </button>
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <FaArrowRight className="text-xl text-gray-500" />
            </button>
          </div>
        )}
        <div className="flex lg:hidden h-[50%] flex-col w-full mt-4">
          <p className="text-black pl-4 text-lg font-poppins font-medium">
            Give us a Call:
          </p>
          <div className="flex justify-between items-center border-b-2 h-28 flex-row pt-6">
            <p
              className="text-black text-lg flex flex-row gap-2 items-center"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/236x/76/c8/c0/76c8c0172ba662b6fb6d0c095c1158fe.jpg')",
                backgroundSize: "contain", // Adjust this value as needed
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "5px 10px", // Adjust padding as needed
              }}
            >
              <FaPhone />
              {supportMobile.mobileFirst}
            </p>
            <div className="w-1 h-20 border-l-2"></div>
            <p
              className="text-black text-lg flex flex-row gap-2 items-center"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/236x/76/c8/c0/76c8c0172ba662b6fb6d0c095c1158fe.jpg')",
                backgroundSize: "contain", // Adjust this value as needed
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "5px 10px", // Adjust padding as needed
              }}
            >
              <FaPhone />
              {supportMobile.mobileSecond}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGrid;
