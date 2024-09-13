import { ListQuote } from '../quote.type';

export interface ListQuoteResDto extends ListQuote {
  symbol: string;
  companyName: string;
  currentPriceUSD: number;
  currentPriceTHB: number;
  marketTime: Date;
  quoteType: string;
  isCryptoCurrency: boolean;
}
