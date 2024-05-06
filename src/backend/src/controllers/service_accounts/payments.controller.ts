import { Body, Controller, Get, Path, Post, Route, Response, Tags, Security } from "tsoa";
import { Payment, ServiceAccount, ServiceAccountType } from "./service_accounts.types";
import { payments, serviceAccounts } from "../../data.fake";
import { WalletType } from "../wallets/wallet.types";


@Tags("Payments")
@Route('payments')
@Security('jwt')
export class PaymentsController extends Controller {

    @Get('{user_id}')
    public async AccountPayments(
        @Path() user_id: string,
    ): Promise<Payment[]> {
        return payments;
    }

    @Get('{user_id}/service-accounts')
    public async List(
        @Path() user_id: string,
    ): Promise<ServiceAccount[]> {
        return serviceAccounts;
    }


    @Post('{user_id}/{service_account_id}/pay')
    @Response<string>('400', 'Bad Request - Invalid parameters')
    @Response<string>('409', 'Bad Request - Insufficient funds')
    public async Pay(
        @Path() user_id: string,
        @Path() service_account_id: string,
        @Body() body: {
            amount: number,
            currencyCode: string,
            sourceWalletType: WalletType
        }
    ): Promise<string | void> {
        return
    }

    @Post('{user_id}/one-time-payment/pay')
    @Response<string>('400', 'Bad Request - Invalid parameters')
    @Response<string>('409', 'Bad Request - Insufficient funds')
    public async OneTimePayment(
        @Path() user_id: string,
        @Body() body: {
            amount: number,
            currencyCode: string,
            sourceWalletType: WalletType,
            serviceAccountType: ServiceAccountType,
            serviceAccountIdentifier: string,
            serviceAccountNickname: string,
            saveServiceAccount: boolean
        }
    ): Promise<string | void> {
        return
    }

    @Post('{user_id}/cash-withdrawal/oxxo')
    @Response<string>('400', 'Bad Request - Invalid parameters')
    @Response<string>('409', 'Bad Request - Insufficient funds')
    public async CashWithdrawalOxxo(
        @Path() user_id: string,
        @Body() body: {
            amount: number,
            sourceWalletType: WalletType,
            phoneNumber: string,
            currencyCode: string,
        }
    ): Promise<string | void> {
        return
    }

    @Post('{user_id}/estimate')
    @Response<string>('400', 'Bad Request - Invalid parameters')
    public async Estimate(
        @Path() user_id: string,
        @Body() body: {
            amount: number,
            currencyCode: string,
            sourceWalletType: WalletType,
            serviceAccountType: ServiceAccountType
        }
    ): Promise<any> {
        const fiatAmount: number = body.amount;
        const feePercentage: number = 0.02; // Assuming a 2% fee
        const flatFee: number = 5; // Assuming a flat fee of $5
        const totalFiatAmount: number = fiatAmount + flatFee;
        const conversionRate: number = 1072640.45; // Assuming a conversion rate of 1 token = $1.25
        const tokenAmount: number = totalFiatAmount / conversionRate;

        return {
            fiatAmount,
            feePercentage,
            flatFee,
            totalFiatAmount,
            conversionRate,
            tokenAmount
        };
    }
}

