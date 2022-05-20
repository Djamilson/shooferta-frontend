import React from 'react'
import { serveSideMenus } from '../..'
import ICategory from '../../../@model/category/category'
import { IMenuPolitics } from '../../../@model/politic/menuPolitics'
import { IProducts } from '../../../@model/product/products'
import { CollectionComponent } from '../../../components/Shared/DualPages/CollectionComponent'
import { getProductsByCategoryId } from '../../../hooks/Entity/useProducts'
import { withSSRAuth } from '../../../utils/withSSRAuth'

type IProps = {
    meInitialProducts: IProducts
    categories: ICategory[]
    menuPolitics: IMenuPolitics
}

export default function Colletion({
    categories,
    menuPolitics,
    meInitialProducts
}: IProps) {
    return (
        <CollectionComponent
            meInitCategories={categories}
            meInitMenuPolitics={menuPolitics}
            meInitialProducts={meInitialProducts}
        />
    )
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
        const { params, query } = ctx
        const categoryId = String(params.id)
        const page = 1
        const limit = 4

        const status = true

        const menus = await serveSideMenus()

        const products = await getProductsByCategoryId(
            categoryId,
            page,
            limit,
            status
        )

        //const products = await getProducts(page, limit, status, search)

        console.log('=>>id', params.id)
        console.log('=>>query', query)
        console.log('ppodspfpoaposp o', products)
        return {
            props: {
                ...menus,
                categoryProducts: products
            }
        }
    },
    {
        roles: ['Colaborador']
    }
)
