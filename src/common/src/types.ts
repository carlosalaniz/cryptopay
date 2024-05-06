import BigNumber from 'bignumber';
export class FormInputDefinition {
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
    }) {
        this.title = params.title;
        this.fieldIdentifier = params.fieldIdentifier;
        this.type = params.type;
        this.regex = params.regex;
        this.validationMessage = params.validationMessage;
        this.required = params.required;
    }
    isValid(value: string | undefined): boolean {
        if (value == null) return false;
        // console.log(value);
        // alert(1);
        if (this.required && !value) {
            return false;
        }
        if (this.regex && !new RegExp(this.regex).test(value)) {
            return false;
        }
        return true;

    }
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
}

export type FiatPaymentLimit = {
    [fiatCurrencySymbol: string]: {
        min?: number;
        max?: number;
    };
}

export class ServicePaymentForm {
    fiatPaymentLimits?: FiatPaymentLimit = undefined;
    serviceId: string;
    serviceTitle: string;
    feePercent: number;
    fee: number;
    input: FormInputDefinition[];
    constructor(
        params: {
            fiatPaymentLimits?: FiatPaymentLimit;
            serviceId: string;
            serviceTitle: string;
            feePercent: number;
            fee: number;
            input: FormInputDefinition[]
        }
    ) {
        this.fiatPaymentLimits = params.fiatPaymentLimits;
        this.serviceId = params.serviceId;
        this.serviceTitle = params.serviceTitle;
        this.feePercent = params.feePercent;
        this.fee = params.fee;
        this.input = params.input;
    }
}


export function displayTokenAmount(amount: number, i10n: string, token?: AvailableToken) {
    if (!token) {
        return ""
    }

    // Create a formatter for Bitcoin display (up to 8 decimal places)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: token.tokenSymbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: token.decimals
    });

    debugger;
    // Format and return the precise amount
    return formatter.format(amount);
}

export function displayCurrencyAmount(amount: number, i10n: string, currencySymbol: string, decimals: number = 2) {
    const formatter = new Intl.NumberFormat(i10n, {
        style: 'currency',
        currency: currencySymbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(amount);
}