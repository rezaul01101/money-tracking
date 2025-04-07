import { PaymentType } from "@prisma/client";


export interface IPaymentMethod {
  amount: number;
  name: string;
  paymentType: PaymentType;
  notes: string;
}
