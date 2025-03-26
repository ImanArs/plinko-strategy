"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { myths } from "@/lib/utils";

interface Myth {
  id: number;
  title: string;
  description: string;
  isTrue: boolean;
}

export default function MythSwipeGame() {
  const [cards, setCards] = useState(myths);
  const [result, setResult] = useState<{ id: number; correct: boolean } | null>(
    null
  );

  const handleSwipe = (direction: "left" | "right", card: Myth) => {
    const isFactSwipe = direction === "left";
    const isCorrect = isFactSwipe === card.isTrue;

    setResult({ id: card.id, correct: isCorrect });

    setTimeout(() => {
      setCards((prev) => prev.filter((m) => m.id !== card.id));
      setResult(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center py-10 h-[100vh] overflow-hidden bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Fact or Myth?</h1>
      <div className="relative w-80 h-96">
        <AnimatePresence>
          {cards.length > 0 ? (
            cards.map((myth, index) => (
              <motion.div
                key={myth.id}
                className={`absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between`}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handleSwipe("right", myth);
                  if (info.offset.x < -100) handleSwipe("left", myth);
                }}
              >
                <h2 className="text-lg font-bold">{myth.title}</h2>
                <h2 className="text-lg font-bold">{index}</h2>
                <p className="text-sm text-gray-300">{myth.description}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-gray-400">No more myths!</p>
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Hints */}
      <div className="flex justify-between w-80 mt-4">
        <span className="text-green-400">← Fact</span>
        <span className="text-red-400">Myth →</span>
      </div>

      {/* Feedback Icons */}
      {result && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={`mt-4 flex items-center text-lg ${
            result.correct ? "text-green-400" : "text-red-400"
          }`}
        >
          {result.correct ? (
            <Check className="w-6 h-6 mr-2" />
          ) : (
            <X className="w-6 h-6 mr-2" />
          )}
          {result.correct ? "Correct!" : "Wrong!"}
        </motion.div>
      )}
    </div>
  );
}
