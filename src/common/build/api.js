"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = exports.PaymentState = exports.ServiceAccountType = exports.WalletType = void 0;
var WalletType;
(function (WalletType) {
    WalletType["ETH"] = "ETH";
    WalletType["BTC"] = "BTC";
    WalletType["MONERO"] = "MONERO";
    WalletType["USDT"] = "USDT";
    WalletType["USDC"] = "USDC";
})(WalletType || (exports.WalletType = WalletType = {}));
var ServiceAccountType;
(function (ServiceAccountType) {
    ServiceAccountType["CFE"] = "CFE";
    ServiceAccountType["TotalPlay"] = "TotalPlay";
    ServiceAccountType["VeTv"] = "VeTv";
    ServiceAccountType["Dish"] = "dish";
    ServiceAccountType["Megacable"] = "Megacable";
    ServiceAccountType["Sky"] = "Sky";
    ServiceAccountType["Telcel"] = "Telcel";
    ServiceAccountType["Movistar"] = "Movistar";
    ServiceAccountType["Unefon"] = "Unefon";
    ServiceAccountType["ATT"] = "ATT";
    ServiceAccountType["VirginMobile"] = "VirginMobile";
    ServiceAccountType["CashWithdrawl"] = "CashWithdrawl";
})(ServiceAccountType || (exports.ServiceAccountType = ServiceAccountType = {}));
var PaymentState;
(function (PaymentState) {
    PaymentState["Pending"] = "Pending";
    PaymentState["Completed"] = "Completed";
    PaymentState["Failed"] = "Failed";
})(PaymentState || (exports.PaymentState = PaymentState = {}));
var axios_1 = require("axios");
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (exports.ContentType = ContentType = {}));
var HttpClient = /** @class */ (function () {
    function HttpClient(_a) {
        if (_a === void 0) { _a = {}; }
        var _this = this;
        var securityWorker = _a.securityWorker, secure = _a.secure, format = _a.format, axiosConfig = __rest(_a, ["securityWorker", "secure", "format"]);
        this.securityData = null;
        this.setSecurityData = function (data) {
            _this.securityData = data;
        };
        this.request = function (_a) { return __awaiter(_this, void 0, void 0, function () {
            var secureParams, _b, requestParams, responseFormat;
            var secure = _a.secure, path = _a.path, type = _a.type, query = _a.query, format = _a.format, body = _a.body, params = __rest(_a, ["secure", "path", "type", "query", "format", "body"]);
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (typeof secure === "boolean" ? secure : this.secure) &&
                            this.securityWorker;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.securityWorker(this.securityData)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        secureParams = (_b) ||
                            {};
                        requestParams = this.mergeRequestParams(params, secureParams);
                        responseFormat = format || this.format || undefined;
                        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
                            body = this.createFormData(body);
                        }
                        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
                            body = JSON.stringify(body);
                        }
                        return [2 /*return*/, this.instance.request(__assign(__assign({}, requestParams), { headers: __assign(__assign({}, (requestParams.headers || {})), (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), params: query, responseType: responseFormat, data: body, url: path }))];
                }
            });
        }); };
        this.instance = axios_1.default.create(__assign(__assign({}, axiosConfig), { baseURL: axiosConfig.baseURL || "/" }));
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    HttpClient.prototype.mergeRequestParams = function (params1, params2) {
        var method = params1.method || (params2 && params2.method);
        return __assign(__assign(__assign(__assign({}, this.instance.defaults), params1), (params2 || {})), { headers: __assign(__assign(__assign({}, ((method && this.instance.defaults.headers[method.toLowerCase()]) || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    };
    HttpClient.prototype.stringifyFormItem = function (formItem) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        }
        else {
            return "".concat(formItem);
        }
    };
    HttpClient.prototype.createFormData = function (input) {
        var _this = this;
        return Object.keys(input || {}).reduce(function (formData, key) {
            var property = input[key];
            var propertyContent = property instanceof Array ? property : [property];
            for (var _i = 0, propertyContent_1 = propertyContent; _i < propertyContent_1.length; _i++) {
                var formItem = propertyContent_1[_i];
                var isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : _this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
/**
 * @title cryptopay
 * @version 1.0.0
 * @license ISC
 * @baseUrl /
 * @contact
 */
var Api = /** @class */ (function () {
    function Api(http) {
        var _this = this;
        this.wallets = {
            /**
             * No description
             *
             * @tags Wallets
             * @name List
             * @request GET:/wallets/{user_id}
             * @secure
             */
            list: function (userId, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/wallets/".concat(userId), method: "GET", secure: true }, params));
            },
            /**
             * No description
             *
             * @tags Wallets
             * @name ListWithEnoughBalance
             * @request POST:/wallets/{user_id}/enough-balance
             * @secure
             */
            listWithEnoughBalance: function (userId, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/wallets/".concat(userId, "/enough-balance"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Wallets
             * @name Balance
             * @request GET:/wallets/{user_id}/{wallet_type}/balance
             * @secure
             */
            balance: function (userId, walletType, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/wallets/".concat(userId, "/").concat(walletType, "/balance"), method: "GET", secure: true }, params));
            },
            /**
             * No description
             *
             * @tags Wallets
             * @name Deposit
             * @request GET:/wallets/{user_id}/{wallet_type}/deposit/address
             * @secure
             */
            deposit: function (userId, walletType, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/wallets/".concat(userId, "/").concat(walletType, "/deposit/address"), method: "GET", secure: true }, params));
            },
            /**
             * No description
             *
             * @tags Wallets
             * @name Withdraw
             * @request POST:/wallets/{user_id}/{wallet_type}/withdraw
             * @secure
             */
            withdraw: function (userId, walletType, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/wallets/".concat(userId, "/").concat(walletType, "/withdraw"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
        };
        this.users = {
            /**
             * No description
             *
             * @tags Users
             * @name Signup
             * @request POST:/users/signup
             */
            signup: function (data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/users/signup", method: "POST", body: data, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Users
             * @name Login
             * @request POST:/users/login
             */
            login: function (data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/users/login", method: "POST", body: data, type: ContentType.Json }, params));
            },
        };
        this.payments = {
            /**
             * No description
             *
             * @tags Payments
             * @name AccountPayments
             * @request GET:/payments/{user_id}
             * @secure
             */
            accountPayments: function (userId, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId), method: "GET", secure: true }, params));
            },
            /**
             * No description
             *
             * @tags Payments
             * @name List
             * @request GET:/payments/{user_id}/service-accounts
             * @secure
             */
            list: function (userId, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId, "/service-accounts"), method: "GET", secure: true }, params));
            },
            /**
             * No description
             *
             * @tags Payments
             * @name Pay
             * @request POST:/payments/{user_id}/{service_account_id}/pay
             * @secure
             */
            pay: function (userId, serviceAccountId, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId, "/").concat(serviceAccountId, "/pay"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Payments
             * @name OneTimePayment
             * @request POST:/payments/{user_id}/one-time-payment/pay
             * @secure
             */
            oneTimePayment: function (userId, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId, "/one-time-payment/pay"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Payments
             * @name CashWithdrawalOxxo
             * @request POST:/payments/{user_id}/cash-withdrawal/oxxo
             * @secure
             */
            cashWithdrawalOxxo: function (userId, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId, "/cash-withdrawal/oxxo"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Payments
             * @name Estimate
             * @request POST:/payments/{user_id}/estimate
             * @secure
             */
            estimate: function (userId, data, params) {
                if (params === void 0) { params = {}; }
                return _this.http.request(__assign({ path: "/payments/".concat(userId, "/estimate"), method: "POST", body: data, secure: true, type: ContentType.Json }, params));
            },
        };
        this.http = http;
    }
    return Api;
}());
exports.Api = Api;
