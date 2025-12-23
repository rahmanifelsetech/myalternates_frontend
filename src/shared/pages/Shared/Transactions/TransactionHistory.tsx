import React from 'react';
import { useTransactions } from '@hooks/useTransactions';

const TransactionHistory: React.FC = () => {
  const { transactions, loading, error } = useTransactions('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((tx) => (
            <tr key={tx.id}>
              <td className="border p-2">{new Date((tx as any).createdAt).toLocaleDateString()}</td>
              <td className="border p-2">{tx.type}</td>
              <td className="border p-2">${tx.amount}</td>
              <td className="border p-2">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
