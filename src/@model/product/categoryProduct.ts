import IProduct from "../product/product";

export default interface ICategoryProduct {
    id: string
    category_id: string
    product_id: string
    product: IProduct
}
