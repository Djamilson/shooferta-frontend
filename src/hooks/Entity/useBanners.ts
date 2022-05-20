import { useQuery, UseQueryOptions } from 'react-query'
import IBanner from '../../@model/banner/banner'
import { api } from '../../_services/apiClient'

export async function getBanners(type: string): Promise<IBanner[]> {
    try {
        const status = true

        const url = `banners/actives`

        const { data } = await api.get(url, {
            params: { status, type }
        })

        return data
    } catch (error) {
        console.log('bannner::', error)
    }
}

export function useBanners(type: string, options: UseQueryOptions) {
    return useQuery<any>(['banners'], () => getBanners(type), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}

export async function getBanner(id: string): Promise<IBanner> {
    const url = `banners/${id}`

    const res = await api.get(url)

    // aqui faço a formatação dos dados
    return res.data
}

export function useBanner(id: string) {
    if (!id) {
        return
    }
    return useQuery<IBanner>(['banner', id], () => getBanner(id), {
        staleTime: 100 * 60 * 10 // 10 min
    })
}
