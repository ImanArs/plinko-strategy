"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Clock, Trash2 } from "lucide-react";
import { AddOwnStrategy } from "./addOwnStrategy";

interface Strategy {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
}

const strategies: Strategy[] = [
  {
    id: 1,
    title: "Progressive Bet Strategy",
    description:
      "Gradually increase your bet size based on previous wins to maximize profits while minimizing risk.",
    image:
      "https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880.jpg",
    content:
      "The Progressive Bet Strategy involves increasing your bet size after each win to capitalize on winning streaks while minimizing risk during losses. The idea is to start with a base bet and increase it by a small percentage after each win, resetting to the base bet after a loss. This strategy allows players to take advantage of lucky streaks while protecting their bankroll during downswings. The key to success with this strategy is setting limits on increases and ensuring that losses do not wipe out previous gains.",
  },
  {
    id: 2,
    title: "Flat Betting Strategy",
    description:
      "Keep your bet size consistent regardless of previous outcomes to maintain long-term stability.",
    image:
      "https://st2.depositphotos.com/1000423/7817/i/450/depositphotos_78178400-stock-photo-my-success-idea.jpg",
    content:
      "The Flat Betting Strategy is one of the simplest and safest approaches in Plinko. With this strategy, you place the same bet amount on every round, regardless of whether you win or lose. This approach helps players manage their bankroll efficiently, reducing the risk of large losses while maintaining steady gameplay. Flat betting is ideal for players who want to extend their playtime and minimize the impact of variance. While this strategy does not maximize short-term profits, it offers long-term stability and control over losses.",
  },
  {
    id: 3,
    title: "High-Risk, High-Reward Strategy",
    description:
      "Opt for higher multipliers and riskier bets to aim for massive payouts.",
    image:
      "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F537962%2Fhands-holding-blocks-spelling-risk-and-reward.jpg&op=resize&w=1200&h=630",
    content:
      "The High-Risk, High-Reward Strategy in Plinko involves selecting the highest multipliers and risk settings to maximize potential winnings. This approach is suited for players who are willing to take bigger risks for the chance of hitting a significant payout. While this strategy can lead to large wins, it also comes with higher variance and potential for significant losses. To use this strategy effectively, players should set strict bankroll limits and be prepared for losing streaks before landing a big win.",
  },
  {
    id: 4,
    title: "Low-Risk, Steady Growth Strategy",
    description:
      "Play with lower multipliers and safer bets to maintain a steady bankroll growth.",
    image:
      "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F552362%2Fman-sitting-at-table-with-dollar-bills-and-coins-in-front-of-him-cash-money.jpg&op=resize&w=700",
    content:
      "The Low-Risk, Steady Growth Strategy is designed for players who want to extend their playtime and gradually grow their bankroll. By choosing lower multipliers and reducing risk levels, players can achieve consistent, smaller wins over time. This strategy works best for those who prefer a conservative approach and wish to minimize drastic swings in their balance. While it may not yield massive payouts like higher-risk strategies, it provides stability and allows players to enjoy Plinko for longer sessions.",
  },
  {
    id: 5,
    title: "Martingale Variant Strategy",
    description:
      "A modified version of the Martingale system that adjusts bet size after losses.",
    image:
      "https://www.betterup.com/hubfs/Blog%20Images/strategic-planning-a-group-works-at-a-table.jpg",
    content:
      "The Martingale Variant Strategy in Plinko is a more controlled version of the traditional Martingale system. Instead of doubling the bet after every loss, this strategy involves increasing the bet by a predetermined percentage or fixed amount. The idea is to recover losses gradually without hitting betting limits too quickly. This approach helps mitigate the rapid escalation of bet sizes, making it more sustainable for longer gaming sessions while still maintaining the core concept of recovering losses with subsequent wins.",
  },
  {
    id: 6,
    title: "Pattern-Based Betting Strategy",
    description:
      "Observe patterns in Plinko and adjust your bets based on perceived trends.",
    image:
      "https://t4.ftcdn.net/jpg/02/57/67/53/360_F_257675395_kcaa2aX85BPj73zNNE5BkyNBmKeszCBa.jpg",
    content:
      "The Pattern-Based Betting Strategy relies on identifying trends and patterns in the way the Plinko board distributes outcomes. While Plinko is largely a game of chance, some players believe they can detect tendencies in how balls land and adjust their bets accordingly. This strategy involves tracking previous results and increasing bets when a certain trend appears favorable. While not based on mathematical certainty, some players find enjoyment in attempting to predict Plinko outcomes and adjusting their wagers accordingly.",
  },
  {
    id: 7,
    title: "Hybrid Strategy",
    description:
      "Combine multiple betting approaches to balance risk and reward in Plinko.",
    image:
      "https://m.economictimes.com/thumb/msid-116277102,width-1600,height-900,resizemode-4,imgsize-33048/fo-stock-strategy-how-to-trade-infosys-and-bhel.jpg",
    content:
      "The Hybrid Strategy is a versatile approach that blends elements of different betting strategies in Plinko. Players using this strategy may switch between flat betting, progressive betting, and risk-adjusted betting based on their current bankroll and recent game outcomes. The idea is to maintain flexibility and adapt to changing conditions rather than sticking to a single method. By combining strategies, players can balance short-term risk with long-term sustainability, creating a more personalized Plinko experience.",
  },
];

