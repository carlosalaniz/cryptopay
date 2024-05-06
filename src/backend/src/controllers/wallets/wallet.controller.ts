
import { Body, Controller, Get, Path, Post, Route, Response, Tags, Security } from 'tsoa';
import { wallets } from '../../data.fake';
import { Wallet, WalletType } from './wallet.types';


@Tags("Wallets")
@Route("wallets")
@Security('jwt')
export class WalletController extends Controller {
    @Get('{user_id}')
    public async List(
        @Path() user_id: string,
    ): Promise<Wallet[]> {
        return wallets;
    }

    @Post('{user_id}/enough-balance')
    public async ListWithEnoughBalance(
        @Path() user_id: string,
        @Body() body: {
            fiat: number,
            currencyCode: string
        }
    ): Promise<Wallet[]> {
        return wallets;
    }

    @Get('{user_id}/{wallet_type}/balance')
    public async Balance(
        @Path() user_id: string,
        @Path() wallet_type: WalletType,
    ): Promise<number> {
        return wallets.filter(w => w.type === wallet_type)[0]?.balance || 0;
    }

    @Get('{user_id}/{wallet_type}/deposit/address')
    public async Deposit(
        @Path() user_id: string,
        @Path() wallet_type: WalletType,
    ): Promise<string> {
        return '0x1234567890'
    }

    @Post('{user_id}/{wallet_type}/withdraw')
    @Response<void>('200', 'Withdrawal successful')
    @Response<string>('400', 'Bad Request - Invalid parameters')
    @Response<string>('409', 'Bad Request - Insufficient funds')
    public async Withdraw(
        @Path() user_id: string,
        @Path() wallet_type: WalletType,
        @Body() body: {
            amount: number,
            destinationAddress: string
        }
    ): Promise<void | string> {
        return
    }
}
