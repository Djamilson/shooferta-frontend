import { Box } from '@chakra-ui/react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import IMenuPolitic from '../../@model/politic/menuPolitic'

import { NavLinkFooter } from '../SideBar/MenuCategory/NavLinkFooter'

type IProps = {
    title: string
    menus: IMenuPolitic[]
}

export function FooterComponent({ menus, title }: IProps) {
    return (
        <Box maxW="sm" overflow="hidden" borderRadius="none">
            <Box pt="6" pb="3" px="6">
                <Box
                    color="cinza.850"
                    letterSpacing="wide"
                    lineHeight="22.4px"
                    fontSize="18px"
                    mb="30px"
                    fontWeight="600"
                    fontFamily="inter">
                    {title}
                </Box>

                {menus?.length > 0 && menus.map(menu => {
                    return (
                        <NavLinkFooter
                            key={menu.id}
                            icon={MdOutlineKeyboardArrowRight}
                            href={menu.href}>
                            {menu.name}
                        </NavLinkFooter>
                    )
                })}
            </Box>
        </Box>
    )
}
