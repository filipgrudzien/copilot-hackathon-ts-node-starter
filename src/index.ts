// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {currencyRates, CurrencyRatesClass} from "./mockedInMemoryData";
import {CurrencyResponseResponseGet} from "./models";

dotenv.config();
const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/health-check", (req: Request, res: Response) => {
  res.send("health check OK");
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// create instance CurrencyRatesClass
const currencyRatesClass = new CurrencyRatesClass();

app.post("/currencyExchange", (request: Request, res: Response) => {
  //debugger;
  const { from_currency, to_currency, amount, date } = request.body;

  // Fetch the exchange rate for the given date
  const exchangeRate = currencyRatesClass.currencyRates[date][from_currency][to_currency];

  if (exchangeRate === undefined) {
    res.status(400).send("Exchange rate not found");
  }

  if (amount <= 0 || isNaN(amount) || !exchangeRate) {
    res.status(400).send("Invalid amount");
  }

  // Calculate the exchanged amount
  const exchangedAmount = Number(amount) * exchangeRate;

  // Return the result
  res.json({
    currency: to_currency,
    value: exchangedAmount,
    date: date
  });
});

app.get("/currency", (req: Request, res: Response) => {
  const transformedRates: {currency: string, price_pln: string, date: string}[] = [];

  for (const date in currencyRatesClass.currencyRates) {
    for (const fromCurrency in currencyRatesClass.currencyRates[date]) {
      for (const toCurrency in currencyRatesClass.currencyRates[date][fromCurrency]) {
        if ((fromCurrency === 'EUR' || fromCurrency === 'USD') && toCurrency === 'PLN') {
          transformedRates.push({
            currency: fromCurrency,
            price_pln: currencyRatesClass.currencyRates[date][fromCurrency][toCurrency].toString(),
            date: date
          });
        }
      }
    }
  }

  transformedRates.sort((a, b) => a.currency.localeCompare(b.currency));

  res.json({currencies: transformedRates});
});


app.post("/currency", (req: Request, res: Response) => {
  const currencies = req.body.currencies;

  for (const currency of currencies) {
    const { currency: fromCurrency, price_pln: rate, date } = currency;
    currencyRatesClass.addCurrencyRate(date, fromCurrency, 'PLN', Number(rate));
  }

  res.status(201).send("Currency rates added successfully");
});

