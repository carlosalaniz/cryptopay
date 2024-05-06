export declare class FormInputDefinition {
    title: string;
    fieldIdentifier: string;
    type: 'text' | 'number' | 'tel';
    regex?: string;
    validationMessage: string;
    required: boolean;
    constructor(params: {
        title: string;
        fieldIdentifier: string;
        type: 'text' | 'number' | 'tel';
        regex?: string;
        validationMessage: string;
        max?: number;
        min?: number;
        required: boolean;
    });
    isValid(value: string | undefined): boolean;
}
export type AvailableToken = {
    id: string;
    name: string;
    tokenSymbol: string;
    exchangeRate: {
        [fiatCurrencySymbol: string]: number;
    };
    decimals: number;
    balance: number;
};
export type FiatPaymentLimit = {
    [fiatCurrencySymbol: string]: {
        min?: number;
        max?: number;
    };
};
export declare class ServicePaymentForm {
    fiatPaymentLimits?: FiatPaymentLimit;
    serviceId: string;
    serviceTitle: string;
    feePercent: number;
    fee: number;
    input: FormInputDefinition[];
    constructor(params: {
        fiatPaymentLimits?: FiatPaymentLimit;
        serviceId: string;
        serviceTitle: string;
        feePercent: number;
        fee: number;
        input: FormInputDefinition[];
    });
}
export declare function displayTokenAmount(amount: number, i10n: string, token?: AvailableToken): string;
export declare function displayCurrencyAmount(amount: number, i10n: string, currencySymbol: string, decimals?: number): string;
