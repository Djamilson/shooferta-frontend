import { Stack, Text } from '@chakra-ui/react'
import {
    RiAwardLine,
    RiBarcodeLine,
    RiBookMarkLine,
    RiContactsLine,
    RiDashboardLine,
    RiGitMergeLine,
    RiHotelLine,
    RiInputMethodLine,
    RiShoppingBagLine,
    RiTableLine
} from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

export function SideBarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <Text
                fontWeight="400"
                color="gray.400"
                fontFamily="inter"
                fontSize="28px">
                Eletrônicos
            </Text>

            <NavSection title="CATEGORIA">
                <NavLink href="/home" color="cinza.900">
                    Dashboard
                </NavLink>

                <NavLink href="/offers">Ofertas</NavLink>

                <NavLink href="/users">Usuários</NavLink>
            </NavSection>
        </Stack>
    )
}
