<template>
  <form class="convertForm">
    <div class="convertForm__group">
      <Select :mainCurrency="mainCurrency" @selectItem="setMainCurrency" />

      <Input v-model="mainSum" @input="convertMainSum" />
    </div>

    <div class="convertForm__group">
      <Select :mainCurrency="secondaryCurrency" @selectItem="setSecondaryCurrency" />

      <Input v-model="secondarySum" @input="convertSecondarySum" />
    </div>
  </form>
</template>

<script setup lang="ts">
import Select from '@/components/UI/Select.vue'
import Input from '@/components/UI/Input.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { onMounted, ref, computed, watch } from 'vue'
import type { ICurrency } from '@/types/currenciesTypes'

const currencyiesStore = useCurrenciesStore()
const currencies = computed(() => currencyiesStore.currencies)
const exchangeRates = computed(() => currencyiesStore.exchangeRates)

const mainCurrency = ref<ICurrency>(currencies.value[0])
const secondaryCurrency = ref<ICurrency>(currencies.value[0])
const mainSum = ref<number | null>(null)
const secondarySum = ref<number | null>(null)

watch(mainCurrency, (newValue: ICurrency, oldValue: ICurrency) => {
  if (newValue?.id === secondaryCurrency.value?.id) {
    setSecondaryCurrency(oldValue)
  }
})

watch(secondaryCurrency, (newValue: ICurrency, oldValue: ICurrency) => {
  if (newValue?.id === mainCurrency.value?.id) {
    setMainCurrency(oldValue)
  }
})

const setMainCurrency = (currency: ICurrency) => {
  mainCurrency.value = currency
}

const setSecondaryCurrency = (currency: ICurrency) => {
  secondaryCurrency.value = currency
}

const convertMainSum = (value: number) => {
  if (value) {
    secondarySum.value = parseFloat(
      (
        exchangeRates.value[
          `${mainCurrency.value?.value.toLowerCase()}-${secondaryCurrency.value?.value.toLowerCase()}`
        ] * value
      ).toFixed(2)
    )
  } else {
    secondarySum.value = null
  }
}

const convertSecondarySum = (value: number) => {
  if (value) {
    mainSum.value = parseFloat(
      (
        exchangeRates.value[
          `${secondaryCurrency.value?.value.toLowerCase()}-${mainCurrency.value?.value.toLowerCase()}`
        ] * value
      ).toFixed(2)
    )
  } else {
    mainSum.value = null
  }
}

onMounted(() => {
  if (currencyiesStore.currentCurrency) {
    mainCurrency.value = currencyiesStore.currentCurrency
    secondaryCurrency.value =
      currencies.value.find((c) => !c.current) ||
      currencies.value[currencyiesStore.currentCurrency.id - 1] ||
      currencies.value[currencyiesStore.currentCurrency.id + 1]
  }
})
</script>

<style lang="scss" scoped>
.convertForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;

  @media (max-width: 767px) {
    padding: 8px;
  }

  &__group {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
  }
}
</style>
