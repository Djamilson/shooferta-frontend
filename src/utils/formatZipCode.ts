export function formatZipCodeInPoint(str: string): string {
    const re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/
    if (re.test(str)) {
        return str.replace(re, '$1.$2-$3')
    }

    return ''
}

function maskCPF(str: string): string {
    let value = str.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2')

    return value
}

export function maskPhone_(str: string): string {
    let value = str.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1.$2)')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2')

    return value
}

function maskPhone(str: string): string {
    //e.currentTarget.maxLength = 15
    console.log('contando string:', str.length)
    let value = str.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')

    return value
}

//const phone = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}-[0-9]{4}$/

export { maskPhone, maskCPF }
