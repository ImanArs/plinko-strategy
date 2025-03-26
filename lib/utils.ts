import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Myth {
  id: number;
  title: string;
  description: string;
  isTrue: boolean;
}

export const myths: Myth[] = [
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
