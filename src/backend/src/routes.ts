/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalletController } from './controllers/wallets/wallet.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/users/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentsController } from './controllers/service_accounts/payments.controller';
import { expressAuthentication } from './authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "WalletType": {
        "dataType": "refEnum",
        "enums": ["ETH","BTC","MONERO","USDT","USDC"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Wallet": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"WalletType","required":true},
            "balance": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceAccountType": {
        "dataType": "refEnum",
        "enums": ["CFE","TotalPlay","VeTv","dish","Megacable","Sky","Telcel","Movistar","Unefon","ATT","VirginMobile","CashWithdrawl"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceAccount": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "accountIdentifier": {"dataType":"string","required":true},
            "nickname": {"dataType":"string","required":true},
            "accountType": {"ref":"ServiceAccountType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentState": {
        "dataType": "refEnum",
        "enums": ["Pending","Completed","Failed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Payment": {
        "dataType": "refObject",
        "properties": {
            "fiatAmount": {"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double","required":true},"fees":{"dataType":"double","required":true},"subtotal":{"dataType":"double","required":true},"fiatCurrencyCode":{"dataType":"string","required":true}},"required":true},
            "sourceWalletType": {"ref":"WalletType","required":true},
            "sourceAmount": {"dataType":"double","required":true},
            "serviceAccountType": {"ref":"ServiceAccount","required":true},
            "date": {"dataType":"datetime","required":true},
            "state": {"ref":"PaymentState","required":true},
            "stateChangeHistory": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"date":{"dataType":"datetime","required":true},"state":{"ref":"PaymentState","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/wallets/:user_id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.List)),

            async function WalletController_List(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new WalletController();

              await templateService.apiHandler({
                methodName: 'List',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/wallets/:user_id/enough-balance',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.ListWithEnoughBalance)),

            async function WalletController_ListWithEnoughBalance(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"currencyCode":{"dataType":"string","required":true},"fiat":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new WalletController();

              await templateService.apiHandler({
                methodName: 'ListWithEnoughBalance',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/wallets/:user_id/:wallet_type/balance',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.Balance)),

            async function WalletController_Balance(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    wallet_type: {"in":"path","name":"wallet_type","required":true,"ref":"WalletType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new WalletController();

              await templateService.apiHandler({
                methodName: 'Balance',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/wallets/:user_id/:wallet_type/deposit/address',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.Deposit)),

            async function WalletController_Deposit(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    wallet_type: {"in":"path","name":"wallet_type","required":true,"ref":"WalletType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new WalletController();

              await templateService.apiHandler({
                methodName: 'Deposit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/wallets/:user_id/:wallet_type/withdraw',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.Withdraw)),

            async function WalletController_Withdraw(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    wallet_type: {"in":"path","name":"wallet_type","required":true,"ref":"WalletType"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"destinationAddress":{"dataType":"string","required":true},"amount":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new WalletController();

              await templateService.apiHandler({
                methodName: 'Withdraw',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.signup)),

            async function UserController_signup(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.login)),

            async function UserController_login(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/payments/:user_id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.AccountPayments)),

            async function PaymentsController_AccountPayments(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'AccountPayments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/payments/:user_id/service-accounts',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.List)),

            async function PaymentsController_List(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'List',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payments/:user_id/:service_account_id/pay',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.Pay)),

            async function PaymentsController_Pay(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    service_account_id: {"in":"path","name":"service_account_id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"sourceWalletType":{"ref":"WalletType","required":true},"currencyCode":{"dataType":"string","required":true},"amount":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'Pay',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payments/:user_id/one-time-payment/pay',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.OneTimePayment)),

            async function PaymentsController_OneTimePayment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"saveServiceAccount":{"dataType":"boolean","required":true},"serviceAccountNickname":{"dataType":"string","required":true},"serviceAccountIdentifier":{"dataType":"string","required":true},"serviceAccountType":{"ref":"ServiceAccountType","required":true},"sourceWalletType":{"ref":"WalletType","required":true},"currencyCode":{"dataType":"string","required":true},"amount":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'OneTimePayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payments/:user_id/cash-withdrawal/oxxo',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.CashWithdrawalOxxo)),

            async function PaymentsController_CashWithdrawalOxxo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"currencyCode":{"dataType":"string","required":true},"phoneNumber":{"dataType":"string","required":true},"sourceWalletType":{"ref":"WalletType","required":true},"amount":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'CashWithdrawalOxxo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payments/:user_id/estimate',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.Estimate)),

            async function PaymentsController_Estimate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user_id: {"in":"path","name":"user_id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"serviceAccountType":{"ref":"ServiceAccountType","required":true},"sourceWalletType":{"ref":"WalletType","required":true},"currencyCode":{"dataType":"string","required":true},"amount":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentsController();

              await templateService.apiHandler({
                methodName: 'Estimate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
