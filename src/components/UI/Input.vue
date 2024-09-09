<template>
  <div class="input-wrapper">
    <input
      class="input"
      :class="{ 'input--error': errorText.length }"
      placeholder="Введите значение"
      :value="model"
      maxlength="15"
      @input="onInput"
    />

    <p class="input__error">{{ errorText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel()
const emits = defineEmits(['input'])

const errorText = ref<string>('')

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const regex = /^[0-9]*[.,]?[0-9]*$/
  const sum = target.value.replace(',', '.')
  if (!target.value.length) {
    errorText.value = ''
  } else if (!regex.test(sum)) {
    errorText.value = 'Неверное значение'
    return
  }
  model.value = sum
  emits('input', parseFloat(sum))
}
</script>

<style lang="scss" scoped>
.input {
  min-width: 120px;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  background-color: $light-gray;
  outline: none;

  &--error {
    border-color: $red;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__error {
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: $red;
  }
}
</style>
