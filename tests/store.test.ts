import { Store, DiscountOffer } from "../src/store";
import { NaturaliaOffer } from "../src/naturalia";

describe("Store", () => {
  describe("Default discount offer", () => {
    it("should decrease the discount and expiresIn", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 2)]);
    });

    it("should decrease the discount twice as fast if the expiration date has passed", () => {
      expect(
        new Store([new DiscountOffer("test", 0, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 0, 1)]);
    });

    it("should not decrease the discount if it is already equal to zero", () => {
      expect(
        new Store([new DiscountOffer("test", 2, 0)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 1, 0)]);
    });

    it("should not decrease the expiration if it is already equal to zero", () => {
      expect(
        new Store([new DiscountOffer("test", 0, 0)]).updateDiscounts()
      ).toEqual([new DiscountOffer("test", 0, 0)]);
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
      ).toEqual([new NaturaliaOffer("test", 0, 4)]);
    });

    it("should not increases the discount more than 50", () => {
      expect(
        new Store([new NaturaliaOffer("test", 2, 50)]).updateDiscounts()
      ).toEqual([new NaturaliaOffer("test", 1, 50)]);
    });
  });
});
