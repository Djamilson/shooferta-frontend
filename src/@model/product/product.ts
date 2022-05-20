import { IPhoto } from '../photo/photo'
import ISubCategory from '../subcategory/subcategory'

export type IDescription = {
    id: string
    description: string
}
export type ICategory = {
    id: string
    name: string
    description: string
    type: string
    slug: string
    photo?: string
}

export type IProductInfo = {
    id: string
    company: string
    currency: string
    freight: number
    link: number
    price: number
    price_promotion: number
    stock: number
}

type IPrice = {
    price: string
    price_promotion: string
    price_format: string
    price_promotion_format: string
    number_times_sale?: { numberVez: string; price: string }
    user_id: string
    id: string
}

export type IOther = {
    color?: string
    voltage?: string
    dimension?: string
}
export default interface IProduct {
    id: string
    sku: string
    other: IOther
    status_freight: boolean
    status_product: boolean
    bar_code?: string
    categories: ICategory[]
    price: IPrice
    status: boolean
    subcategory: ISubCategory
    description: IDescription
    product_info: IProductInfo
    photos: IPhoto[]

    total_reviews?: string
    thumbnail_url?: string
}
