import { Injectable, Logger } from '@nestjs/common';
import { ListQuoteQueryDto as ListQuoteQueryDto } from './dto/list-quote.req.dto';
import yahooFinance from 'yahoo-finance2';
import { QuoteSummaryModules } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary';
import { Err, Ok, Result } from 'oxide.ts';
import { QUOTE_TYPE } from './quote.enum';
import { ListQuote } from './quote.type';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);
  constructor() {}

  async listQuoteSummaryBySymbol(
    symbol: string,
    queryParam: ListQuoteQueryDto,
  ): Promise<Result<ListQuote[], unknown>> {
    try {
      const [datas, dollarToBaht] = await Promise.all([
        yahooFinance.search(symbol),
        this.getQuoteSummaryBySymbol('USDTHB=X'),
      ]);

      const formattedDatas: ListQuote[] = [];
      for (const quote of datas.quotes) {
        if (!!!quote.symbol) continue;
        if (!!!quote.quoteType) continue;

        if (!!queryParam.filter) {
          const lowerCaseStockQuoteType = (
            quote.quoteType as string
          ).toLowerCase();

          if (this.isCryptoCurrency(queryParam.filter, lowerCaseStockQuoteType))
            continue;
          if (this.isStock(queryParam.filter, lowerCaseStockQuoteType))
            continue;
        }

        const quoteSummary: Result<
          Omit<ListQuote, 'currentPriceTHB'>,
          unknown
        > = await this.getQuoteSummaryBySymbol(quote.symbol);

        if (quoteSummary.isErr()) continue;
        if (quoteSummary.isOk()) {
          const okQuoteSummary = quoteSummary.unwrap();
          const USDTHBX = dollarToBaht as Result<
            Omit<ListQuote, 'currentPriceTHB'>,
            Error
          >;

          (okQuoteSummary as ListQuote).currentPriceTHB =
            this.convertDollarToBaht(
              okQuoteSummary.currentPriceUSD,
              USDTHBX.unwrap().currentPriceUSD,
            );

          formattedDatas.push(okQuoteSummary as ListQuote);
        }
      }

      return Ok(formattedDatas);
    } catch (error: unknown) {
      this.logger.error(error);
      return Err(error);
    }
  }

  async getQuoteSummaryBySymbol(
    symbol: string,
  ): Promise<Result<Omit<ListQuote, 'currentPriceTHB'>, unknown>> {
    try {
      const queryOptions = {
        modules: [
          'quoteType',
          'financialData',
          'price',
        ] as QuoteSummaryModules[],
      };
      const [searchedQuote] = await Promise.all([
        yahooFinance.quoteSummary(symbol, queryOptions),
      ]);

      const formattedQuoteSummary = {
        symbol: searchedQuote?.quoteType?.symbol,
        companyName: searchedQuote?.quoteType?.longName,
        currency: searchedQuote?.price?.currency,
        currentPriceUSD: searchedQuote?.price?.regularMarketPrice,
        marketTime: searchedQuote?.price?.regularMarketTime,
        quoteType: searchedQuote?.quoteType?.quoteType,
        isCryptoCurrency:
          searchedQuote?.quoteType?.quoteType === 'CRYPTOCURRENCY',
      } as Omit<ListQuote, 'currentPriceTHB'>;

      return Ok(formattedQuoteSummary);
    } catch (error: unknown) {
      this.logger.error(error);
      return Err(error);
    }
  }

  isCryptoCurrency(filter: string, quoteType: string) {
    console.log(
      filter === QUOTE_TYPE.CRYPTOCURRENCY && quoteType !== 'CRYPTOCURRENCY',
    );
    return (
      filter === QUOTE_TYPE.CRYPTOCURRENCY &&
      quoteType !== QUOTE_TYPE.CRYPTOCURRENCY
    );
  }

  isStock(filter: string, quoteType: string) {
    const isStockFilter = filter === QUOTE_TYPE.STOCK;
    const isCryptoCurrency = quoteType === QUOTE_TYPE.CRYPTOCURRENCY;

    return isStockFilter && isCryptoCurrency;
  }

  convertDollarToBaht(dollar: number, baht: number) {
    return dollar * baht;
  }
}
