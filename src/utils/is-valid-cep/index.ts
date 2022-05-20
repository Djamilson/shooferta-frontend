import { isLastChar } from '../is-last-char'
import { onlyNumbers } from '../only-numbers'

export const LENGTH = 8

export const HYPHEN_INDEXES = [4]

function isValidLength(cep: string) {
    return cep.length === LENGTH
}

export function formatZipCode(cep: string): string {
    const digits = onlyNumbers(cep)

    return digits
        .slice(0, LENGTH)
        .split('')
        .reduce((acc, digit, i) => {
            const result = `${acc}${digit}`

            if (!isLastChar(i, digits)) {
                if (HYPHEN_INDEXES.indexOf(i) >= 0) return `${result}-`
            }

            return result
        }, '')
}

export function isValidCEP(cep: string) {
    if (!cep || typeof cep !== 'string') return false

    const digits = onlyNumbers(cep)

    return isValidLength(digits)
}
