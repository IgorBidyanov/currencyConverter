<template>
  <Header />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { onMounted } from 'vue'
import Cookies from 'js-cookie'

const currencyiesStore = useCurrenciesStore()

onMounted(() => {
  currencyiesStore.fetchExchangeRates()

  const currentCurrency = Cookies.get('currentCurrency')
  if (currentCurrency) {
    currencyiesStore.setCurrentCurrency(JSON.parse(currentCurrency))
  }
})
</script>

<style scoped></style>
