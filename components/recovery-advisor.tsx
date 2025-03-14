"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AlertCircle } from "lucide-react";

export default function RecoveryAdvisor() {
  const [lossAmount, setLossAmount] = useState("");
  const [odds, setOdds] = useState("2.0");
  const [betAmount, setBetAmount] = useState("");
  const [recoveryPlan, setRecoveryPlan] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const calculateRecovery = () => {
    const loss = Number.parseFloat(lossAmount);
    const oddsValue = Number.parseFloat(odds);
    const bet = Number.parseFloat(betAmount) || loss * 0.1; // Default to 10% of loss if not specified

    if (isNaN(loss) || isNaN(oddsValue) || loss <= 0 || oddsValue <= 1) {
      return;
    }

    const profit = bet * (oddsValue - 1);
    const betsNeeded = Math.ceil(loss / profit);

    const plan = [];
    let remainingLoss = loss;
    let totalInvestment = 0;

    for (let i = 0; i < betsNeeded; i++) {
      totalInvestment += bet;
      remainingLoss -= profit;

      plan.push({
        bet: i + 1,
        betAmount: bet,
        potentialProfit: profit,
        remainingLoss: Math.max(0, remainingLoss),
        totalInvestment,
        netPosition: totalInvestment - loss + (i + 1) * profit,
      });
    }

    setRecoveryPlan(plan);
    setShowResults(true);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Recovery Advisor</h1>

      <Card className="mb-6 bg-gray-800 text-white border-none">
        <CardHeader>
          <CardTitle>Calculate Recovery Plan</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your loss amount and we'll help you create a recovery strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="lossAmount" className="text-sm text-gray-400">
                Total Loss Amount ($)
              </label>
              <Input
                id="lossAmount"
                type="number"
                value={lossAmount}
                onChange={(e) => setLossAmount(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter amount lost"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="odds" className="text-sm text-gray-400">
                Average Odds for Recovery Bets
              </label>
              <Input
                id="odds"
                type="number"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter odds (e.g., 2.0)"
                step="0.1"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="betAmount" className="text-sm text-gray-400">
                Bet Amount for Each Recovery Bet ($){" "}
                <span className="text-xs">(Optional)</span>
              </label>
              <Input
                id="betAmount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Default: 10% of loss amount"
              />
            </div>

            <Button
              onClick={calculateRecovery}
              className="mt-2 bg-purple-600 hover:bg-purple-700"
              disabled={!lossAmount || Number.parseFloat(lossAmount) <= 0}
            >
              Calculate Recovery Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && recoveryPlan.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 bg-gray-800 text-white border-none">
            <CardHeader>
              <CardTitle>Recovery Summary</CardTitle>
              <CardDescription className="text-gray-400">
                You'll need {recoveryPlan.length} successful bets to recover
                your loss
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 rounded-lg bg-blue-900/30 p-4">
                <div className="flex items-start">
                  <AlertCircle className="mr-2 h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-400">
                      Important Note
                    </h4>
                    <p className="text-xs text-gray-300">
                      This plan assumes all bets are successful. In reality, you
                      should adjust your strategy based on results and consider
                      responsible gambling practices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={recoveryPlan}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="bet"
                      label={{
                        value: "Number of Bets",
                        position: "insideBottom",
                        offset: -5,
                        fill: "#aaa",
                      }}
                      stroke="#aaa"
                    />
                    <YAxis
                      label={{
                        value: "Amount ($)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#aaa",
                      }}
                      stroke="#aaa"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#333", border: "none" }}
                      formatter={(value: any) => [
                        `$${value.toFixed(2)}`,
                        "Net Position",
                      ]}
                    />
                    <Bar dataKey="netPosition" name="Net Position">
                      {recoveryPlan.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.netPosition >= 0 ? "#10b981" : "#ef4444"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 text-left text-sm font-medium text-gray-400">
                        Bet #
                      </th>
                      <th className="py-2 text-left text-sm font-medium text-gray-400">
                        Bet Amount
                      </th>
                      <th className="py-2 text-left text-sm font-medium text-gray-400">
                        Profit
                      </th>
                      <th className="py-2 text-left text-sm font-medium text-gray-400">
                        Remaining Loss
                      </th>
                      <th className="py-2 text-left text-sm font-medium text-gray-400">
                        Net Position
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recoveryPlan.map((plan, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 text-sm">{plan.bet}</td>
                        <td className="py-2 text-sm">
                          ${plan.betAmount.toFixed(2)}
                        </td>
                        <td className="py-2 text-sm">
                          ${plan.potentialProfit.toFixed(2)}
                        </td>
                        <td className="py-2 text-sm">
                          ${plan.remainingLoss.toFixed(2)}
                        </td>
                        <td
                          className={`py-2 text-sm ${
                            plan.netPosition >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          ${plan.netPosition.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
