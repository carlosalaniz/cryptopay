import { WalletType } from "../wallets/wallet.types";


export enum ServiceAccountType {
    CFE = "CFE",
    TotalPlay = "TotalPlay",
    VeTv = "VeTv",
    dish = "dish",
    Megacable = "Megacable",
    Sky = "Sky",
    Telcel = "Telcel",
    Movistar = "Movistar",
    Unefon = "Unefon",
    ATT = "ATT",
    VirginMobile = "VirginMobile",
    CashWithdrawl = "CashWithdrawl"
}

export class PaymentEstimate {
    fiatAmount: number;
    feePercentage: number;
    flatFee: number;
    totalFiatAmount: number;
    conversionRate: number;
    tokenAmount: number;
}

export enum PaymentState {
    Pending = "Pending",
    Completed = "Completed",
    Failed = "Failed",
}

export class ServiceAccount {
    id: string;
    accountIdentifier: string;
    nickname: string;
    accountType: ServiceAccountType;
}


export class Payment {
    fiatAmount: {
        fiatCurrencyCode: string;
        subtotal: number;
        fees: number;
        total: number;
    };
    sourceWalletType: WalletType;
    sourceAmount: number;
    serviceAccountType: ServiceAccount;
    date: Date;
    state: PaymentState;
    stateChangeHistory: {
        state: PaymentState;
        date: Date;
    }[];
}