export default function StrategyDatabase() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null
  );

  const [tab, setTab] = useState("strategies");
  const [ownStrategies, setOwnStrategies] = useState<Strategy[]>([]);
  console.log(ownStrategies);
  useEffect(() => {
    const ownStrategieslet = JSON.parse(
      localStorage.getItem("ownStrategies") || "[]"
    );

    setOwnStrategies(ownStrategieslet);
  }, []);

  const handleClick = (tab: string) => setTab(tab);
  const removeStrategy = (id: number) => {
    const updatedStrategies = ownStrategies.filter(
      (strategy) => strategy.id !== id
    );
    setOwnStrategies(updatedStrategies);
    localStorage.setItem("ownStrategies", JSON.stringify(updatedStrategies));
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Plinko Strategy</h1>
      <div className="my-5">
        <Button
          variant={tab === "strategies" ? "" : "outline"}
          onClick={() => handleClick("strategies")}
          className="mr-2"
        >
          strategy
        </Button>
        <Button
          variant={tab === "own" ? "" : "outline"}
          onClick={() => handleClick("own")}
          className="mr-2"
        >
          Own strategy
        </Button>
      </div>
      {tab === "strategies" && (
        <div className="grid gap-6 ">
          {strategies.map((strategy) => (
            <motion.div
              key={strategy.id}
              className="overflow-hidden rounded-lg bg-gray-800 shadow-lg border-none"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={strategy.image || "/placeholder.svg"}
                alt={strategy.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold text-white">
                  {strategy.title}
                </h2>
                <p className="mb-4 text-gray-400">{strategy.description}</p>
                <Button
                  onClick={() => setSelectedStrategy(strategy)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {tab === "own" && (
        <>
          <AddOwnStrategy />
          <div className="grid gap-6 ">
            {Array.isArray(ownStrategies) && ownStrategies.length < 1 && (
              <div className="p-5 border-2 border-dashed border-purple-500 bg-purple-500 bg-opacity-20 rounded-lg">
                <Clock className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <p className="text-purple-500 text-center text-[34px]">
                  You haven't added any strategies yet.
                </p>
              </div>
            )}
            {Array.isArray(ownStrategies) &&
              ownStrategies.map((strategy) => (
                <motion.div
                  key={strategy.id}
                  className="overflow-hidden rounded-lg bg-gray-800 shadow-lg border-none"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={strategy.image || "/placeholder.svg"}
                    alt={strategy.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="mb-2 text-xl font-semibold text-white">
                      {strategy.title}
                    </h2>
                    <p className="mb-4 text-gray-400">{strategy.description}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedStrategy(strategy)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Read More
                      </Button>
                      <Button
                        onClick={() => removeStrategy(strategy.id)}
                        className="w-18 bg-red-500 hover:bg-red-700"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </>
      )}

      {/* Strategy Detail Modal */}
      <Dialog
        open={!!selectedStrategy}
        onOpenChange={(open) => !open && setSelectedStrategy(null)}
      >
        <DialogContent className="border-none max-h-[80vh] overflow-y-auto bg-gray-800 text-white sm:max-w-2xl">
          {selectedStrategy && (
            <>
              <DialogHeader>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedStrategy(null)}
                  className="absolute left-4 top-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-center text-xl">
                  {selectedStrategy.title}
                </DialogTitle>
              </DialogHeader>
              <img
                src={selectedStrategy.image || "/placeholder.svg"}
                alt={selectedStrategy.title}
                className="mb-4 h-48 w-full object-cover"
              />
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedStrategy.content }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
