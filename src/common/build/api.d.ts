export declare enum WalletType {
    ETH = "ETH",
    BTC = "BTC",
    MONERO = "MONERO",
    USDT = "USDT",
    USDC = "USDC"
}
export interface Wallet {
    type: WalletType;
    /** @format double */
    balance: number;
}
export interface User {
    id: string;
    email: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
}
export declare enum ServiceAccountType {
    CFE = "CFE",
    TotalPlay = "TotalPlay",
    VeTv = "VeTv",
    Dish = "dish",
    Megacable = "Megacable",
    Sky = "Sky",
    Telcel = "Telcel",
    Movistar = "Movistar",
    Unefon = "Unefon",
    ATT = "ATT",
    VirginMobile = "VirginMobile",
    CashWithdrawl = "CashWithdrawl"
}
export interface ServiceAccount {
    id: string;
    accountIdentifier: string;
    nickname: string;
    accountType: ServiceAccountType;
}
export declare enum PaymentState {
    Pending = "Pending",
    Completed = "Completed",
    Failed = "Failed"
}
export interface Payment {
    fiatAmount: {
        /** @format double */
        total: number;
        /** @format double */
        fees: number;
        /** @format double */
        subtotal: number;
        fiatCurrencyCode: string;
    };
    sourceWalletType: WalletType;
    /** @format double */
    sourceAmount: number;
    serviceAccountType: ServiceAccount;
    /** @format date-time */
    date: string;
    state: PaymentState;
    stateChangeHistory: {
        /** @format date-time */
        date: string;
        state: PaymentState;
    }[];
}
export type ListData = Wallet[];
export interface ListWithEnoughBalancePayload {
    currencyCode: string;
    /** @format double */
    fiat: number;
}
export type ListWithEnoughBalanceData = Wallet[];
/** @format double */
export type BalanceData = number;
export type DepositData = string;
export interface WithdrawPayload {
    destinationAddress: string;
    /** @format double */
    amount: number;
}
export type WithdrawData = string;
export type WithdrawError = string;
export interface SignupPayload {
    lastName: string;
    firstName: string;
    password: string;
    email: string;
}
export type SignupData = User;
export interface LoginPayload {
    password: string;
    email: string;
}
export type LoginData = string;
export type AccountPaymentsData = Payment[];
export type ListResult = ServiceAccount[];
export interface PayPayload {
    sourceWalletType: WalletType;
    currencyCode: string;
    /** @format double */
    amount: number;
}
export type PayData = string;
export type PayError = string;
export interface OneTimePaymentPayload {
    saveServiceAccount: boolean;
    serviceAccountNickname: string;
    serviceAccountIdentifier: string;
    serviceAccountType: ServiceAccountType;
    sourceWalletType: WalletType;
    currencyCode: string;
    /** @format double */
    amount: number;
}
export type OneTimePaymentData = string;
export type OneTimePaymentError = string;
export interface CashWithdrawalOxxoPayload {
    currencyCode: string;
    phoneNumber: string;
    sourceWalletType: WalletType;
    /** @format double */
    amount: number;
}
export type CashWithdrawalOxxoData = string;
export type CashWithdrawalOxxoError = string;
export interface EstimatePayload {
    serviceAccountType: ServiceAccountType;
    sourceWalletType: WalletType;
    currencyCode: string;
    /** @format double */
    amount: number;
}
export type EstimateData = any;
export type EstimateError = string;
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
    protected stringifyFormItem(formItem: unknown): string;
    protected createFormData(input: Record<string, unknown>): FormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title cryptopay
 * @version 1.0.0
 * @license ISC
 * @baseUrl /
 * @contact
 */
export declare class Api<SecurityDataType extends unknown> {
    http: HttpClient<SecurityDataType>;
    constructor(http: HttpClient<SecurityDataType>);
    wallets: {
        /**
         * No description
         *
         * @tags Wallets
         * @name List
         * @request GET:/wallets/{user_id}
         * @secure
         */
        list: (userId: string, params?: RequestParams) => Promise<AxiosResponse<ListData, any>>;
        /**
         * No description
         *
         * @tags Wallets
         * @name ListWithEnoughBalance
         * @request POST:/wallets/{user_id}/enough-balance
         * @secure
         */
        listWithEnoughBalance: (userId: string, data: ListWithEnoughBalancePayload, params?: RequestParams) => Promise<AxiosResponse<ListWithEnoughBalanceData, any>>;
        /**
         * No description
         *
         * @tags Wallets
         * @name Balance
         * @request GET:/wallets/{user_id}/{wallet_type}/balance
         * @secure
         */
        balance: (userId: string, walletType: WalletType, params?: RequestParams) => Promise<AxiosResponse<number, any>>;
        /**
         * No description
         *
         * @tags Wallets
         * @name Deposit
         * @request GET:/wallets/{user_id}/{wallet_type}/deposit/address
         * @secure
         */
        deposit: (userId: string, walletType: WalletType, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * No description
         *
         * @tags Wallets
         * @name Withdraw
         * @request POST:/wallets/{user_id}/{wallet_type}/withdraw
         * @secure
         */
        withdraw: (userId: string, walletType: WalletType, data: WithdrawPayload, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
    };
    users: {
        /**
         * No description
         *
         * @tags Users
         * @name Signup
         * @request POST:/users/signup
         */
        signup: (data: SignupPayload, params?: RequestParams) => Promise<AxiosResponse<User, any>>;
        /**
         * No description
         *
         * @tags Users
         * @name Login
         * @request POST:/users/login
         */
        login: (data: LoginPayload, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
    };
    payments: {
        /**
         * No description
         *
         * @tags Payments
         * @name AccountPayments
         * @request GET:/payments/{user_id}
         * @secure
         */
        accountPayments: (userId: string, params?: RequestParams) => Promise<AxiosResponse<AccountPaymentsData, any>>;
        /**
         * No description
         *
         * @tags Payments
         * @name List
         * @request GET:/payments/{user_id}/service-accounts
         * @secure
         */
        list: (userId: string, params?: RequestParams) => Promise<AxiosResponse<ListResult, any>>;
        /**
         * No description
         *
         * @tags Payments
         * @name Pay
         * @request POST:/payments/{user_id}/{service_account_id}/pay
         * @secure
         */
        pay: (userId: string, serviceAccountId: string, data: PayPayload, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * No description
         *
         * @tags Payments
         * @name OneTimePayment
         * @request POST:/payments/{user_id}/one-time-payment/pay
         * @secure
         */
        oneTimePayment: (userId: string, data: OneTimePaymentPayload, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * No description
         *
         * @tags Payments
         * @name CashWithdrawalOxxo
         * @request POST:/payments/{user_id}/cash-withdrawal/oxxo
         * @secure
         */
        cashWithdrawalOxxo: (userId: string, data: CashWithdrawalOxxoPayload, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * No description
         *
         * @tags Payments
         * @name Estimate
         * @request POST:/payments/{user_id}/estimate
         * @secure
         */
        estimate: (userId: string, data: EstimatePayload, params?: RequestParams) => Promise<AxiosResponse<any, any>>;
    };
}
