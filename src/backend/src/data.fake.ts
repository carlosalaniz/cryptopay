import { Payment, PaymentState, ServiceAccount, ServiceAccountType } from "./controllers/service_accounts/service_accounts.types";
import { User } from "./controllers/users/user.type";
import { Wallet, WalletType } from "./controllers/wallets/wallet.types";

export const wallets: Wallet[] = [
    {
        type: WalletType.ETH,
        balance: 100,
    },
    {
        type: WalletType.BTC,
        balance: 0.1,
    },
]

export const serviceAccounts: ServiceAccount[] = [
    {
        id: '99b6bfaf-83f8-476a-8fbb-bfffc966f62c',
        accountIdentifier: '1234567890',
        nickname: 'CFE - Honeysuckle Lane',
        accountType: ServiceAccountType.CFE,
    },
    {
        id: '70f819da-9112-4668-8078-2497a31545d7',
        accountIdentifier: '0987654321',
        nickname: 'Tecel - Mom',
        accountType: ServiceAccountType.Telcel,
    },
]

export const payments: Payment[] = [
    {
        fiatAmount: {
            fiatCurrencyCode: 'MXN',
            subtotal: 100,
            fees: 0,
            total: 100,
        },
        sourceWalletType: WalletType.ETH,
        sourceAmount: 100,
        serviceAccountType: serviceAccounts[0],
        date: new Date(),
        state: PaymentState.Completed,
        stateChangeHistory: [
            {
                state: PaymentState.Pending,
                date: new Date(1714783290502),
            },
            {
                state: PaymentState.Completed,
                date: new Date(1714783298612),
            },
        ]
    },
    {
        fiatAmount: {
            fiatCurrencyCode: 'MXN',
            subtotal: 100,
            fees: 0,
            total: 100,
        },
        sourceWalletType: WalletType.ETH,
        sourceAmount: 100,
        serviceAccountType: serviceAccounts[0],
        date: new Date(),
        state: PaymentState.Completed,
        stateChangeHistory: [
            {
                state: PaymentState.Pending,
                date: new Date(1714783330717),
            },
            {
                state: PaymentState.Completed,
                date: new Date(1714783334261),
            },
        ]
    }
]

export const user: User = {
    id: 'aaaaa-aaaaa-aaaaa-aaaaa-aaaaa',
    email: "user@email.com",
    createdAt: new Date(),
    updatedAt: new Date(),
}
