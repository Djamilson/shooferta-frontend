import {
  isValidCNPJ,
  isValidCPF,
  isValidPhone
} from '@brazilian-utils/brazilian-utils'
import {
  differenceInCalendarDays,
  differenceInCalendarYears,
  format,
  getMonth,
  getYear,
  isValid,
  parse
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import * as yup from 'yup'
import * as masks from '../components/Form/InputMask/masks'
import { isValidCEP } from './is-valid-cep'

export const schemaValidationCep = yup
    .string()
    .transform(masks.cepByMask.transform)
    .notRequired()
    .test('validateCep', 'cep inválido', value => {
        if (!value) {
            return false
        }

        if (value.length === 8) {
            return isValidCEP(value)
        }

        return false
    })

export const schema = yup.object().shape({
    email: yup.string().email().required(),
    date: yup
        .string()
        .transform(masks.dateMask.transform)
        .notRequired()
        .test('validateDate', 'Invalid date', (value: any) => {
            return isValid(parse(value, 'yyyy-MM-dd', new Date()))
        }),
    cpfOrCnpj: yup
        .string()
        .transform(masks.cpfByMask.transform)
        .notRequired()
        .test('validateCepOrCnpj', 'Invalid CNPJ or CNPJ', value => {
            if (!value) {
                return false
            }

            if (value.length === 11) {
                return isValidCPF(value)
            }

            if (value.length === 14) {
                return isValidCNPJ(value)
            }

            return false
        }),
    phone: yup
        .string()
        .transform(masks.phoneMask.transform)
        .notRequired()
        .test('validatePhone', 'Invalid phone', (value: any) => {
            return isValidPhone(value)
        }),
    currency: yup
        .number()
        .transform((_, originalValue) =>
            masks.currencyMask.transform(originalValue)
        )
})

export const schemaValidationDate = yup
    .string()
    .notRequired()
    .test('validateDate', 'data inválida!', (value: any) => {
        const formattedDate = format(new Date(value), 'dd-MM-yyyy', {
            locale: ptBR
        })
        const invalidDate = parse(formattedDate, 'dd-MM-yyyy', new Date())

        return (
            isValid(invalidDate) &&
            isValid(parse(value, 'yyyy-MM-dd', new Date())) &&
            differenceInCalendarYears(new Date(), new Date(value)) >= 0 &&
            differenceInCalendarYears(new Date(), new Date(value)) < 100
        )
    })



export const schemaValidationState = (value: any) =>
    yup
        .string()
        .notRequired()
        .test('validateState', 'estado obrigatório!', () => {
            if (value === '0') return false
            return true
        })

export const schemaValidationCity = (value: any) =>
    yup
        .string()
        .notRequired()
        .test('validateCity', 'cidade obrigatória!', () => {
            if (value === '0') return false
            return true
        })

export const schemaValidationCpf = yup
    .string()
    .transform(masks.cpfOrCnpjMask.transform)
    .notRequired()
    .test('validateCpfOrCnpj', 'Invalid CNPJ or CNPJ', value => {
        if (!value) {
            return false
        }

        if (value.length === 11) {
            return isValidCPF(value)
        }

        if (value.length === 14) {
            return isValidCNPJ(value)
        }

        return false
    })

export const schemaValidationNumber = yup
    .number()
    .transform((_, originalValue) => {
        return Number(masks.numberByMask.transform(originalValue))
    })
    .notRequired()
    .test('number', 'Lote/Casa é obrigarório!', value => {
        if (!value) {
            return false
        }

        if (value > 0) {
            return true
        }

        return false
    })

export const schemaValidationRG = yup
    .string()
    .transform(masks.numberByMask.transform)
    .notRequired()
    .test('validateNumber', 'Somente número', value => {
        if (!value) {
            return false
        }

        if (value.length > 0) {
            return true
        }

        return false
    })

export const schemaValidationCnpj = yup
    .string()
    .transform(masks.cnpjByMask.transform)
    .notRequired()
    .test('validateCpf', 'CNPJ inválido', value => {
        if (!value) {
            return false
        }

        if (value.length === 14) {
            return isValidCNPJ(value)
        }

        return false
    })

export const schemaValidationCurrency = yup
    .number()
    .transform((_, originalValue) =>
        masks.currencyMask.transform(originalValue)
    )
    .notRequired()
    .test('validatePrice', 'valor inválido', (value: any) => {
        const regex = /^\d+(?:\.\d{0,2})$/

        if (regex.test(value)) return true

        return false
    })

export const schemaValidationPhone = yup
    .string()
    .transform(masks.phoneMask.transform)
    .notRequired()
    .test('validatePhone', 'Telefone inválido', (value: any) => {
        return isValidPhone(value) && value
    })

export const schemaValidationCardDate = yup
    .string()
    .transform(masks.cardDateMask.transform)
    .notRequired()
  .test('validateDate', 'data do cartão inválida!', (value: any) => {
      
        const date = parse(`01-${value}`, 'dd-MM-yyyy', new Date())

        const nowDate = new Date()

        const dateOutPut = format(new Date(date), 'dd/MM/yyyy')

        const dateTest = format(
            new Date(getYear(nowDate), getMonth(nowDate), 1),
            'dd/MM/yyyy'
        )

        return (
            isValid(date) &&
            differenceInCalendarDays(new Date(dateTest), new Date(dateOutPut)) <
                1 &&
            differenceInCalendarYears(
                new Date(dateOutPut),
                new Date(dateTest)
            ) < 39
        )
    })

export const schemaValidationCardInstallment = (value: any) =>
    yup
        .number()
        .notRequired()
        .test(
            'validateInstallmentCard',
            'selecione o número de parcela(s)!',
            () => {
                if (value !== 0) return true
                return false
            }
        )

export const schemaValidationCardNumber = yup
    .string()
    .transform(masks.cardNumberByMask.transform)
    .notRequired()
    .test('validateNumberCard', 'número do cartão incorreto!', (value: any) => {
        if (!value) {
            return false
        }

        if (value.length === 16) return true

        return false
    })
