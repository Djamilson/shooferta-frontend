import { format, isValid, parse, parseISO } from 'date-fns'
import { createPipe, MaskedRange, PIPE_TYPE } from 'imask'

const masker = ({
    masked,
    transform,
    maskDefault
}: {
    masked: any
    transform?: any
    maskDefault?: any
  }) => {


    const mask = createPipe(masked, PIPE_TYPE.UNMASKED, PIPE_TYPE.MASKED)

    const unmask = createPipe(masked, PIPE_TYPE.MASKED, PIPE_TYPE.UNMASKED)

    const onChange = (e: any) => {
        const unmasked = unmask(e.currentTarget.value)
        const newValue = mask(unmasked)
        e.target.value = newValue
    }

    return {
        mask,
        onChange,
        transform: transform || unmask,
        unmask,
        maskDefault: maskDefault || mask
    }
}

const dateFormatClient = 'dd/MM/yyyy'
const dateFormatApi = 'yyyy-MM-dd'


export const dateMask = masker({
    masked: {
        mask: Date,
        pattern: dateFormatClient,
        blocks: {
            dd: {
                mask: MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2
            },
            MM: {
                mask: MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2
            },
            yyyy: {
                mask: MaskedRange,
                from: 1900,
                to: 9999
            }
        },
        format: date => {
            return format(date, dateFormatClient)
        },
        parse: dateStr => {
            return parseISO(dateStr)
        }
    },
    transform: value => {
        if (!value) {
            return value
        }
        //const date = parse(value, dateFormatClient, new Date())
        return format(parseISO(value), dateFormatApi)
    },
    maskDefault: value => {
        return       format(parseISO(value), dateFormatClient)

    }
})

export const cpfByMask = masker({
    masked: {
        mask: [
            {
                mask: '000.000.000-00',
                type: 'CPF'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cpfMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CPF'
            )

            return cpfMask
        }
    }
})

export const cnpjByMask = masker({
    masked: {
        mask: [
            {
                mask: '00.000.000/0000-00',
                type: 'CNPJ'
            }
        ],
        dispatch: (appended: any, dynamicMasked: any) => {
            const cnpjMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CNPJ'
            )

            if (
                `${dynamicMasked.value}${appended}`.length >
                cpfByMask.mask.length
            ) {
                return cnpjMask
            }
        }
    }
})

export const cpfOrCnpjMask = masker({
    masked: {
        mask: [
            {
                mask: '000.000.000-00',
                type: 'CPF'
            },
            {
                mask: '00.000.000/0000-00',
                type: 'CNPJ'
            }
        ],
        dispatch: (appended, dynamicMasked) => {
            const cpfMask = dynamicMasked.compiledMasks.find(
                ({ type }) => type === 'CPF'
            )

            const cnpjMask = dynamicMasked.compiledMasks.find(
                ({ type }) => type === 'CNPJ'
            )

            if (
                `${dynamicMasked.value}${appended}`.length > cpfMask.mask.length
            ) {
                return cnpjMask
            }

            return cpfMask
        }
    }
})

export const cepByMask = masker({
    masked: {
        mask: [
            {
                mask: '00.000-000',
                type: 'CEP'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cepMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CEP'
            )

            return cepMask
        }
    }
})

export const dateByMask = masker({
    masked: {
        mask: [
            {
                mask: '00/00/0000',
                type: 'DATE'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const dateMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'DATE'
            )

            return dateMask
        }
    }
})

export const phoneMask = masker({
    masked: {
        mask: [
            {
                mask: '+55 (00) 0000-0000',
                phone: 'landline'
            },

            {
                mask: '+55 (00) 0 0000-0000',
                phone: 'mobile'
            }
        ],

        dispatch: (appended: any, dynamicMasked: any) => {
            const landlineMask = dynamicMasked.compiledMasks.find(
                (phone: any) => phone.phone === 'landline'
            )

            const mobileMask = dynamicMasked.compiledMasks.find(
                (phone: any) => phone.phone === 'mobile'
            )

            if (
                `${dynamicMasked.value}${appended}`.length >
                landlineMask.mask.length
            ) {
                return mobileMask
            }

            return landlineMask
        }
    }
})

