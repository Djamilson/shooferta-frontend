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
import { useSiderbarDrawer } from '../../../hooks/SideBarDrawerContext'
import { SideBarNav } from './SideBarNav'

type IProps = {
    animationLeft: string
}
export function SidebarSubCategory({ animationLeft }: IProps) {
    const { isOpen, onClose } = useSiderbarDrawer()

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
                            <SideBarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Box
            as="aside"
            mr={4}
            ml="-3"
            p={6}
            bg="white.900"
            minHeight="100vh"
            minWidth={218}
            animation={animationLeft}>
            <SideBarNav />
        </Box>
    )
}
