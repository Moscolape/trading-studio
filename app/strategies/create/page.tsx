"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStrategyStore } from "../../store/strategyStore";
import RuleBuilder from "../../components/RuleBuilder";
import Button from "../../components/Button";
import { strategySchema } from "../../lib/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  saveStrategyToLocalStorage,
  loadStrategyFromLocalStorage,
} from "../../utils/strategyUtils";
import StrategyResults from "@/app/components/StrategyResults";

interface StrategyFormData {
  scanner: Record<string, string | number | boolean>;
  buy: Record<string, string | number | boolean>;
  sell: Record<string, string | number | boolean>;
  simulation: Record<string, string | number | boolean>;
}

interface RuleKey {
  ruleKey: string;
}

interface Strategy {
  scanner: RuleKey;
  buy: RuleKey;
  sell: RuleKey;
  simulation: RuleKey;
}

const StrategyCreation = () => {
  const { addStrategy } = useStrategyStore();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("Not Submitted");
  const [progress, setProgress] = useState(0);

  const [savedStrategy, setStrategies] = useState<Strategy | null>(null);

  useEffect(() => {
    const strategiesFromLocalStorage = loadStrategyFromLocalStorage();
    setStrategies(strategiesFromLocalStorage);

    const savedStatus = localStorage.getItem("simulationStatus");
    const savedProgress = localStorage.getItem("simulationProgress");

    if (savedStatus) setStatus(savedStatus);
    if (savedProgress) setProgress(Number(savedProgress));
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(strategySchema),
    defaultValues: {
      scanner: { ruleKey: savedStrategy?.scanner?.ruleKey || "" },
      buy: { ruleKey: savedStrategy?.buy?.ruleKey || "" },
      sell: { ruleKey: savedStrategy?.sell?.ruleKey || "" },
      simulation: { ruleKey: savedStrategy?.simulation?.ruleKey || "" },
    },
  });

  const onNext = () => setStep((prev) => prev + 1);
  const onPrev = () => setStep((prev) => prev - 1);
  const onSubmit = (data: StrategyFormData) => {
    const strategy = {
      id: Date.now(),
      scanner: data.scanner,
      buy: data.buy,
      sell: data.sell,
      simulation: data.simulation,
    };
    addStrategy(strategy);
    alert("Strategy Saved!");
  };

  const handleSaveDraft = () => {
    const currentValues = getValues();
    saveStrategyToLocalStorage(currentValues);
    alert("Strategy draft saved!");
  };

  const handleSubmitForSimulation = () => {
    setStatus("In Progress");
    localStorage.setItem("simulationStatus", "In Progress");
    let simulatedProgress = 0;

    const interval = setInterval(() => {
      simulatedProgress += 10;
      setProgress(simulatedProgress);
      localStorage.setItem("simulationProgress", String(simulatedProgress));

      if (simulatedProgress >= 100) {
        clearInterval(interval);
        setStatus("Completed");
        localStorage.setItem("simulationStatus", "Completed");

        const results = { profit: 1000, totalTrades: 50 };
        localStorage.setItem("simulationResults", JSON.stringify(results));

        alert("Strategy simulation completed!");
      }
    }, 500);
  };

  useEffect(() => {
    if (savedStrategy) {
      setValue("scanner", { ruleKey: savedStrategy.scanner?.ruleKey || "" });
      setValue("buy", { ruleKey: savedStrategy.buy?.ruleKey || "" });
      setValue("sell", { ruleKey: savedStrategy.sell?.ruleKey || "" });
      setValue("simulation", {
        ruleKey: savedStrategy.simulation?.ruleKey || "",
      });
    }
  }, [savedStrategy, setValue]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Create New Strategy
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div>
            <Controller
              name="scanner"
              control={control}
              render={({ field }) => (
                <RuleBuilder
                  {...field}
                  title="Scanner Rules"
                  value={Object.fromEntries(
                    Object.entries(field.value).map(([key, val]) => [
                      key,
                      String(val),
                    ])
                  )}
                  onChange={(updatedRules) => {
                    const updatedScanner = { ruleKey: updatedRules.ruleKey };
                    setValue("scanner", updatedScanner);
                  }}
                />
              )}
            />
            {errors.scanner && (
              <p className="text-red-500">{errors.scanner.ruleKey?.message}</p>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <Controller
              name="buy"
              control={control}
              render={({ field }) => (
                <RuleBuilder
                  {...field}
                  title="Buy Rules"
                  value={Object.fromEntries(
                    Object.entries(field.value).map(([key, val]) => [
                      key,
                      String(val),
                    ])
                  )}
                  onChange={(updatedRules) => {
                    const updatedBuy = { ruleKey: updatedRules.ruleKey };
                    setValue("buy", updatedBuy);
                  }}
                />
              )}
            />
            {errors.buy && (
              <p className="text-red-500">{errors.buy.ruleKey?.message}</p>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <Controller
              name="sell"
              control={control}
              render={({ field }) => (
                <RuleBuilder
                  {...field}
                  title="Sell Rules"
                  value={Object.fromEntries(
                    Object.entries(field.value).map(([key, val]) => [
                      key,
                      String(val),
                    ])
                  )}
                  onChange={(updatedRules) => {
                    const updatedSell = { ruleKey: updatedRules.ruleKey };
                    setValue("sell", updatedSell);
                  }}
                />
              )}
            />
            {errors.sell && (
              <p className="text-red-500">{errors.sell.ruleKey?.message}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <Controller
              name="simulation"
              control={control}
              render={({ field }) => (
                <RuleBuilder
                  {...field}
                  title="Simulation Rules"
                  value={Object.fromEntries(
                    Object.entries(field.value).map(([key, val]) => [
                      key,
                      String(val),
                    ])
                  )}
                  onChange={(updatedRules) => {
                    const updatedSimulation = { ruleKey: updatedRules.ruleKey };
                    setValue("simulation", updatedSimulation);
                  }}
                />
              )}
            />
            {errors.simulation && (
              <p className="text-red-500">
                {errors.simulation.ruleKey?.message}
              </p>
            )}
            {/* Simulation Section */}
            <button
              type="button"
              onClick={handleSubmitForSimulation}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit for Simulation
            </button>
            <div className="mt-2">Status: {status}</div>
            <div className="mt-2">Progress: {progress}%</div>
          </div>
        )}

        {step === 3 && <StrategyResults status={status} />}
        <div className="flex justify-between mt-4 flex-col sm:flex-row">
          {step > 0 && <Button onClick={onPrev} text="Previous" />}
          {step < 3 ? (
            <Button onClick={onNext} text="Next" />
          ) : (
            <div>
              <Button type="submit" text="Save Strategy" />
              <Button
                type="button"
                onClick={handleSaveDraft}
                text="Save Draft"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default StrategyCreation;
