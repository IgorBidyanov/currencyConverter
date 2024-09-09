export type TCurrencyValue = 'RUB' | 'USD' | 'EUR'

export type TCurrencyLabel = '₽' | '$' | '€'

export interface ICurrency {
  id: number
  value: TCurrencyValue
  label: TCurrencyLabel
  current: boolean
}

export interface ICurrencyExchangeRates {
  [key: string]: number
}
