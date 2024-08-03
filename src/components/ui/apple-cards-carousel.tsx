"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      {items.length <= 10 ? (
        <div className="relative w-full">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div
              className={cn(
                "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
              )}
            ></div>
            <div
              className={cn(
                "grid grid-cols-5  gap-4 pl-4",
                "max-w-7xl mx-auto"
              )}
            >
              {items.slice(0, 10).map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  key={"card" + index}
                  className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {items.length >= 10 && (
            <div className="">
              <div className="relative mt-12 w-full">
                <div className="flex justify-end gap-2 mr-10">
                  <button
                    className="relative z-20 h-10 w-10 rounded-full bg-gray-00 flex items-center justify-center disabled:opacity-50"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                  >
                    <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                  </button>
                  <button
                    className="relative z-20 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                  >
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                <div
                  className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-4  scroll-smooth [scrollbar-width:none]"
                  ref={carouselRef}
                  onScroll={checkScrollability}
                >
                  <div
                    className={cn(
                      "absolute right-0  z-10 h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
                    )}
                  ></div>

                  <div
                    className={cn(
                      "flex flex-row  gap-4 pl-4",
                      "max-w-7xl mx-auto"
                    )}
                  >
                    {items.slice(0, items.length / 2).map((item, index) => (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.2 * index,
                            ease: "easeOut",
                            once: true,
                          },
                        }}
                        key={"card" + index}
                        className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <div
                  className="flex  w-full overflow-x-scroll overscroll-x-auto py-4 md:py-4 scroll-smooth [scrollbar-width:none]"
                  ref={carouselRef}
                  onScroll={checkScrollability}
                >
                  <div
                    className={cn(
                      "absolute right-0  z-20 h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
                    )}
                  ></div>

                  <div
                    className={cn(
                      "flex flex-row mt-0  gap-4 pl-4",
                      "max-w-7xl mx-auto"
                    )}
                  >
                    {items
                      .slice(items.length / 2, items.length - 1)
                      .map((item, index) => (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.5,
                              delay: 0.2 * index,
                              ease: "easeOut",
                              once: true,
                            },
                          }}
                          key={"card" + index}
                          className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
                        >
                          {item}
                        </motion.div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mr-10">
                  <button
                    className="relative z-20 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                  >
                    <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                  </button>
                  <button
                    className="relative z-20 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                  >
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const handleOpen = () => {
    setOpenModalIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenModalIndex(null);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky z-50 top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className=" h-80 rounded-3xl bg-white  w-56 md:h-[16rem] md:w-56 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="relative h-full w-full">
          <div className="absolute flex bg-white h-20  flex-row  top-0 space-x-2 -mr-4 right-0 z-40 rounded-bl-3xl">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 20 20"
                fill="none"
                className="h-6 w-6 -ml-6 mt-2 "
              >
                <path
                  d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                  fill="white" // Use the color prop here
                ></path>
              </svg>
            </div>
            <div className="h-20 w-16 flex items-center justify-center">
              <Image
                src="https://assets.aceternity.com/macbook.png"
                alt="icon"
                height={50}
                width={50}
              />
            </div>
            <div className="-ml-6 mt-2">
              <div className="relative  h-10 w-10 flex items-center justify-center border-2 border-[#483d78] rounded-full bg-white">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-base font-bold text-red-500">70</div>
                  <div className="text-txs mt-1 text-[#483d78]">PCM/MIN</div>
                </div>
              </div>
            </div>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 20 20"
                fill="none"
                className="h-6 w-6 mt-20 mr-2"
              >
                <path
                  d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                  fill="white" // Use the color prop here
                ></path>
              </svg>
            </div>
          </div>

          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover rounded-[2.2rem] p-2 absolute z-10 inset-0"
          />

          <div className="absolute left-0 right-0 bottom-0 z-40 p-4">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-sm md:text-base font-medium font-sans text-left"
            >
              {card.category}
            </motion.p>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-lg" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};