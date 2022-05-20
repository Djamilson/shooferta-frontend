import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useBreakpointValue
} from '@chakra-ui/react'
import ICategory from '../../../@model/category/category'
import { useSiderbarDrawer } from '../../../hooks/SideBarDrawerContext'
import  UseStickyHeader  from '../../../hooks/useSticky'
import { SideBarNav } from './SideBarNav'

type IProps = {
    categories: ICategory[]
    animation: string
    position: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'
}

export function MenuCategory({ categories, animation, position }: IProps) {
    const { isOpen, onClose } = useSiderbarDrawer()
    const { isSticky, boxShadow } = UseStickyHeader()

    const isDrawerSider = useBreakpointValue({
        base: true,
        lg: false
    })

    if (isDrawerSider) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            <SideBarNav categories={categories} />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return !!isSticky ? (
        <Box as="aside" w="1440px" maxWidth="1440px">
            <SideBarNav categories={categories} h="80px" />
        </Box>
    ) : (
        <Box
            as="aside"
            w="1440px"
            maxWidth="1440px"
            zIndex="5"
            animation={animation}
            css={{
                position: `${position}`,
                top: '80px',
                height: '40px',
                transition: `top 0.5s ease-in-out`,
                boxShadow: `0px 8px 8px 0px rgb(0 0 0 / ${boxShadow})`
            }}>
            <SideBarNav categories={categories} h="40px" />
        </Box>
    )
}
