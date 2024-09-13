export interface ListQuote {
  symbol: string;
  companyName: string;
  currentPriceUSD: number;
  currentPriceTHB: number;
  marketTime: Date;
  quoteType: string;
  isCryptoCurrency: boolean;
}
