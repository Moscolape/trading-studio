interface StrategyFormData {
  scanner: Record<string, string | number | boolean>;
  buy: Record<string, string | number | boolean>;
  sell: Record<string, string | number | boolean>;
  simulation: Record<string, string | number | boolean>;
}

export const saveStrategyToLocalStorage = (strategy: StrategyFormData) => {
  const formattedStrategy = {
    scanner: { ruleKey: strategy.scanner?.ruleKey || "" },
    buy: { ruleKey: strategy.buy?.ruleKey || "" },
    sell: { ruleKey: strategy.sell?.ruleKey || "" },
    simulation: { ruleKey: strategy.simulation?.ruleKey || "" },
  };

  localStorage.setItem("strategies", JSON.stringify(formattedStrategy));
};

export const loadStrategyFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedStrategies = localStorage.getItem("strategies");
      return storedStrategies ? JSON.parse(storedStrategies) : [];
    }
    return [];
  };
  
