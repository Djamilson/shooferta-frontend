import { useQuery, UseQueryOptions } from 'react-query'
import ICategory from '../../@model/category/category'
import { api } from '../../_services/apiClient'

export enum TypeCategory {
    MENU = 'menu',
    SLIDE = 'slide'
}

export async function getCategories(type: TypeCategory): Promise<ICategory[]> {
    const url = `categories/${type}`

    const { data } = await api.get(url)

    // aqui faço a formatação dos dados
    return data
}

export function useCategories(type: TypeCategory, options: UseQueryOptions) {
    return useQuery<any>(
        [`categories-${type}`, type],
        () => getCategories(type),
        {
            staleTime: 100 * 60 * 10 * 3, // 30 min
            ...options
        }
    )
}

export async function getCategory(id: string): Promise<ICategory> {
    const url = `categories/${id}`

    const { data } = await api.get(url)

    // aqui faço a formatação dos dados
    return data
}

export function useCategory(id: string) {
    if (!id) {
        return
    }

    return useQuery<ICategory>([`category-${id}`, id], () => getCategory(id), {
        staleTime: 100 * 60 * 10 // 10 min
    })
}
