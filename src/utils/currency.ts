
import { type SupportedCurrency } from "../components/CategoryCard";

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  {
    symbol: "SOL",
    name: "Solana",
    chain: "solana",
    decimals: 9
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    chain: "evm",
    decimals: 18
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    chain: "evm",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "evm",
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    chain: "evm",
    decimals: 18
  }
];

export const formatCurrencyValue = (
  { amount, currency }: { amount: string; currency: SupportedCurrency }
): string => {
  return `${amount} ${currency.symbol}`;
};

export const getTokenContract = async (
  contractAddress: string,
  library: any,
  account: string
) => {
  const abi = ["function approve(address spender, uint256 amount) returns (bool)"];
  return new library.eth.Contract(abi, contractAddress);
};
