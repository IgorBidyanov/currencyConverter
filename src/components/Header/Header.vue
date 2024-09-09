<template>
  <header class="header container">
    <img class="header__logo" src="@/assets/icons/logo.svg" alt="Логотип" />

    <HeaderNav />

    <Select
      @selectItem="setCurrentCurrency"
      :mainCurrency="currencyiesStore.currentCurrency"
      :isMobile="isMobile"
    />
  </header>
</template>

<script setup lang="ts">
import HeaderNav from './HeaderNav.vue'
import Select from '@/components/UI/Select.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import type { ICurrency } from '@/types/currenciesTypes'
import { onMounted, ref } from 'vue'

const currencyiesStore = useCurrenciesStore()

const isMobile = ref<boolean>(false)

const setCurrentCurrency = (currency: ICurrency) => {
  currencyiesStore.setCurrentCurrency(currency)
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 767
}

onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 26px;
  background-color: $dark-gray;

  &__logo {
    width: 60px;

    @media (max-width: 767px) {
      width: 40px;
    }
  }
}
</style>
