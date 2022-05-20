import { serveSideMenus } from '../..'
import ICategory from '../../../@model/category/category'
import { IMenuPolitics } from '../../../@model/politic/menuPolitics'
import IProduct from '../../../@model/product/product'
import { ProductDetailsComponent } from '../../../components/Shared/DualPages/ProductdetailsComponent'
import { getDetailsProductByProductId } from '../../../hooks/Entity/useProducts'
import { withSSRGuest } from '../../../utils/withSSRGuest'

export type IPropsProduct = {
    meInitialProduct: IProduct
    categories: ICategory[]
    menuPolitics: IMenuPolitics
}

export default function ProductDetail({
    categories,
    menuPolitics,
    meInitialProduct
}: IPropsProduct) {
    return (
        <ProductDetailsComponent
            meInitCategories={categories}
            meInitProduct={meInitialProduct}
            meInitMenuPolitics={menuPolitics}
        />
    )
}

export const getServerSideProps = withSSRGuest(async ctx => {
    const { params, query } = ctx
    const productId = String(params.id)

    const product = await getDetailsProductByProductId(productId)

    const menus = await serveSideMenus()

    return {
        props: {
            ...menus,
            product
        }
    }
})
