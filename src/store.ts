const MAXIMUM_DISCOUNT_RATE = 50;
const DECREASE_RATE_BY_DAY = 1;
const DECREASE_RATE_BY_DAY_AFTER_EXPIRATION = 2;

export class DiscountOffer {
  constructor(
    readonly partnerName: string,
    public expiresIn: number,
    public discountRateInPercent: number
  ) {}

  /**
   * Check if the discount rate percent should be updated or not.
   *
   * @return boolean
   */
  shouldUpdateDiscount(): boolean {
    return (
      this.discountRateInPercent > 0 &&
      this.discountRateInPercent < MAXIMUM_DISCOUNT_RATE
    );
  }

  /**
   * Decrease the number of days to expiration by one day.
   *
   * @return void
   */
  decreaseExpiration(): void {
    this.expiresIn--;
  }

  /**
   * Update the discount rate following the default offer rules.
   * (See the "Default discount offer" tests in store.test.ts
   * for more details about the default discount rules)
   *
   * @return void
   */
  updateDiscountRate(): void {
    this.decreaseExpiration();

    if (!this.shouldUpdateDiscount()) {
      return;
    }

    if (this.expiresIn > 0) {
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
  constructor(public discountOffers: DiscountOffer[] = []) {}

  updateDiscounts() {
    for (const discountOffer of this.discountOffers) {
      discountOffer.updateDiscountRate();
    }

    return this.discountOffers;
  }
}
