import { TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, NotFoundException } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { ListQuoteQueryDto } from './dto/list-quote.req.dto';
import { Result } from 'oxide.ts';
import { ListQuoteResDto } from './dto/list-quote.res.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  /**
   * Get Quote Summary By Symbol Or Company Name
   * @tag Quote Summary
   * @summary Get Quote Summary By Symbol Or Company Name
   *
   * @returns Successful
   **/
  @TypedRoute.Get('/:symbol_or_company_name')
  @Public()
  async getStock(
    @TypedParam('symbol_or_company_name') symbolOrCompanyName: string,
    @TypedQuery() query: ListQuoteQueryDto,
  ) {
    const listQuoteSummary: Result<ListQuoteResDto[], unknown> =
      await this.quoteService.listQuoteSummaryBySymbol(
        symbolOrCompanyName,
        query,
      );
    if (listQuoteSummary.isErr()) {
      throw new NotFoundException(listQuoteSummary.unwrapErr());
    }
    if (listQuoteSummary.isOk()) {
      return listQuoteSummary.unwrap();
    }
  }
}
