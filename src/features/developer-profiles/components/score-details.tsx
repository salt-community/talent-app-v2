import React from "react";
import { Card } from "@/components/ui/card";

type ScoreItem = {
  category: string;
  score: number;
  maxScore: number;
};

type ScoreBreakdownProps = {
  scoreItems: ScoreItem[];
};

export function ScoreDetails({ scoreItems }: ScoreBreakdownProps) {
  const totalScore = scoreItems.reduce((acc, item) => acc + item.score, 0);
  const totalMaxScore = scoreItems.reduce(
    (acc, item) => acc + item.maxScore,
    0
  );
  const totalPercentage = (totalScore / totalMaxScore) * 100;

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">Score Breakdown</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Score
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Max Score
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scoreItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.maxScore}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {((item.score / item.maxScore) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                {totalScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {totalMaxScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                {totalPercentage.toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
