import { useQuery, UseQueryOptions } from 'react-query'
import { INewProduct } from '../../@model/product/productCart'
import { api } from '../../_services/apiClient'
import { IProductAmount } from '../useCart'

export async function updateForgottenCarts(
    productAmount: Omit<IProductAmount, 'isAuthenticated'>
): Promise<void> {
    await api.put(`forgotten/carts/update`, productAmount)
}

export async function removeItemForgottenCarts(
    productId: string
): Promise<void> {
    await api.delete(`forgotten/carts/remove/item/${productId}`)
}

export async function destroyForgottenCarts(): Promise<void> {
    await api.get(`forgotten/carts/destroy`)
}

//initial
export async function getForgottenCartsUpdate(
    productAmounts: Omit<IProductAmount, 'isAuthenticated'>[]
): Promise<INewProduct[]> {
    const { data } = await api.put(`forgotten/carts`, {
        products: productAmounts
    })

    return data
}

export async function createForgottenCarts(
    productAmount: Omit<IProductAmount, 'isAuthenticated'>
): Promise<INewProduct> {
    const { data } = await api.post(`forgotten/carts/create`, productAmount)

    return data
}

export function useForgottenCartsUpdate(
    productAmounts: Omit<IProductAmount, 'isAuthenticated'>[],
    options: UseQueryOptions
) {
    return useQuery<any>(
        'products-cart',
        () => getForgottenCartsUpdate(productAmounts),
        {
            staleTime: 100 * 60 * 10, // 10 min
            ...options
        }
    )
}
