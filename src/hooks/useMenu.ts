import { v4 as uuid } from 'uuid'

import ICategory from '../@model/category/category'
import IMenu from '../@model/category/menu'

import { useAuth } from '../contexts/auth'

export function useMenu(categories: ICategory[]): IMenu[] {
    const { isAuthenticated } = useAuth()

    return [
        {
            id: String(uuid()),
            name: 'Home',
            slug: 'home',
            toUpperCase: 'HOME',
            href: isAuthenticated ? '/home' : '/'
        },
        ...categories?.map(category => {
            const { id, name, slug } = category

            return {
                id,
                name,
                slug,
                toUpperCase: category.name.toUpperCase(),
                href: isAuthenticated
                    ? `/collections/${category.id}`
                    : `/collection/${category.id}`
            }
        }),
        {
            id: String(uuid()),
            name: 'Contato',
            slug: 'contact',
            toUpperCase: 'CONTATO',
            href: isAuthenticated ? '/contacts' : '/contact'
        }
    ]
}
