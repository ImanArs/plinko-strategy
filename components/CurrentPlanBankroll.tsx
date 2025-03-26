import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

const defaultPlans = [
  {
    id: "conservative",
    name: "Conservative",
    risk: "Low",
    dailyLimits: [5, 6, 4, 7, 5, 6, 3, 8, 5, 6],
  },
  {
    id: "balanced",
    name: "Balanced",
    risk: "Medium",
    dailyLimits: [10, 12, 8, 15, 10, 11, 9, 14, 10, 12],
  },
  {
    id: "aggressive",
    name: "Aggressive",
    risk: "High",
    dailyLimits: [20, 25, 15, 30, 22, 18, 27, 24, 20, 25],
  },
];

export default function BankrollPlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("conservative");
  const [showTodayGraph, setShowTodayGraph] = useState(false);
  const [storagePlan, setStoragePlan] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    risk: "",
    dailyLimits: Array(10).fill(0),
  });
  const [todayExpenses, setTodayExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState(0);

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem("customPlans")) || [];
    setStoragePlan(storedPlans);
    setPlans([...defaultPlans, ...storedPlans]);
  }, []);

  const addCustomPlan = () => {
    const newCustom = { ...newPlan, id: Date.now().toString() };
    const storedPlans = JSON.parse(localStorage.getItem("customPlans")) || [];
    localStorage.setItem(
      "customPlans",
      JSON.stringify([...storedPlans, newCustom])
    );
    setPlans([...plans, newCustom]);
    setNewPlan({ name: "", risk: "", dailyLimits: Array(10).fill(0) });
  };

  const addExpense = () => {
    setTodayExpenses([
      ...todayExpenses,
      { time: Date.now(), amount: newExpense },
    ]);
    setNewExpense(0);
  };

  const bankrollData = plans
    .find((p) => p.id === selectedPlan)
    ?.dailyLimits.map((limit, index) => ({
      day: `Day ${index + 1}`,
      Plan: limit,
    }));

  const handleRemovePlan = (id) => {
    const updatedPlans = storagePlan.filter((p) => p.id !== id);
    localStorage.setItem("customPlans", JSON.stringify(updatedPlans));
    setStoragePlan(updatedPlans);
    setPlans([...defaultPlans, ...updatedPlans]);
  };

  return (
    <div className="my-10 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Bankroll Management Plans</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer ${
              selectedPlan === plan.id ? "border-green-500" : "border-gray-700"
            }`}
          >
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm">Risk: {plan.risk}</p>
              <div className="flex gap-2">
                <Button
                  className="mt-2 w-full"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  Select
                </Button>
                {storagePlan.find((p) => p.id === plan.id) && (
                  <Button
                    className="mt-2 w-10 bg-red-500/30"
                    onClick={() => handleRemovePlan(plan.id)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger>
            <Card className="p-2 gap-6 w-full h-full flex flex-col border-gray-700 items-center justify-center">
              <Plus />
              <Button className="w-full">Create Plan</Button>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-bold">Create Custom Bankroll Plan</h3>
            <Input
              placeholder="Plan Name"
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            />
            <Input
              placeholder="Risk Level"
              onChange={(e) => setNewPlan({ ...newPlan, risk: e.target.value })}
            />
            {newPlan.dailyLimits.map((limit, index) => (
              <Input
                key={index}
                type="number"
                placeholder={`Day ${index + 1} Limit %`}
                value={limit}
                onChange={(e) => {
                  const updatedLimits = [...newPlan.dailyLimits];
                  updatedLimits[index] = Number(e.target.value);
                  setNewPlan({ ...newPlan, dailyLimits: updatedLimits });
                }}
              />
            ))}
            <DialogClose>
              <Button onClick={addCustomPlan}>Save Plan</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <h3 className="text-lg font-bold mb-2">Bankroll Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={bankrollData}>
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Plan"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <Button
        className="mt-4"
        onClick={() => setShowTodayGraph(!showTodayGraph)}
      >
        {showTodayGraph ? "Hide Today's Graph" : "Show Today's Graph"}
      </Button>

      {showTodayGraph && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Today's Expenses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={todayExpenses.map((exp, index) => ({
                day: index + 1,
                Spent: exp.amount,
              }))}
            >
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Spent"
                stroke="#ff4d4d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <Dialog>
            <DialogTrigger>
              <Button className="mt-4">+ Add Expense</Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-bold">Add Today's Expense</h3>
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense}
                onChange={(e) => setNewExpense(Number(e.target.value))}
              />
              <DialogClose>
                <Button onClick={addExpense}>Save Expense</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
