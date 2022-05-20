import React from 'react'
import { serveSideMenus } from '../..'
import { ProductDetailsComponent } from '../../../components/Shared/DualPages/ProductdetailsComponent'
import { getDetailsProductByProductId } from '../../../hooks/Entity/useProducts'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { IPropsProduct } from '../../productdetail/[id]'

export default function ProductDetails({
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

export const getServerSideProps = withSSRAuth(
    async ctx => {
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
    },
    {
        roles: ['Colaborador']
    }
)
