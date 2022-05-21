import { DiscountOffer } from "./store";

const INCREASE_RATE_BY_DAY = 1;
const INCREASE_RATE_BY_DAY_AFTER_EXPIRATION = 2;

export class NaturaliaOffer extends DiscountOffer {
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
      this.discountRateInPercent += INCREASE_RATE_BY_DAY;
    } else {
      this.discountRateInPercent += INCREASE_RATE_BY_DAY_AFTER_EXPIRATION;
    }
  }
}
