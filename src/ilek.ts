import { DiscountOffer } from "./store";

export class IlekOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    super(partnerName, expiresIn, discountRateInPercent);
  }

  public updateDiscountRate(): void {
    return;
  }
}
