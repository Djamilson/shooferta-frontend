import IMenuPolitic from '../@model/politic/menuPolitic'

import { useAuth } from '../contexts/auth'

export function useMenuPolitic(politics: IMenuPolitic[]): IMenuPolitic[] {
    const { isAuthenticated } = useAuth()

    return [
        ...politics?.map(politic => {
            const { id } = politic

            return {
                ...politic,
                href: isAuthenticated ? `/politics/${id}` : `/politic/${id}`
            }
        })
    ]
}
