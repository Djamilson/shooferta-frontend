import { Stack } from '@chakra-ui/react'
import {
    RiBankCardLine,
    RiContactsLine,
    RiCoupon3Line,
    RiDashboardLine,
    RiMapPinLine,
    RiShoppingBag3Line,
    RiUser6Line
} from 'react-icons/ri'

import { NavLink } from '../../SideBar/SidebarSubCategory/NavLink'
import { NavSection } from '../../SideBar/SidebarSubCategory/NavSection'

export function SideBarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine} href="#">
                    olá, aqui é a sua conta :)
                </NavLink>

                <NavLink
                    href="/home"
                    fontWeight="medium"
                    icon={RiUser6Line}>
                    minha conta
                </NavLink>
                <NavLink href="/logged/requests" icon={RiShoppingBag3Line}>
                    meus pedidos
                </NavLink>
                <NavLink href="/logged/coupons" icon={RiCoupon3Line}>
                    meus vales
                </NavLink>

                <NavLink icon={RiContactsLine} href="/logged/profile">
                    cadastro
                </NavLink>
                <NavLink icon={RiMapPinLine} href="/logged/addresses">
                    endereço
                </NavLink>

            </NavSection>
        </Stack>
    )
}
