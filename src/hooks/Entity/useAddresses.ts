import { useQuery, UseQueryOptions } from 'react-query'
import { IAddress } from '../../@model/address/address'
import { formatZipCodeInPoint } from '../../utils/formatZipCode'
import { api } from '../../_services/apiClient'

export async function getAddresses(): Promise<IAddress[]> {
    const url = `addresses`

    const { data } = await api.get(url)

    console.log(JSON.stringify(data, null, 2))

    const orderList = data.map((address: IAddress) => {
        return {
            ...address,
            zipCodeFormat: formatZipCodeInPoint(address.zip_code)
        }
    })

    return orderList
}

export async function getAddressById(id: string): Promise<IAddress> {
    const url = `addresses/users/addresses/${id}`

    const { data } = await api.get(url)

    return data
}

export function useAddressById(id: string, options: UseQueryOptions) {
   
    return useQuery<any>([`address-${id}`, id], () => getAddressById(id), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}

export function useAddresses(options: UseQueryOptions) {
    return useQuery<any>(`addresses`, () => getAddresses(), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}
