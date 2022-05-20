import React from 'react'
import { serveSideMenus } from '..'
import ICategory from '../../@model/category/category'
import { IMenuPolitics } from '../../@model/politic/menuPolitics'
import { BasketComponent } from '../../components/Shared/DualPages/BasketComponent'
import { withSSRGuest } from '../../utils/withSSRGuest'

type IProps = {
    categories: ICategory[]
    menuPolitics: IMenuPolitics
}

export default function Basket({ categories, menuPolitics }: IProps) {
    return (
        <BasketComponent
            meInitCategories={categories}
            meInitMenuPolitics={menuPolitics}
        />
    )
}

export const getServerSideProps = withSSRGuest(async ctx => {
    const menus = await serveSideMenus()

    return {
        props: {
            ...menus
        }
    }
})
