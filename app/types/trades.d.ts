/* eslint-disable unused-imports/no-unused-vars */
type Trade = {
  id: string;
  instrumentName: string;
  amount?: number;
  amountInUsd?: number;
  stage: "entry" | "in-trade" | "close" | "post-mortem";
  takeProfitPrice: number;
  stopLossPrice: number;
  entryPrice: number;
};
