import { Box, Flex, FlexProps } from '@chakra-ui/react'
import ICategory from '../../../@model/category/category'
import { useMenu } from '../../../hooks/useMenu'
import { NavLink } from './NavLink'

interface IProps extends FlexProps {
    categories: ICategory[]
}

export function SideBarNav({ categories, ...rest }: IProps) {
  
    const menus = categories.length > 0 && useMenu(categories)

    return (
        <Flex
            w="1440px"
            flexDir="row"
            maxWidth="1440px"
            justifyContent="right"
            display="flex"
            bg="principal.900"
            {...rest}>
            <Box
                display="flex"
                mr="160px"
                flexDir="row"
                w={720}
                justifyContent="space-between"
                alignItems="center">
                {menus.length > 0 &&
                    menus?.map(menu => {
                        return (
                            <NavLink key={menu.id} href={menu.href}>
                                {menu.toUpperCase}
                            </NavLink>
                        )
                    })}
            </Box>
        </Flex>
    )
}
