import BigNumber from "bignumber.js"
import { bscNetwork, harmonyNetwork, moonriverNetwork, polygonNetwork } from "./lib/constants"

export const networkSymbol = (network) => {
    if (network === bscNetwork) {
        return 'BNB'
    } else if (network === polygonNetwork) {
        return 'MATIC'
    } else if (network === harmonyNetwork) {
        return 'ONE'
    } else if (network === moonriverNetwork) {
        return 'MOVR'
    } else {
        return 'ETH'
    }
}

export const networkIcon = (network) => {
    if (network === bscNetwork) {
        return '/img/tokens/bnb.png'
    } else if (network === polygonNetwork) {
        return '/img/tokens/polygon.png'
    } else if (network === harmonyNetwork) {
        return '/img/tokens/one.png'
    } else if (network === moonriverNetwork) {
        return '/img/moon.png'
    } else {
        return '/img/tokens/eth.png'
    }
}

export const isEqual = (value1, value2) => {
    const _value1 = new BigNumber(value1 ? value1 : 0)
    const _value2 = new BigNumber(value2 ? value2 : 0)

    // console.log(
    //   'equal flag  ',
    //   new BigNumber(_value1.toFixed(4)).eq(_value2.toFixed(4)),
    // )
    return new BigNumber(_value1.toFixed(3).toString()).eq(
        _value2.toFixed(3).toString(),
    )
}