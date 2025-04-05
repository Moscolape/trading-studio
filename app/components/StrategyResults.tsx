import { useEffect, useState } from 'react';

interface Results {
  profit: number;
  totalTrades: number;
}

const StrategyResults = ({ status }: { status: string }) => {
  const [results, setResults] = useState<Results | null>(null);

  const fetchResults = () => {
    const stored = localStorage.getItem("simulationResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  };  

  useEffect(() => {
    if (status === 'Completed') {
      fetchResults();
    }
  }, [status]);

  return (
    <div>
      {results && (
        <div>
          <h3>Results:</h3>
          <p>Profit: {results.profit}</p>
          <p>Total Trades: {results.totalTrades}</p>
        </div>
      )}
    </div>
  );
};

export default StrategyResults;
