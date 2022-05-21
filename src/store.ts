const MAXIMUM_DISCOUNT_RATE = 50;
const DECREASE_RATE_BY_DAY = 1;
const DECREASE_RATE_BY_DAY_AFTER_EXPIRATION = 2;

export class DiscountOffer {
  constructor(
    readonly partnerName: string,
    public expiresIn: number,
    public discountRateInPercent: number
  ) {}

  shouldUpdateDiscount(): boolean {
    return (
      this.discountRateInPercent > 0 &&
      this.discountRateInPercent < MAXIMUM_DISCOUNT_RATE
    );
  }

  decreaseExpiration(): void {
    if (this.expiresIn === 0) {
      return;
    }

    this.expiresIn--;
  }

  updateDiscountRate(): void {
    if (!this.shouldUpdateDiscount()) {
      this.decreaseExpiration();
      return;
    }

    if (this.expiresIn > 0) {
      this.decreaseExpiration();
      this.discountRateInPercent -= DECREASE_RATE_BY_DAY;
    } else {
      this.discountRateInPercent =
        this.discountRateInPercent >= DECREASE_RATE_BY_DAY_AFTER_EXPIRATION
          ? this.discountRateInPercent - DECREASE_RATE_BY_DAY_AFTER_EXPIRATION
          : this.discountRateInPercent - DECREASE_RATE_BY_DAY;
    }
  }
}

export class Store {
  constructor(public discountOffers: DiscountOffer[]) {}

  updateDiscounts() {
    for (const discountOffer of this.discountOffers) {
      discountOffer.updateDiscountRate();
    }

    return this.discountOffers;
  }
}
