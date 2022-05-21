import { Store, DiscountOffer, NaturaliaOffer } from "../src/store";

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
});
