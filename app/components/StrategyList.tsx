"use client"

import { useEffect, useState } from "react"

interface StrategyData {
  scanner: Record<string, string | number | boolean>;
  buy: Record<string, string | number | boolean>;
  sell: Record<string, string | number | boolean>;
  simulation: Record<string, string | number | boolean>;
  id: number
  name: string
}

const StrategyList = () => {
  const [strategies, setStrategies] = useState<StrategyData[]>([])

  const fetchStrategies = (): StrategyData[] => {
    const saved = localStorage.getItem("strategies")
    return saved ? JSON.parse(saved) : []
  }

  const saveStrategies = (updated: StrategyData[]) => {
    localStorage.setItem("strategies", JSON.stringify(updated))
    setStrategies(updated)
  }

  useEffect(() => {
    setStrategies(fetchStrategies())
  }, [])

  const handleCopyStrategy = (strategy: StrategyData) => {
    const copied = {
      ...strategy,
      id: Date.now(),
      name: `${strategy.name} (Copy)`
    }
    const updated = [...strategies, copied]
    saveStrategies(updated)
    alert("Strategy copied!")
  }

  const handleDeleteStrategy = (id: number) => {
    const updated = strategies.filter((s) => s.id !== id)
    saveStrategies(updated)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Saved Strategies</h2>

      {strategies.length > 0 ? (
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="border rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition"
            >
              <div>
                <p className="text-sm text-gray-500">ID: {strategy.id}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleCopyStrategy(strategy)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDeleteStrategy(strategy.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No saved strategies available.</p>
      )}
    </div>
  )
}

export default StrategyList;