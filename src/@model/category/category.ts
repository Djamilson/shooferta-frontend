import IProduct from '../product/product'

export default interface ICategory {
    id: string
    name: string
    description: string
    slug: string
    photo?: string
    photo_url?: string
    products?: IProduct[]
}
