"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCurrencyAmount = exports.displayTokenAmount = exports.ServicePaymentForm = exports.FormInputDefinition = void 0;
var FormInputDefinition = /** @class */ (function () {
    function FormInputDefinition(params) {
        this.title = params.title;
        this.fieldIdentifier = params.fieldIdentifier;
        this.type = params.type;
        this.regex = params.regex;
        this.validationMessage = params.validationMessage;
        this.required = params.required;
    }
    FormInputDefinition.prototype.isValid = function (value) {
        if (value == null)
            return false;
        // console.log(value);
        // alert(1);
        if (this.required && !value) {
            return false;
        }
        if (this.regex && !new RegExp(this.regex).test(value)) {
            return false;
        }
        return true;
    };
    return FormInputDefinition;
}());
exports.FormInputDefinition = FormInputDefinition;
var ServicePaymentForm = /** @class */ (function () {
    function ServicePaymentForm(params) {
        this.fiatPaymentLimits = undefined;
        this.fiatPaymentLimits = params.fiatPaymentLimits;
        this.serviceId = params.serviceId;
        this.serviceTitle = params.serviceTitle;
        this.feePercent = params.feePercent;
        this.fee = params.fee;
        this.input = params.input;
    }
    return ServicePaymentForm;
}());
exports.ServicePaymentForm = ServicePaymentForm;
function displayTokenAmount(amount, i10n, token) {
    if (!token) {
        return "";
    }
    // Create a formatter for Bitcoin display (up to 8 decimal places)
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: token.tokenSymbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: token.decimals
    });
    debugger;
    // Format and return the precise amount
    return formatter.format(amount);
}
exports.displayTokenAmount = displayTokenAmount;
function displayCurrencyAmount(amount, i10n, currencySymbol, decimals) {
    if (decimals === void 0) { decimals = 2; }
    var formatter = new Intl.NumberFormat(i10n, {
        style: 'currency',
        currency: currencySymbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formatter.format(amount);
}
exports.displayCurrencyAmount = displayCurrencyAmount;
