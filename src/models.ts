interface CurrencyRateResponseGet {
    [date: string]: number;
}

interface CurrencyResponseGet {
    [currency: string]: CurrencyRateResponseGet;
}

export interface CurrencyResponseResponseGet {
    [baseCurrency: string]: CurrencyResponseGet;
}
