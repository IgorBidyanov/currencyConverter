<template>
  <nav>
    <ul class="header__nav">
      <li class="header__nav-item">
        <router-link class="header__nav-link" to="/">Главная</router-link>
      </li>
      <li class="header__nav-item">
        <router-link class="header__nav-link" to="/convert">Конвертер</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
  color: $green-light;

  @media (max-width: 767px) {
    gap: 16px;
  }

  &-item {
    position: relative;
    padding-left: 16px;

    .router-link-active {
      color: $green;
      pointer-events: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: $green-light;
      transform: translateY(-50%);
      transition: background-color 0.3s ease-in-out;
    }

    &:hover {
      color: $green;

      &::before {
        background-color: $green;
      }

      &::after {
        width: 100%;
      }

      & .header__nav-link::after {
        width: 100%;
      }
    }

    &:has(.router-link-active) {
      &::before {
        background-color: $green;
      }
    }
  }

  &-link {
    position: relative;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: $green;
      transform: translateX(-50%);
      transition: width 0.3s ease-in-out;
    }
  }
}
</style>
