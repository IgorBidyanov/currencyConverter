<template>
  <div class="select" ref="selectRef" @click="toggleDropdown">
    <div class="select__current">
      <span>
        {{ props.mainCurrency?.label }}
      </span>
      <span v-if="!props.isMobile"> ({{ props.mainCurrency?.value }}) </span>

      <span
        class="select__toggle"
        :class="{ 'select__toggle--active': isDropdownVisible }"
        type="button"
      ></span>
    </div>

    <transition>
      <ul class="select__dropdown" v-if="isDropdownVisible">
        <li
          class="select__dropdown-item"
          :class="{ 'select__dropdown-item--active': currency.id === props.mainCurrency?.id }"
          v-for="currency in currencies"
          :key="currency.id"
          @click="selectItem(currency)"
        >
          <p>
            {{ currency.label }} <span v-if="!props.isMobile">({{ currency.value }})</span>
          </p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { computed, ref, type PropType } from 'vue'
import type { ICurrency } from '@/types/currenciesTypes'
import { onClickOutside } from '@vueuse/core'

const currencyiesStore = useCurrenciesStore()

const currencies = computed(() => currencyiesStore.currencies)

const selectRef = ref<null | HTMLElement>(null)

const emits = defineEmits(['selectItem'])
const props = defineProps({
  mainCurrency: {
    type: Object as PropType<ICurrency>,
    // eslint-disable-next-line no-empty-function
    default: () => {},
    required: true
  },
  isMobile: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false
  }
})

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const selectItem = (currency: ICurrency) => {
  emits('selectItem', currency)
}

onClickOutside(selectRef, () => (isDropdownVisible.value = false))
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  min-width: 120px;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  background-color: $light-gray;
  cursor: pointer;

  &__current {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    line-height: 100%;
  }

  &__toggle {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('@/assets/icons/arrow_toggle.svg') center no-repeat;
    border: none;
    line-height: 0;
    outline: none;
    transition: transform 0.3s;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: -2px;
    right: -2px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 2px solid #000;
    border-radius: 4px;
    padding: 8px;
    background-color: $light-gray;
    z-index: 10;

    &-item {
      padding: 4px;
      cursor: pointer;

      &--active {
        background-color: $green-light;
        pointer-events: none;
      }

      &:hover {
        background-color: $green-light;
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .header .select {
    min-width: auto;
  }
}
</style>
