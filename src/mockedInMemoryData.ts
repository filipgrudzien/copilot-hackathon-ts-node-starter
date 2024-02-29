interface CurrencyPair {
    [key: string]: number;
}

interface Currency {
    [key: string]: CurrencyPair;
}

export interface CurrencyRates {
    [key: string]: Currency;
}

// write class contain currencyRates as a field and method adding new enty to it
export class CurrencyRatesClass {
    currencyRates: CurrencyRates;

    constructor() {
        this.currencyRates = currencyRates;
    }

    addCurrencyRate(date: string, fromCurrency: string, toCurrency: string, rate: number) {
        if (!this.currencyRates[date]) {
            this.currencyRates[date] = {};
        }
        if (!this.currencyRates[date][fromCurrency]) {
            this.currencyRates[date][fromCurrency] = {};
        }
        this.currencyRates[date][fromCurrency][toCurrency] = rate;
    }
}

export const currencyRates: CurrencyRates = {
    "2023-01-01": {
        "EUR": {
            "PLN": 4.31,
            "USD": 1.22,
        },
        "USD": {
            "PLN": 3.98,
            "EUR": 1.11
        },
        "PLN": {
            "USD": 0.2516,
            "EUR": 0.18
        },
    },
    "2023-01-02": {
        "EUR": {
            "PLN": 4.50,
            "USD": 1.23,
        },
        "USD": {
            "PLN": 4.00,
            "EUR": 1.11
        },
        "PLN": {
            "USD": 0.24,
            "EUR": 0.11
        },
    },
};