export const numberByMask = masker({
    masked: {
        mask: 'num{.}',
        blocks: {
            num: {
                mask: Number,
                signed: true,
                thousandsSeparator: '.',
                mapToRadix: [''],
                scale: 0
            }
        }
    },
    transform: (value: any) =>
        Number(numberByMask.unmask(value).replace(/([^0-9])/g, '')),

    maskDefault: (value: number) =>
        numberByMask.mask(
            new Intl.NumberFormat('pt-BR').format(
                parseFloat(
                    value.toFixed().replace('.', '').replace(/\D/g, '')
                ) / 100
            )
        )
})

export const lettlerByMask = masker({
    masked: {
        mask: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/
    }
})

export const currencyMask = masker({
    masked: {
        mask: 'R$ num{,}cents',
        blocks: {
            num: {
                mask: Number,
                signed: true,
                thousandsSeparator: '.',
                mapToRadix: [''],
                scale: 0
            },
            cents: {
                mask: '00',
                normalizeZeros: true,
                padFractionalZeros: true
            }
        }
    },
    transform: (value: any) =>
        Number(currencyMask.unmask(value).replace(',', '.')),
    maskDefault: (value: number) =>
        currencyMask.mask(
            new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
                parseFloat(
                    value
                        .toFixed(2)
                        .replace('.', '')
                        .replace(',', '')
                        .replace(/\D/g, '')
                ) / 100
            )
        )
})

export const cardNumberByMask = masker({
    masked: {
        mask: [
            {
                mask: '0000 0000 0000 0000',
                type: 'CARDNUMBER'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cardMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CARDNUMBER'
            )

            return cardMask
        }
    },
    transform: (value: any) => {
        if (!value) {
            return value
        }

        return value.replace(/([^0-9])/g, '')
    }
})

export const cardMonthByMask = masker({
    masked: {
        mask: [
            {
                mask: '00/00',
                type: 'MONTH'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cepMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'MONTH'
            )

            return cepMask
        }
    }
})

export const cardYearByMask = masker({
    masked: {
        mask: [
            {
                mask: '00',
                type: 'YEAR'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cardMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'YEAR'
            )

            return cardMask
        }
    }
})

export const cardCVV4ByMask = masker({
    masked: {
        mask: [
            {
                mask: '0000',
                type: 'CARDCVV'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cardMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CARDCVV'
            )

            return cardMask
        }
    }
})

export const cardCVV3ByMask = masker({
    masked: {
        mask: [
            {
                mask: '000',
                type: 'CARDCVV'
            }
        ],
        dispatch: (_: any, dynamicMasked: any) => {
            const cardMask = dynamicMasked.compiledMasks.find(
                (item: any) => item.type === 'CARDCVV'
            )

            return cardMask
        }
    }
})

const cardDateFormatClient = 'MM/yyyy'
const cardDateFormatApi = 'MM-yyyy'

export const cardDateMask = masker({
    masked: {
        mask: Date,
        pattern: cardDateFormatClient,
        blocks: {
            MM: {
                mask: MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2
            },
            yyyy: {
                mask: MaskedRange,
                from: 2022,
                to: 9999
            }
        },
        format: (date: any) => {
            return format(new Date(date), cardDateFormatClient)
        },
        parse: (dateStr: any) => {
            if (!isValid(parse(dateStr, cardDateFormatClient, new Date())))
                return false

            return parse(dateStr, cardDateFormatClient, new Date())
        }
    },
    transform: (value: any) => {
        if (!value) {
            return value
        }
        const date = parse(value, cardDateFormatClient, new Date())

        return format(date, cardDateFormatApi)
    },
    maskDefault: (value: any) => {
        return format(parseISO(value), cardDateFormatClient)
    }
})
