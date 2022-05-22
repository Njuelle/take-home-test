import { Store, DiscountOffer } from "./store";
import fs from "fs";
import { NaturaliaOffer } from "./offers/naturalia";
import { VintedOffer } from "./offers/vinted";
import { IlekOffer } from "./offers/ilek";
import { BackMarketOffer } from "./offers/backMarket";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new NaturaliaOffer("Naturalia", 10, 5),
  new VintedOffer("Vinted", 5, 40),
  new IlekOffer("Ilek", 15, 40),
  new BackMarketOffer("BackMarket", 15, 40),
];

const store = new Store(discountOffers);
const log: string[] = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(store.updateDiscounts()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log.join(","), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
