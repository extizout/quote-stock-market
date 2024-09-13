export interface ListQuoteQueryDto {
  /**
   * @enum {FilterQuotetype}
   *
   **/
  filter?: FilterQuotetype | '';
}

export enum FilterQuotetype {
  STOCK = 'stock',
  CRYPTO_CURRENCY = 'cryptocurrency',
}
