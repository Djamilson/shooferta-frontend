import { useQuery, UseQueryOptions } from 'react-query'
import IProduct from '../../@model/product/product'
import { IProducts } from '../../@model/product/products'
import { formatPrice } from '../../utils/formatPrice'
import { api } from '../../_services/apiClient'
import { useNumberTimesSale } from '../useNumberTimesSale'

export async function getProducts(
    page: number,
    limit: number,
    status: boolean,
    search: string
): Promise<IProducts> {
    const url = `products/pagination/list`

    const { data } = await api.get(url, {
        params: { page, limit, status, q: search || '' }
    })

    const p: IProduct[] = data.products.map((product: IProduct) => {
        return {
            ...product,
            price: {
                ...product.price,
                price_format: formatPrice(Number(product.price.price)),
                price_promotion_format: formatPrice(
                    Number(product.price.price_promotion)
                ),

                number_times_sale: useNumberTimesSale({
                    price_promotion: Number(product.price.price_promotion),
                    price: Number(product.price.price)
                })
            }
        }
    })

    const meData = {
        products: p,
        info: data.info
    }

    //console.log('Final:::', meData)
    return meData
}

export function useProducts(
    page: number,
    limit: number,
    status: boolean,
    options: UseQueryOptions,
    search: string
) {
    return useQuery<any>(
        ['products', `${page}-${search}`],
        () => getProducts(page, limit, status, search),
        {
            staleTime: 100 * 60 * 10, // 10 min
            ...options
        }
    )
}

export async function getProduct(id: string): Promise<IProduct> {
    const url = `products/${id}`

    const { data } = await api.get(url)

    // aqui faço a formatação dos dados
    return data
}

export function useProduct(id: string) {
    if (!id) {
        return
    }
    return useQuery<IProduct>(['product', id], () => getProduct(id), {
        staleTime: 100 * 60 * 10 // 10 min
    })
}

export async function getProductsByCategoryId(
    id: string,
    page: number,
    limit: number,
    status: boolean
): Promise<IProducts> {
    console.log('Entrou aqi =>>>>>>>>>>>>>>>>>>', id, page, limit)
    const url = `categories/collections`

    const { data } = await api.get(url, {
        params: { categoryId: id, page, limit, status, q: '' }
    })

    const p: IProduct[] = data.products.map((product: any) => {
        return {
            ...product.product,
            price: {
                ...product.product.price,
                price_format: formatPrice(Number(product.product.price.price)),
                price_promotion_format: formatPrice(
                    Number(product.product.price.price_promotion)
                ),

                number_times_sale: useNumberTimesSale({
                    price_promotion: Number(
                        product.product.price.price_promotion
                    ),
                    price: Number(product.product.price.price)
                })
            }
        }
    })

    const me = {
        products: p,
        info: data.info
    }

    return me
}

export function useProductByCategoryId(
    id: string,
    page: number,
    limit: number,
    status: boolean,
    options: UseQueryOptions,
    search: string
) {
    console.log(search === '')

    console.log('oba::: acima', id, page, limit, search)

    return useQuery<any>(
        ['categoryproducts', `${page}-${id}-${search || ''}`],
        () =>
            search === ''
                ? getProductsByCategoryId(id, page, limit, status)
                : getProducts(page, limit, status, search),
        {
            staleTime: 100 * 60 * 10, // 10 min
            ...options
        }
    )
}

export function useProductsList(
    page: number,
    limit: number,
    status: boolean,
    options: UseQueryOptions,
    search: string
) {
    return useQuery<any>(
        ['products-list', `${page}-${search}`],
        () => getProducts(page, limit, status, search),
        {
            staleTime: 100 * 60 * 10, // 10 min
            ...options
        }
    )
}

export async function getDetailsProductByProductId(
    id: string
): Promise<IProduct> {
    const url = `products/details`

    const { data } = await api.get(url, {
        params: { productId: id }
    })

    const meProduct: IProduct = {
        ...data,
        price: {
            ...data.price,
            price_format: formatPrice(Number(data.price.price)),
            price_promotion_format: formatPrice(
                Number(data.price.price_promotion)
            ),
            number_times_sale: useNumberTimesSale({
                price_promotion: Number(data.price.price_promotion),
                price: Number(data.price.price)
            })
        }
    }

    // aqui faço a formatação dos dados
    return meProduct
}

export function useDetailsProductByProductId(
    id: string,
    options: UseQueryOptions
) {
    return useQuery<any>(
        [`productDetail-${id}`, id],
        () => getDetailsProductByProductId(id),
        {
            staleTime: 100 * 60 * 10, // 10 min
            ...options
        }
    )
}
