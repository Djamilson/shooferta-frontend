import { useQuery, UseQueryOptions } from 'react-query'
import { IMenuPolitics } from '../../@model/politic/menuPolitics'
import IPolitic from '../../@model/politic/politic'
import { api } from '../../_services/apiClient'

export async function getMenuPolitics(): Promise<IMenuPolitics> {
    const url = `politics/menus`

    const { data } = await api.get(url)

    return data
}

export function usePolitics(options: UseQueryOptions) {
    return useQuery<any>(['menuPolitics'], () => getMenuPolitics(), {
        staleTime: 100 * 60 * 10 * 3, // 30 min
        ...options
    })
}

export async function getPolitic(id: string): Promise<IPolitic> {
    const url = `politics/menus/${id}`
 
    const { data } = await api.get(url)

    return data
}

export function usePolitic(id: string, options: UseQueryOptions) {
    console.log('Passou : id cararars', id)

    if (!id) {
        return
    }

    return useQuery<any>(['politic', id], () => getPolitic(id), {
        staleTime: 100 * 60 * 10 * 3, // 30 min
        ...options
    })
}
