import { Badge, Box, SimpleGrid } from '@chakra-ui/react'

import { CopyRight } from './CopyRight'
import { FooterComponent } from './FooterComponet'
import ICategory from '../../@model/category/category'
import { useMemo } from 'react'

import { useMenu } from '../../hooks/useMenu'
import IMenuPolitic from '../../@model/politic/menuPolitic'
import { useMenuPolitic } from '../../hooks/usePoliticMenu'

type IProps = {
    categories: ICategory[]
    menusPolitics: IMenuPolitic[]
}

export function Footer({ categories, menusPolitics }: IProps) {
    const menus = categories?.length > 0 && useMenu(categories)
    const politics = menusPolitics?.length > 0 && useMenuPolitic(menusPolitics)

    const whoWeAre = useMemo(() => {
        if (menusPolitics.length > 0)
            return menusPolitics.find(menu => menu.name === 'Quem somos')
    }, [menusPolitics])

    return (
        <>
            <Box flex="1" bg="cinza.350" color="cinza.850" py="10">
                <SimpleGrid flex="1" gap="4" minChildWidth="232px" px={['100']}>
                    <FooterComponent menus={menus} title="MENU DE RODAPÉ" />
                    <FooterComponent menus={politics} title="ACOMPANHE" />

                    <Box maxW="sm" overflow="hidden" borderRadius="none">
                        <Box pt="6" pb="3" px="6">
                            <Box
                                color="cinza.875"
                                letterSpacing="wide"
                                lineHeight="22.4px"
                                fontSize="18px"
                                mb="30px"
                                fontWeight="600"
                                fontFamily="inter">
                                NOSSA LOJA - {whoWeAre?.name}
                            </Box>

                            <Box display="flex" alignItems="baseline">
                                <Box
                                    fontWeight="semibold"
                                    fontSize="18px"
                                    as="h4">
                                    R$ 2.049,99
                                </Box>
                                <Badge
                                    ml="4"
                                    borderRadius="full"
                                    colorScheme="red">
                                    Promoção
                                </Badge>
                            </Box>

                            <Box as="span" fontSize="sm">
                                12x de 170,83 s/juros
                            </Box>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>

            <CopyRight />
        </>
    )
}
