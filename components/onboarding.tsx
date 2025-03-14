"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Calculator,
  BookOpen,
  Info,
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to Plinko Strategy",
    description:
      "Your ultimate companion for smart betting strategies and calculations.",
    icon: <Calculator className="h-16 w-16 text-pink-500" />,
    bgColor: "bg-purple-900",
  },
  {
    title: "Learn Winning Strategies",
    description:
      "Explore our database of proven strategies and avoid common myths.",
    icon: <BookOpen className="h-16 w-16 text-blue-500" />,
    bgColor: "bg-indigo-900",
  },
  {
    title: "Track Your Progress",
    description:
      "Calculate potential wins, manage losses, and improve your betting game.",
    icon: <Info className="h-16 w-16 text-purple-500" />,
    bgColor: "bg-pink-900",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep === onboardingSteps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-gray-900 p-6 text-white">
      <div className="mt-10 w-full text-center">
        <h1 className="mb-2 text-3xl font-bold text-white">Plinko Strategy</h1>
        <p className="text-gray-400">Smart betting, better results</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="flex w-full flex-col items-center"
        >
          <motion.div
            className={`mb-8 flex h-40 w-40 items-center justify-center rounded-full ${onboardingSteps[currentStep].bgColor}`}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {onboardingSteps[currentStep].icon}
          </motion.div>
          <h2 className="mb-2 text-2xl font-bold">
            {onboardingSteps[currentStep].title}
          </h2>
          <p className="mb-6 text-center text-gray-400">
            {onboardingSteps[currentStep].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mb-10 w-full">
        <div className="mb-6 flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-purple-500" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-purple-700 bg-transparent text-white hover:bg-purple-900"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {currentStep === onboardingSteps.length - 1
              ? "Get Started"
              : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
