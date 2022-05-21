import { DiscountOffer } from "./store";

const DECREASE_RATE_BY_DAY = 2;

export class BackMarketOffer extends DiscountOffer {
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
      this.discountRateInPercent =
        this.discountRateInPercent > 1
          ? (this.discountRateInPercent =
              this.discountRateInPercent - DECREASE_RATE_BY_DAY)
          : 0;
    }
  }
}
