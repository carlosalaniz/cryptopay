export enum WalletType {
    ETH = 'ETH',
    BTC = 'BTC',
    MONERO = 'MONERO',
    USDT = 'USDT',
    USDC = 'USDC',
}

export class Wallet {
    type: WalletType;
    balance: number;
}
