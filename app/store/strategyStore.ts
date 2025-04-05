import { create } from "zustand";

interface RuleConfig {
  [key: string]: string | number | boolean;
}

interface Strategy {
  scanner: RuleConfig;
  buy: RuleConfig;
  sell: RuleConfig;
  simulation: RuleConfig;
}

interface StrategyStore {
  strategies: Strategy[];
  addStrategy: (strategy: Strategy) => void;
}

export const useStrategyStore = create<StrategyStore>((set) => ({
  strategies: [],
  addStrategy: (strategy) => {
    set((state) => {
      const updatedStrategies = [...state.strategies, strategy];
      if (typeof window !== "undefined") {
        localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
      }
      return { strategies: updatedStrategies };
    });
  },
}));

if (typeof window !== "undefined") {
  const storedStrategies = localStorage.getItem("strategies");
  if (storedStrategies) {
    useStrategyStore.setState({ strategies: JSON.parse(storedStrategies) });
  }
}
