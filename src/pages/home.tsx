import React, { useEffect, useState } from 'react'
import { serveSideMenus, serveSideProductsAndBanners } from '.'
import IBanner from '../@model/banner/banner'
import ICategory from '../@model/category/category'
import { IMenuPolitics } from '../@model/politic/menuPolitics'
import { IProducts } from '../@model/product/products'
import { HomeComponent } from '../components/Shared/DualPages/HomeComponent'
import { withSSRAuth } from '../utils/withSSRAuth'
import { api } from '../_services/apiClient'

type IProps = {
    banners: IBanner[]
    categories: ICategory[]
    menuPolitics: IMenuPolitics
    meInitialProducts: IProducts
}

export default function Home({
    categories,
    banners,
    menuPolitics,
    meInitialProducts
}: IProps) {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        mounted && (
            <HomeComponent
                meInitCategories={categories}
                meInitBanners={banners}
                meInitMenuPolitics={menuPolitics}
                meInitialProducts={meInitialProducts}
            />
        )
    )
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
        const menus = await serveSideMenus()
        const productsAndBanners = await serveSideProductsAndBanners()

        try {

            const url = `/pages/accesses/counter`
            await api.post(url, { metadata: ctx.req.headers })

        } catch (e) {
            console.log(e)
        }

        return {
            props: { ...menus, ...productsAndBanners }
        }
    },
    {
        roles: ['Colaborador']
    }
)
