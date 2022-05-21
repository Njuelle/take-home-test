import { Store, DiscountOffer } from "./store";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40),
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
