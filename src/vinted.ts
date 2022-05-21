import { DiscountOffer } from "./store";

const DEFAULT_INCREASE_RATE = 1;
const INCREASE_RATE_FOR_TEN_DAYS_LEFT = 2;
const INCREASE_RATE_FOR_FIVE_DAYS_LEFT = 3;

export class VintedOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    super(partnerName, expiresIn, discountRateInPercent);
  }

  public updateDiscountRate(): void {
    if (!this.shouldUpdateDiscount()) {
      this.decreaseExpiration();
      return;
    }

    if (this.expiresIn > 0) {
      this.decreaseExpiration();

      switch (true) {
        case this.expiresIn < 5:
          this.discountRateInPercent += INCREASE_RATE_FOR_FIVE_DAYS_LEFT;
          break;
        case this.expiresIn < 10:
          this.discountRateInPercent += INCREASE_RATE_FOR_TEN_DAYS_LEFT;
          break;
        default:
          this.discountRateInPercent += DEFAULT_INCREASE_RATE;
          break;
      }
    } else {
      this.discountRateInPercent = 0;
    }
  }
}
