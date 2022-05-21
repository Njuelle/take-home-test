import { DiscountOffer } from "./store";

const DEFAULT_INCREASE_RATE = 1;
const INCREASE_RATE_FOR_TEN_DAYS_LEFT = 2;
const INCREASE_RATE_FOR_FIVE_DAYS_LEFT = 3;
const MAXIMUM_DISCOUNT_RATE = 50;

export class VintedOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    super(partnerName, expiresIn, discountRateInPercent);
  }

  public updateDiscountRate(): void {
    this.decreaseExpiration();

    if (!this.shouldUpdateDiscount()) {
      return;
    }

    if (this.expiresIn > 0) {
      switch (true) {
        case this.expiresIn <= 5:
          this.discountRateInPercent += INCREASE_RATE_FOR_FIVE_DAYS_LEFT;
          break;
        case this.expiresIn <= 10:
          this.discountRateInPercent += INCREASE_RATE_FOR_TEN_DAYS_LEFT;
          break;
        default:
          this.discountRateInPercent += DEFAULT_INCREASE_RATE;
          break;
      }

      if (this.discountRateInPercent > MAXIMUM_DISCOUNT_RATE) {
        this.discountRateInPercent = MAXIMUM_DISCOUNT_RATE;
      }
    } else {
      this.discountRateInPercent = 0;
    }
  }
}
