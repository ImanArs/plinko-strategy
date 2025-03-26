"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, ArrowRight, Info } from "lucide-react";
import { Card } from "./ui/card";
import BankrollPlans from "./CurrentPlanBankroll";

interface BetCalculation {
  amount: number;
  odds: number;
  percentage: number;
  potentialWin: number;
  potentialLoss: number;
  date: string;
  isWin?: boolean;
}

export default function HomeScreen() {
  const [calculations, setCalculations] = useState<BetCalculation[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [amount, setAmount] = useState("");
  const [odds, setOdds] = useState("");
  const [percentage, setPercentage] = useState("");
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);

  useEffect(() => {
    // Load calculations from localStorage
    const savedCalculations = localStorage.getItem("betCalculations");
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations));
    }

    // Calculate totals
    calculateTotals();
  }, []);

  const calculateTotals = () => {
    const savedCalculations = localStorage.getItem("betCalculations");
    if (savedCalculations) {
      const calcs = JSON.parse(savedCalculations) as BetCalculation[];

      let wins = 0;
      let losses = 0;

      calcs.forEach((calc) => {
        if (calc.isWin === true) {
          wins += calc.potentialWin;
        } else if (calc.isWin === false) {
          losses += calc.potentialLoss;
        }
      });

      setTotalWins(wins);
      setTotalLosses(losses);
    }
  };

  const calculateBet = () => {
    const amountNum = Number.parseFloat(amount);
    const oddsNum = Number.parseFloat(odds);
    const percentageNum = Number.parseFloat(percentage);

    if (isNaN(amountNum) || isNaN(oddsNum) || isNaN(percentageNum)) {
      return;
    }

    const potentialWin = amountNum * oddsNum * (percentageNum / 100);
    const potentialLoss = amountNum;

    const newCalculation: BetCalculation = {
      amount: amountNum,
      odds: oddsNum,
      percentage: percentageNum,
      potentialWin,
      potentialLoss,
      date: new Date().toLocaleString(),
    };

    const updatedCalculations = [newCalculation, ...calculations];
    setCalculations(updatedCalculations);
    localStorage.setItem(
      "betCalculations",
      JSON.stringify(updatedCalculations)
    );
    setShowCalculator(false);

    // Reset form
    setAmount("");
    setOdds("");
    setPercentage("");

    // Update totals
    calculateTotals();
  };

  const markAsWin = (index: number) => {
    const updatedCalculations = [...calculations];
    updatedCalculations[index].isWin = true;
    setCalculations(updatedCalculations);
    localStorage.setItem(
      "betCalculations",
      JSON.stringify(updatedCalculations)
    );
    calculateTotals();
  };

  const markAsLoss = (index: number) => {
    const updatedCalculations = [...calculations];
    updatedCalculations[index].isWin = false;
    setCalculations(updatedCalculations);
    localStorage.setItem(
      "betCalculations",
      JSON.stringify(updatedCalculations)
    );
    calculateTotals();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Welcome to Plinko Strategy
        </h1>
        <p className="text-gray-400">Your smart betting assistant</p>
      </div>

      <div className="bg-purple-800/30 rounded-lg p-4 mb-6 flex items-start gap-4">
        <Info className="text-purple-500 w-5 h-5" />
        <p className="text-xs text-purple-500 w-full">
          Your financial decisions are entirely your own. This app provides
          guidance, but you are free to choose or modify any plan based on your
          own strategy and comfort level.
        </p>
      </div>

      <BankrollPlans />

      <div className="mb-6 flex justify-between rounded-lg bg-gray-800 p-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">Wins</p>
          <p className="text-xl font-bold text-green-500">
            ${totalWins.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Losses</p>
          <p className="text-xl font-bold text-red-500">
            ${totalLosses.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Balance</p>
          <p
            className={`text-xl font-bold ${
              totalWins - totalLosses >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${(totalWins - totalLosses).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-gray-800 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Latest Calculation
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(true)}
            className="text-purple-400 hover:text-purple-300"
          >
            Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {calculations.length > 0 ? (
          <div className="rounded-md bg-gray-700 p-3">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-400">Amount:</span>
              <span className="font-medium">
                ${calculations[0].amount.toFixed(2)}
              </span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-gray-400">Odds:</span>
              <span className="font-medium">
                {calculations[0].odds.toFixed(2)}
              </span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-gray-400">Percentage:</span>
              <span className="font-medium">{calculations[0].percentage}%</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-gray-400">Potential Win:</span>
              <span className="font-medium text-green-500">
                ${calculations[0].potentialWin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Potential Loss:</span>
              <span className="font-medium text-red-500">
                ${calculations[0].potentialLoss.toFixed(2)}
              </span>
            </div>
            {calculations[0].isWin === undefined && (
              <div className="mt-3 flex justify-between space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => markAsWin(0)}
                >
                  Mark as Win
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => markAsLoss(0)}
                >
                  Mark as Loss
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-400">No calculations yet</p>
        )}
      </div>

      {/* Add Calculation Button */}
      <motion.button
        className="fixed bottom-20 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCalculator(true)}
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* Calculator Modal */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="bg-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Calculate Potential Bet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm text-gray-400">
                Bet Amount ($)
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter amount"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="odds" className="text-sm text-gray-400">
                Odds
              </label>
              <Input
                id="odds"
                type="number"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter odds"
                step="0.01"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="percentage" className="text-sm text-gray-400">
                Win Percentage (%)
              </label>
              <Input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter percentage"
                max="100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalculator(false)}>
              Cancel
            </Button>
            <Button
              onClick={calculateBet}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Calculate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="bg-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Calculation History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            {calculations.length > 0 ? (
              calculations.map((calc, index) => (
                <div key={index} className="mb-4 rounded-md bg-gray-700 p-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium">{calc.date}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-medium">
                      ${calc.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-400">Odds:</span>
                    <span className="font-medium">{calc.odds.toFixed(2)}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-400">Percentage:</span>
                    <span className="font-medium">{calc.percentage}%</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-400">Potential Win:</span>
                    <span className="font-medium text-green-500">
                      ${calc.potentialWin.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potential Loss:</span>
                    <span className="font-medium text-red-500">
                      ${calc.potentialLoss.toFixed(2)}
                    </span>
                  </div>
                  {calc.isWin !== undefined && (
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-400">Result:</span>
                      <span
                        className={`font-medium ${
                          calc.isWin ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {calc.isWin ? "Win" : "Loss"}
                      </span>
                    </div>
                  )}
                  {calc.isWin === undefined && (
                    <div className="mt-3 flex justify-between space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => markAsWin(index)}
                      >
                        Win
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => markAsLoss(index)}
                      >
                        Loss
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No calculations yet</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
