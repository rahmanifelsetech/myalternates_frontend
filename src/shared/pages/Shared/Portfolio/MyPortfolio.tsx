import React from 'react';
import { usePortfolio } from '@hooks/usePortfolio';

const MyPortfolio: React.FC = () => {
  const { portfolio, loading, error } = usePortfolio('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
      {portfolio && (
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <p>Total Value: ${(portfolio as any).totalValue || 0}</p>
            <p>Total Investments: ${(portfolio as any).totalInvestments || 0}</p>
            <p>Return: {(portfolio as any).returnPercentage || 0}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPortfolio;
