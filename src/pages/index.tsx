import React, { useEffect, useState } from 'react'
import IBanner from '../@model/banner/banner'
import ICategory from '../@model/category/category'
import { IMenuPolitics } from '../@model/politic/menuPolitics'
import { IProducts } from '../@model/product/products'
import { HomeComponent } from '../components/Shared/DualPages/HomeComponent'
import { getBanners } from '../hooks/Entity/useBanners'
import { getCategories, TypeCategory } from '../hooks/Entity/useCategories'
import { getMenuPolitics } from '../hooks/Entity/usePolitics'
import { getProducts } from '../hooks/Entity/useProducts'
import { withSSRGuest } from '../utils/withSSRGuest'
import { api } from '../_services/apiClient'

type IProps = {
    banners: IBanner[]
    categories: ICategory[]
    menuPolitics: IMenuPolitics
    meInitialProducts: IProducts
}

export default function Index({
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
                meInitMenuPolitics={menuPolitics}
                meInitBanners={banners}
                meInitialProducts={meInitialProducts}
            />
        )
    )
}

export async function serveSideMenus() {
    const categories = await getCategories(TypeCategory.MENU)
    const menuPolitics = await getMenuPolitics()

    return {
        categories,
        menuPolitics
    }
}

export async function serveSideProductsAndBanners() {
    const status = true
    const page = 1
    const limit = 4
    const typeBanner = 'topo'
    const search = ''

    const banners = await getBanners(typeBanner)

    const products = await getProducts(page, limit, status, search)

    return {
        banners,
        products
    }
}

export const getServerSideProps = withSSRGuest(async ctx => {
    const menus = await serveSideMenus()
    const productsAndBanners = await serveSideProductsAndBanners()
    try {
        console.log('Entruo')

        const url = `/pages/accesses/counter`
      await api.post(url, { metadata: ctx.req.headers })
      console.log('passou da busca')
    } catch (e) {
        console.log(e)
    }
    return {
        props: { ...menus, ...productsAndBanners }
    }
})
