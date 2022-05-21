import { Store, DiscountOffer } from "./store";
import fs from "fs";
import { NaturaliaOffer } from "./naturalia";
import { VintedOffer } from "./vinted";
import { IlekOffer } from "./ilek";
import { BackMarketOffer } from "./backMarket";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new NaturaliaOffer("Naturalia", 10, 5),
  new VintedOffer("Vinted", 5, 40),
  new IlekOffer("Ilek", 15, 40),
  new BackMarketOffer("BackMarket", 15, 40),
];

const store = new Store(discountOffers);
const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(store.updateDiscounts());
}

/* eslint-disable no-console */
fs.writeFile("output.txt", JSON.stringify(log), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
