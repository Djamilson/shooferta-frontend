import { useQuery, UseQueryOptions } from 'react-query'
import { IPhone } from '../../@model/phone/phone'
import * as masks from '../../components/Form/InputMask/masks'
import { api } from '../../_services/apiClient'
export async function getPhones(): Promise<IPhone[]> {
    const { data } = await api.get(`phones/users`)

    const listFormat = data.map((phone: IPhone) => {
        return { ...phone, phoneFormat: masks.phoneMask.maskDefault(phone.phone) }
    })

    return listFormat
}

export function usePhones(options: UseQueryOptions) {
    return useQuery<any>('phones', () => getPhones(), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}

export async function getPhone(id: string): Promise<IPhone> {
    const url = `phones/${id}`

    const res = await api.get(url)

    return res.data
}

export function usePhone(id: string) {
    return useQuery<IPhone>([`phone-${id}`, id], () => getPhone(id), {
        staleTime: 100 * 60 * 10 // 10 min
    })
}
