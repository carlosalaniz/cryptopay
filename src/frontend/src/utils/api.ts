import { Api, HttpClient } from '@common/api';
const tokenLocalStorageKey = 'user_token';

const client = new HttpClient<string>({
    secure: true,
    baseURL: "http://localhost:3000",
    securityWorker: accessToken =>
        accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {},
});

if (localStorage.getItem(tokenLocalStorageKey)) {
    client.setSecurityData(localStorage.getItem(tokenLocalStorageKey))
}


export const api = new Api<string>(client)
