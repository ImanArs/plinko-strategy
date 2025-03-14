"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Onboarding from "@/components/onboarding";
import BottomNavigation from "@/components/bottom-navigation";
import HomeScreen from "@/components/home-screen";
import StrategyDatabase from "@/components/strategy-database";
import Myths from "@/components/myths";
import RecoveryAdvisor from "@/components/recovery-advisor";
import Settings from "@/components/settings";

export default function App() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (hasCompletedOnboarding === "true") {
      setShowOnboarding(false);
    }
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <main className="flex-1 pb-16">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "strategies" && <StrategyDatabase />}
        {activeTab === "myths" && <Myths />}
        {activeTab === "recovery" && <RecoveryAdvisor />}
        {activeTab === "settings" && <Settings />}
      </main>
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
