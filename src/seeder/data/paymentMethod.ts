import { PaymentType } from "@prisma/client";

interface paymentMethodDataType {
  name: string;
  initialBalance: number;
  paymentType: PaymentType;
  notes?: string;
}

const paymentMethodData: paymentMethodDataType[] = [
  {
    name: "Wallet",
    initialBalance: 500.0,
    paymentType: "Cash",
    notes: "Emergency use",
  },
  {
    name: "Main Bank Account",
    initialBalance: 3200.5,
    paymentType: "BankTransfer",
    notes: "Linked with salary",
  },
  {
    name: "Gift Voucher",
    initialBalance: 150.0,
    paymentType: "GiftCard",
    notes: "Birthday voucher",
  },
  {
    name: "Credit Card - Visa",
    initialBalance: 0.0,
    paymentType: "Card",
    notes: "Used for groceries",
  },
  {
    name: "PayPal",
    initialBalance: 600.75,
    paymentType: "ThirdParty",
    notes: "Freelance income",
  },
  {
    name: "Travel Card",
    initialBalance: 800.0,
    paymentType: "Card",
    notes: "Used for international trips",
  },
  {
    name: "Google Pay",
    initialBalance: 120.0,
    paymentType: "MobilePay",
    notes: "Used for quick payments",
  },
  {
    name: "Home Fund",
    initialBalance: 2000.0,
    paymentType: "HouseAccount",
    notes: "Renovation savings",
  },
  {
    name: "Office Wallet",
    initialBalance: 400.0,
    paymentType: "Cash",
    notes: "Petty cash fund",
  },
  {
    name: "Amazon Gift Card",
    initialBalance: 100.0,
    paymentType: "GiftCard",
    notes: "Online shopping",
  },
  {
    name: "Bank Transfer - Savings",
    initialBalance: 7500.0,
    paymentType: "BankTransfer",
    notes: "Long-term savings",
  },
  {
    name: "Apple Pay",
    initialBalance: 90.0,
    paymentType: "MobilePay",
    notes: "Used for food delivery",
  },
  {
    name: "Fuel Card",
    initialBalance: 0.0,
    paymentType: "Card",
    notes: "Used only for petrol",
  },
  {
    name: "Third Party - Client Wallet",
    initialBalance: 350.0,
    paymentType: "ThirdParty",
    notes: "Client wallet balance",
  },
  {
    name: "Other Account",
    initialBalance: 220.0,
    paymentType: "Other",
    notes: "Miscellaneous fund",
  },
  {
    name: "Spending Account",
    initialBalance: 410.0,
    paymentType: "HouseAccount",
    notes: "Monthly usage",
  },
  {
    name: "Work Card",
    initialBalance: 50.0,
    paymentType: "Card",
    notes: "Used for client dinners",
  },
  {
    name: "Emergency Cash",
    initialBalance: 1000.0,
    paymentType: "Cash",
    notes: "Emergency use only",
  },
  {
    name: "Online Bonus Card",
    initialBalance: 75.0,
    paymentType: "GiftCard",
    notes: "Received from campaign",
  },
  {
    name: "Investment Transfer",
    initialBalance: 15000.0,
    paymentType: "BankTransfer",
    notes: "Stock market fund",
  },
];

export default paymentMethodData;
