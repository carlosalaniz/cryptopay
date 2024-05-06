<script lang="ts" setup>
import i10n from '@/utils/i10n';
import { ServicePaymentForm, FormInputDefinition, type AvailableToken, displayTokenAmount, 
    displayCurrencyAmount } from '@common/types';
import { nextTick, onBeforeMount, reactive, ref, type Ref } from 'vue';
import humanizeDuration from 'humanize-duration';


const emit = defineEmits<{
    (e: 'onPaymentExpiredCancel'): void
}>()

// Loaded from server

const completeBefore: Ref<Date> = ref(new Date(Date.now() + 5 * 1000))

const availableTokens: Ref<AvailableToken[]> = ref(
    [
        { id: 'btc', name: 'Bitcoin', tokenSymbol: 'BTC', exchangeRate: { mxn: 0.000000930455665 }, decimals: 8, balance: .002154004864475000 },
        { id: 'eth', name: 'Ethereum', tokenSymbol: 'ETH', exchangeRate: { mxn: 0.00001865 }, decimals: 18, balance: 0 },
        { id: 'dai', name: 'Dai', tokenSymbol: 'DAI', exchangeRate: { mxn: .05892617397719758 }, decimals: 18, balance: 0 },
    ]
);

const availableFiatCurrencies = ref([
    'mxn',
    'usd',
    'eur',
    'jpy',
]);

const services: Ref<ServicePaymentForm[]> = ref([
    new ServicePaymentForm({
        serviceId: 'this_is_a_unique_id',
        serviceTitle: 'CFE',
        feePercent: 19,
        fee: 15,
        fiatPaymentLimits: {
            mxn: {
                min: 100
                // max: 2000
            }
        },
        input: [
            new FormInputDefinition({
                title: 'Numero de contrato',
                fieldIdentifier: 'contract_number',
                type: 'text',
                regex: '^[0-9]{12}$',
                validationMessage: 'El número de contrato debe tener 12 dígitos',
                required: true
            })
        ]
    }),
    new ServicePaymentForm({
        serviceTitle: 'Envío de efectivo',
        serviceId: 'this_is_another_unique_id',
        feePercent: 5,
        fee: 15,
        fiatPaymentLimits: {
            mxn: {
                min: 100,
                max: 2000
            }
        },
        input: [
            new FormInputDefinition({
                title: 'Numero de teléfono',
                fieldIdentifier: 'phone_number',
                type: 'tel',
                regex: '^[0-9]{10}$',
                validationMessage: 'El número de teléfono debe tener 10 dígitos',
                required: true
            }),
            new FormInputDefinition({
                title: 'Nombre del destinatario',
                fieldIdentifier: 'recipient_name',
                type: 'text',
                required: false,
                regex: '^[a-zA-Z ]{3,50}$',
                validationMessage: 'El nombre del destinatario debe tener entre 3 y 50 caracteres'
            }),
        ]
    })
]);


// Services
const selectedServiceId = ref('');
const inputValues = reactive({} as Record<string, string>)

// Fiat
const selectedFiatCurrencySymbol = ref('');
const fiatAmount = ref(0);

// Token
const selectedTokenId = ref('');

// Page state
const ready = ref(false);
const timeLeft = ref('');
const currentTimestamp = ref(Date.now());
const timerUpdatePromise: Ref<Promise<void> | null> = ref(null);
const timerPromiseResolved = ref(false);


const selectedService = () => services.value.find(a => a.serviceId === selectedServiceId.value) || undefined;
const selectedToken = () => availableTokens.value.find(a => a.id === selectedTokenId.value) || undefined;
const selectedFiatCurrency = () => availableFiatCurrencies.value.find(a => a === selectedFiatCurrencySymbol.value) || '';

const feePercentage = () => selectedService()?.feePercent || 0;
const flatFee = () => selectedService()?.fee || 0;

const conversionRate = () => {
    const token = selectedToken();
    const fiatCurrency = selectedFiatCurrency();
    if (!token || !fiatCurrency) {
        return 0;
    }
    return token.exchangeRate[fiatCurrency] || 0;
}

const fiatLimits = () => {
    const service = selectedService();
    const currency = selectedFiatCurrencySymbol.value.toLowerCase();
    return service?.fiatPaymentLimits?.[currency] || undefined;
}

