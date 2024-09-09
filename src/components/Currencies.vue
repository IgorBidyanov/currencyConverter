<template>
  <ul class="currencies">
    <template v-for="currency in filteredCurrencies" :key="currency.id">
      <li class="currencies__item" v-if="!currency.current">
        <p v-if="currencyiesStore.currentCurrency">
          1 {{ currency.value }} =
          {{ getExchangeRate(currency.value, currencyiesStore.currentCurrency.value) }}
          {{ currencyiesStore.currentCurrency?.label }}
        </p>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { computed } from 'vue'

const currencyiesStore = useCurrenciesStore()

const currencies = computed(() => currencyiesStore.currencies)
const exchangeRates = computed(() => currencyiesStore.exchangeRates)
const filteredCurrencies = computed(() => currencies.value.filter((currency) => !currency.current))

const getExchangeRate = (currencyValue: string, currentCurrencyValue: string) => {
  const rate =
    exchangeRates.value[`${currencyValue.toLowerCase()}-${currentCurrencyValue.toLowerCase()}`]
  return rate ? rate.toFixed(2) : ''
}
</script>

<style lang="scss" scoped>
.currencies {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__item {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
  }
}
</style>
