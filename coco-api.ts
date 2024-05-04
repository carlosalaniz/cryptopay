/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum WalletType {
  ETH = "ETH",
  BTC = "BTC",
  MONERO = "MONERO",
  USDT = "USDT",
  USDC = "USDC",
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

export enum ServiceAccountType {
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
  CashWithdrawl = "CashWithdrawl",
}

export interface ServiceAccount {
  id: string;
  accountIdentifier: string;
  nickname: string;
  accountType: ServiceAccountType;
}

export enum PaymentState {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
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

export type List2Data = ServiceAccount[];

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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

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
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title cryptopay
 * @version 1.0.0
 * @license ISC
 * @baseUrl /
 * @contact
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  userId = {
    /**
     * No description
     *
     * @name List
     * @request GET:/{user_id}/wallets
     */
    list: (userId: number, params: RequestParams = {}) =>
      this.http.request<ListData, any>({
        path: `/${userId}/wallets`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ListWithEnoughBalance
     * @request POST:/{user_id}/wallets/enough-balance
     */
    listWithEnoughBalance: (userId: number, data: ListWithEnoughBalancePayload, params: RequestParams = {}) =>
      this.http.request<ListWithEnoughBalanceData, any>({
        path: `/${userId}/wallets/enough-balance`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name Balance
     * @request GET:/{user_id}/wallets/{wallet_type}/balance
     */
    balance: (userId: number, walletType: WalletType, params: RequestParams = {}) =>
      this.http.request<BalanceData, any>({
        path: `/${userId}/wallets/${walletType}/balance`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name Deposit
     * @request GET:/{user_id}/wallets/{wallet_type}/deposit/address
     */
    deposit: (userId: number, walletType: WalletType, params: RequestParams = {}) =>
      this.http.request<DepositData, any>({
        path: `/${userId}/wallets/${walletType}/deposit/address`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name Withdraw
     * @request POST:/{user_id}/wallets/{wallet_type}/withdraw
     */
    withdraw: (userId: number, walletType: WalletType, data: WithdrawPayload, params: RequestParams = {}) =>
      this.http.request<WithdrawData, WithdrawError>({
        path: `/${userId}/wallets/${walletType}/withdraw`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name AccountPayments
     * @request GET:/{user_id}/payments
     */
    accountPayments: (userId: number, params: RequestParams = {}) =>
      this.http.request<AccountPaymentsData, any>({
        path: `/${userId}/payments`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name List2
     * @request GET:/{user_id}/payments/service-accounts
     * @originalName list
     * @duplicate
     */
    list2: (userId: number, params: RequestParams = {}) =>
      this.http.request<List2Data, any>({
        path: `/${userId}/payments/service-accounts`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name Pay
     * @request POST:/{user_id}/payments/{service_account_id}/pay
     */
    pay: (userId: number, serviceAccountId: string, data: PayPayload, params: RequestParams = {}) =>
      this.http.request<PayData, PayError>({
        path: `/${userId}/payments/${serviceAccountId}/pay`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OneTimePayment
     * @request POST:/{user_id}/payments/one-time-payment/pay
     */
    oneTimePayment: (userId: number, data: OneTimePaymentPayload, params: RequestParams = {}) =>
      this.http.request<OneTimePaymentData, OneTimePaymentError>({
        path: `/${userId}/payments/one-time-payment/pay`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CashWithdrawalOxxo
     * @request POST:/{user_id}/payments/cash-withdrawal/oxxo
     */
    cashWithdrawalOxxo: (userId: number, data: CashWithdrawalOxxoPayload, params: RequestParams = {}) =>
      this.http.request<CashWithdrawalOxxoData, CashWithdrawalOxxoError>({
        path: `/${userId}/payments/cash-withdrawal/oxxo`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name Estimate
     * @request POST:/{user_id}/payments/estimate
     */
    estimate: (userId: number, data: EstimatePayload, params: RequestParams = {}) =>
      this.http.request<EstimateData, EstimateError>({
        path: `/${userId}/payments/estimate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @name Signup
     * @request POST:/users/signup
     */
    signup: (data: SignupPayload, params: RequestParams = {}) =>
      this.http.request<SignupData, any>({
        path: `/users/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name Login
     * @request POST:/users/login
     */
    login: (data: LoginPayload, params: RequestParams = {}) =>
      this.http.request<LoginData, any>({
        path: `/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