const totalFiatAmount = () => {
    const percentFee = fiatAmount.value * (feePercentage() / 100);
    const total = fiatAmount.value + percentFee + flatFee();
    return total;
}

const tokenAmount = () => {
    const totalFiat = totalFiatAmount();
    const rate = conversionRate();
    return totalFiat * rate;
};

const isAriaInvalid = (formInput: FormInputDefinition, value?: string) => {
    if (value == null || value.length === 0) {
        return undefined;
    }
    return formInput.isValid(value) ? 'false' : 'true';
}

const isFiatAmountIsValid = () => {
    const limits = fiatLimits()
    if (!limits) {
        return true;
    }
    return fiatAmount.value == null || (limits.min == null || fiatAmount.value >= limits.min) && (limits.max == null || fiatAmount.value <= limits.max);
}

function startPayment() {
    // Logic to start the payment
};

async function updateTimeLeft() {
    timerPromiseResolved.value = false;
    while (completeBefore.value.getTime() > Date.now()) {
        const timeLeftNumber = completeBefore.value.getTime() - Date.now();
        timeLeft.value = humanizeDuration(timeLeftNumber, { language: i10n.language, round: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    timeLeft.value = '00:00';
    await nextTick(); // Wait for DOM update
    ready.value = false;
    timerPromiseResolved.value = true;
    setTimeout(() => {
        if (confirm(i10n.get('pay_once.time_expired'))) {
            loadPage();
        } else {
            emit('onPaymentExpiredCancel');
        }
    }, 0);
}

async function loadPage() {
    ready.value = false;
    currentTimestamp.value = Date.now();
    completeBefore.value = new Date(Date.now() + 5 * 60 * 1000);
    if (!timerUpdatePromise.value || timerPromiseResolved.value == true) {
        // Start a new timer when the previous one is done or not started
        timerUpdatePromise.value = updateTimeLeft();
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    selectedServiceId.value = services.value[1].serviceId;
    selectedFiatCurrencySymbol.value = availableFiatCurrencies.value[0];
    ready.value = true;
}


onBeforeMount(async () => {
    await loadPage();
});


</script>

<style scoped lang="scss">
fieldset {
    /* background-color: red; */
    padding: .5em;
    background-color: var(--pico-background-color);
}

.conversion-rate {
    font-size: .75em;
}

.token-total {
    &.amount {
        text-underline-offset: 5px;
        text-decoration: underline;
        text-align: center;
    }

}

.form-validation-error {

    color: red;
    margin: 0;
    padding: 0%;
}
</style>


<template>
    <a @click="loadPage()">reload</a>
    <article class="full-element-loader-parent">
        <div v-if="!ready" class="full-element-loader" aria-busy="true">
            {{ i10n.get("loading") }}
        </div>
        <div class="grid">
            <div>
                {{ i10n.get('pay_once.title') }}
            </div>
            <div dir="rtl">
                {{ i10n.get("pay_once.time_left") }}<ins>{{ timeLeft }}</ins>
            </div>
        </div>
        <hr>
        <form>
            <div class="grid">
                <div>
                    <fieldset>
                        <label for="account_type">{{ i10n.get('pay_once.label.account_type') }}:</label>

                        <select id="fiat_currency"
                                v-model="selectedServiceId">
                            <option v-for="accountType in services"
                                    :key="accountType.serviceId"
                                    :value="accountType.serviceId">
                                {{ accountType.serviceTitle }}
                            </option>
                        </select>

                        <div v-for="formInput in services.find(a => a.serviceId === selectedServiceId)?.input"
                             :key="formInput.fieldIdentifier">
                            <label for="account_number">{{ formInput.title }}:</label>

                            <input
                                   v-model="inputValues[formInput.fieldIdentifier]"
                                   :name="formInput.fieldIdentifier"
                                   :aria-describedby="`${formInput.fieldIdentifier}-helper`"
                                   :id="formInput.fieldIdentifier"
                                   :pattern="formInput.regex" :type="formInput.type"
                                   :placeholder="formInput.title"
                                   :aria-invalid="isAriaInvalid(formInput, inputValues[formInput.fieldIdentifier])" />
                            <small
                                   v-if="isAriaInvalid(formInput, inputValues[formInput.fieldIdentifier]) === 'true'"
                                   :id="`${formInput.fieldIdentifier}-helper`">
                                {{ formInput.validationMessage }}
                            </small>
                        </div>

                    </fieldset>
                    <fieldset>
                        <label for="fiat_amount">{{ i10n.get('pay_once.label.fiat_amount') }}:</label>
                        <input
                               :aria-invalid="!isFiatAmountIsValid() ? 'true' : 'false'"
                               aria-describedby="fiat_amount-helper"
                               name="fiat_amount"
                               type="number"
                               id="fiat_amount"
                               v-model="fiatAmount" />
                        <small v-if="!isFiatAmountIsValid()" id="fiat_amount-helper">
                            {{ i10n.get('errors.fiat_amount_out_of_range', fiatLimits()) }}
                        </small>
                        <label for="fiat_currency">{{ i10n.get('pay_once.label.fiat_currency') }}:</label>
                        <select id="fiat_currency"
                                v-model="selectedFiatCurrencySymbol">
                            <option v-for="currency in availableFiatCurrencies"
                                    :key="currency"
                                    :value="currency">
                                {{ i10n.get(`pay_once.currency.${currency}`) }}
                            </option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label for="token">{{ i10n.get('pay_once.label.token_to_pay_with') }}:</label>
                        <select id="token"
                                v-model="selectedTokenId">
                            <option disabled
                                    selected
                                    value="">{{ i10n.get("pay_once.option.select_token") }}</option>
                            <option v-for="token in availableTokens"
                                    :key="token.id"
                                    :value="token.id">
                                {{ token.name }} ({{ token.tokenSymbol }}) - {{ token.balance.toFixed(token.decimals) }}
                            </option>
                        </select>
                    </fieldset>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col"
                                    colspan="2">{{ i10n.get('pay_once.table.totals') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{{ i10n.get('pay_once.table.fiat_amount') }}</th>
                                <td>{{ displayCurrencyAmount(fiatAmount, i10n.l10n, selectedFiatCurrencySymbol) }}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{ i10n.get('pay_once.table.fee_percentage') }}</th>
                                <td>{{ feePercentage() }} % </td>
                            </tr>
                            <tr>
                                <th scope="row">{{ i10n.get('pay_once.table.flat_fee') }}</th>
                                <td>{{ displayCurrencyAmount(flatFee(), i10n.l10n, selectedFiatCurrencySymbol) }}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{ i10n.get('pay_once.table.total_fiat_amount') }}</th>
                                <td>{{ displayCurrencyAmount(totalFiatAmount(), i10n.l10n, selectedFiatCurrencySymbol) }}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{ i10n.get('pay_once.table.conversion_rate') }}</th>
                                <td class="conversion-rate">
                                    <div v-if="selectedFiatCurrencySymbol.length > 0 && selectedTokenId.length > 0">
                                        {{ selectedFiatCurrencySymbol.length > 0 ? `${displayCurrencyAmount(1, i10n.l10n, selectedFiatCurrencySymbol)} =` : '' }}
                                        {{ displayTokenAmount(conversionRate(), i10n.l10n, selectedToken()) }}
                                    </div>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                    <table v-if="selectedFiatCurrencySymbol.length > 0 && selectedTokenId.length > 0">
                        <thead>
                            <tr>
                                <th class="token-total"
                                    scope="col"
                                    colspan="2">{{ i10n.get('pay_once.table.token_amount') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="token-total amount"
                                    colspan="2">{{ tokenAmount().toFixed(selectedToken()?.decimals) }} {{ selectedToken()?.tokenSymbol }}</td>
                            </tr>
                        </tbody>
                    </table>


                    <fieldset>
                        <label>
                            <input type="checkbox"
                                   name="english"
                                   checked />
                            {{ i10n.get('pay_once.checkbox.save_account') }}
                        </label>
                    </fieldset>
                </div>
            </div>
            <button type="submit" @click="startPayment">{{ i10n.get('pay_once.button.start_payment') }}</button>

        </form>
    </article>
    {{ { selectedServiceId, inputValues } }}
    <pre>{{ JSON.stringify(selectedService(), null, 2) }}</pre>
</template>
