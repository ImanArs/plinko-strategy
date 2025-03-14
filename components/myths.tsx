"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Check, X } from "lucide-react";

interface Myth {
  id: number;
  title: string;
  description: string;
  isTrue: boolean;
}
const myths: Myth[] = [
  {
    id: 1,
    title: "Plinko is Completely Random",
    description:
      "While Plinko is highly random, physics and peg placements influence the ball's path. Small variations can slightly affect where it lands, but outcomes are still unpredictable.",
    isTrue: true,
  },
  {
    id: 2,
    title: "Betting More Increases Your Chances of Winning",
    description:
      "Many believe that betting more money improves their odds. In reality, higher bets only increase potential payouts, not the probability of landing on high multipliers.",
    isTrue: false,
  },
  {
    id: 3,
    title: "Previous Drops Affect Future Results",
    description:
      "Some think that if a ball lands on a low multiplier many times, a high multiplier is 'due.' Each drop is independent, and past results do not influence future outcomes.",
    isTrue: false,
  },
  {
    id: 4,
    title: "Certain Drop Points Guarantee Higher Multipliers",
    description:
      "Some believe that dropping the ball from a specific position guarantees a better outcome. While positioning may influence the ball’s path, there are no guaranteed winning spots.",
    isTrue: false,
  },
  {
    id: 5,
    title: "Casinos Can Manipulate Plinko Outcomes",
    description:
      "There is a myth that online casinos can secretly control where the ball lands. In regulated platforms using provably fair technology, results are determined by verifiable algorithms.",
    isTrue: false,
  },
  {
    id: 6,
    title: "Plinko is Just a Luck-Based Game",
    description:
      "While Plinko is largely based on luck, choosing the right risk level and rows can impact long-term results. Understanding variance can help players make informed decisions.",
    isTrue: true,
  },
  {
    id: 7,
    title: "A Wider Plinko Board Means Better Odds",
    description:
      "Some think that playing on a wider board increases their chances of hitting high multipliers. In reality, wider boards increase both potential rewards and risks equally.",
    isTrue: false,
  },
  {
    id: 8,
    title: "There’s a Secret Strategy to Always Win",
    description:
      "Players often search for a hidden trick or 'winning strategy' for Plinko. Since outcomes are physics-based and random, no strategy guarantees consistent high payouts.",
    isTrue: false,
  },
];

export default function Myths() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    if (info.offset.x < -threshold && currentIndex < myths.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < myths.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Myths & Facts</h1>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        ref={constraintsRef}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            className="absolute w-full px-4"
          >
            <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {myths[currentIndex].title}
                </h2>
                {myths[currentIndex].isTrue ? (
                  <span className="flex items-center rounded-full bg-green-900 px-3 py-1 text-sm text-green-400">
                    <Check className="mr-1 h-4 w-4" /> Fact
                  </span>
                ) : (
                  <span className="flex items-center rounded-full bg-red-900 px-3 py-1 text-sm text-red-400">
                    <X className="mr-1 h-4 w-4" /> Myth
                  </span>
                )}
              </div>
              <p className="text-gray-300">{myths[currentIndex].description}</p>

              <div className="mt-6 flex justify-between text-sm text-gray-400">
                <span>Swipe to navigate</span>
                <span>
                  {currentIndex + 1} of {myths.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-4 z-10 rounded-full bg-gray-800 p-2 text-white opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === myths.length - 1}
          className="absolute right-4 z-10 rounded-full bg-gray-800 p-2 text-white opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {myths.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-purple-500" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
