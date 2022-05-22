import { Store, DiscountOffer } from "../store";
import { NaturaliaOffer } from "../offers/naturalia";
import { IlekOffer } from "../offers/ilek";
import { VintedOffer } from "../offers/vinted";
import { BackMarketOffer } from "../offers/backMarket";

describe("Store", () => {
  describe("Default discount offer", () => {
    it("should decrease the discount and expiresIn", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 2)]);

      expect(
        new Store([new DiscountOffer("test", 2, 2)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 1)]);
    });

    it("should decrease the discount twice as fast if the expiration date has passed", () => {
      expect(
        new Store([new DiscountOffer("test", 0, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", -1, 1)]);
    });

    it("should not decrease the discount if it is already equal to zero", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 0)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 0)]);
    });

    it("should not decrease the discount less than zero", () => {
      expect(
        new Store([new DiscountOffer("test", 0, 0)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", -1, 0)]);

      expect(
        new Store([new DiscountOffer("test", 0, 2)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", -1, 0)]);

      expect(
        new Store([new DiscountOffer("test", 0, 1)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", -1, 0)]);
    });
  });

  describe("Naturalia discount offer", () => {
    it("should increases the discount the older it gets", () => {
      expect(
        new Store([new NaturaliaOffer("test", 2, 1)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 2)]);
    });

    it("should increases the discount twice as fast after the expiration date", () => {
      expect(
        new Store([new NaturaliaOffer("test", 0, 2)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", -1, 4)]);
    });

    it("should not increases the discount more than 50", () => {
      expect(
        new Store([new NaturaliaOffer("test", 2, 50)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 2, 49)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 0, 49)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", -1, 50)]);
    });
  });

  describe("Ilek discount offer", () => {
    it("should never expires nor decreases", () => {
      expect(
        new Store([new IlekOffer("test", 10, 10)]).updateDiscounts()
      ).toEqual([new IlekOffer("test", 10, 10)]);
    });
  });

  describe("Vinted discount offer", () => {
    it("should increases the discount the older it gets", () => {
      expect(
        new Store([new VintedOffer("test", 20, 2)]).updateDiscounts()
      ).toEqual([new VintedOffer("test", 19, 3)]);
    });

    it("should increases increases by 2 the discount when there are 10 days or less", () => {
      expect(
        new Store([new VintedOffer("test", 10, 2)]).updateDiscounts()
      ).toEqual([new VintedOffer("test", 9, 4)]);
    });

    it("should increases increases by 3 the discount when there are 5 days or less", () => {
      expect(
        new Store([new VintedOffer("test", 5, 2)]).updateDiscounts()
      ).toEqual([new VintedOffer("test", 4, 5)]);
    });

    it("should drops discount to 0 after the expiration date", () => {
      expect(
        new Store([new VintedOffer("test", 0, 2)]).updateDiscounts()
      ).toEqual([new VintedOffer("test", -1, 0)]);
    });

    it("should not increases the discount more than 50", () => {
      expect(
        new Store([new NaturaliaOffer("test", 2, 50)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 2, 49)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 8, 50)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 7, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 8, 49)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 7, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 12, 50)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 11, 50)]);

      expect(
        new Store([new NaturaliaOffer("test", 12, 49)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 11, 50)]);
    });

    it("should not increase discount if the offer is expired", () => {
      expect(
        new Store([new BackMarketOffer("test", 0, 10)]).updateDiscounts()
      ).toEqual([new BackMarketOffer("test", -1, 10)]);
    });
  });

  describe("BackMarket discount offer", () => {
    it("should decrease discount by 2 percent per day", () => {
      expect(
        new Store([new BackMarketOffer("test", 10, 10)]).updateDiscounts()
      ).toEqual([new BackMarketOffer("test", 9, 8)]);
    });

    it("should not decrease the discount if it is already equal to zero", () => {
      expect(
        new Store([new BackMarketOffer("test", 10, 0)]).updateDiscounts()
      ).toEqual([new BackMarketOffer("test", 9, 0)]);
    });

    it("should decrease discount less than zero", () => {
      expect(
        new Store([new BackMarketOffer("test", 10, 1)]).updateDiscounts()
      ).toEqual([new BackMarketOffer("test", 9, 0)]);
    });

    it("should not decrease discount if the offer is expired", () => {
      expect(
        new Store([new BackMarketOffer("test", 0, 10)]).updateDiscounts()
      ).toEqual([new BackMarketOffer("test", -1, 10)]);
    });
  });
});
