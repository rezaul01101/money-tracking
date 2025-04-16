import { PaymentType } from "@prisma/client";


export interface IPaymentMethod {
  id?: number;
  amount: number;
  name: string;
  paymentType: PaymentType;
  notes: string;
}
