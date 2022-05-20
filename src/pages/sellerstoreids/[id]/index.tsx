import React from 'react'
import { serveSideMenus } from '../..'
import SellerStoreIdComponent from '../../../components/Shared/DualPages/SellerstoreIdComponent'
import { getDetailsProductByProductId } from '../../../hooks/Entity/useProducts'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { IPropsProduct } from '../../productdetail/[id]'

export default function SellerStoreIds({
    categories,
    menuPolitics,
    meInitialProduct
}: IPropsProduct) {
    return (
        <SellerStoreIdComponent
            meInitCategories={categories}
            meInitProduct={meInitialProduct}
            meInitMenuPolitics={menuPolitics}
        />
    )
}
export const getServerSideProps = withSSRAuth(
    async ctx => {
        const { params } = ctx
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
