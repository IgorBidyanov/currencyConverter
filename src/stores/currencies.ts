import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { ICurrency, ICurrencyExchangeRates } from '@/types/currenciesTypes'

import Cookies from 'js-cookie'

export const useCurrenciesStore = defineStore('currency', () => {
  const currencies = ref<ICurrency[]>([
    { id: 1, value: 'RUB', label: '₽', current: true },
    { id: 2, value: 'USD', label: '$', current: false },
    { id: 3, value: 'EUR', label: '€', current: false }
  ])

  const exchangeRates = ref<ICurrencyExchangeRates>({})

  const keysToKeep = ['usd-rub', 'usd-eur', 'eur-rub', 'eur-usd', 'rub-usd', 'rub-eur']

  const currentCurrency = computed(() => currencies.value.find((c) => c.current))
  function setCurrentCurrency(currency: ICurrency): void {
    currencies.value = currencies.value.map((c) => {
      c.current = c.id === currency.id
      return c
    })
    Cookies.set('currentCurrency', JSON.stringify(currency))
  }

  async function fetchExchangeRates(): Promise<void> {
    try {
      const response: Response = await fetch('https://status.neuralgeneration.com/api/currency')
      if (!response.ok) {
        throw new Error('Сеть не отвечает')
      }
      const data: ICurrencyExchangeRates = await response.json()
      const filteredRates: ICurrencyExchangeRates = Object.keys(data)
        .filter((key) => keysToKeep.includes(key))
        .reduce((obj: ICurrencyExchangeRates, key) => {
          obj[key] = data[key]
          return obj
        }, {})
      exchangeRates.value = filteredRates
    } catch (err) {
      console.error('Error fetching exchange rates:', err)
    }
  }

  return { currencies, currentCurrency, exchangeRates, setCurrentCurrency, fetchExchangeRates }
})
