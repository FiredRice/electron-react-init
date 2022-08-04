import numeral from "numeral"

export const divisionzero = (val: number) => `${numeral(val).format('0,0.00')}`

export const division = (val: number) => `${numeral(val).format('0, 0')}`

export const divisionPercent = (val: number) => `${divisionzero(val * 100)}%`

