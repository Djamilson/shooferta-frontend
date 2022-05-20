import {
    Box,
    Flex,
    SimpleGrid,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import IBanner from '../../../../@model/banner/banner'
import ICategory from '../../../../@model/category/category'
import { IMenuPolitics } from '../../../../@model/politic/menuPolitics'
import IProduct from '../../../../@model/product/product'
import { IProducts } from '../../../../@model/product/products'
import { useAuth } from '../../../../contexts/auth'
import { useBanners } from '../../../../hooks/Entity/useBanners'
import {
    TypeCategory,
    useCategories
} from '../../../../hooks/Entity/useCategories'
import { usePolitics } from '../../../../hooks/Entity/usePolitics'
import { useProductsList } from '../../../../hooks/Entity/useProducts'
import { useDebounce } from '../../../../hooks/useDebounce'
import { itemAnimationTop } from '../../../../styles/animation'
import { Footer } from '../../../Footer'
import { GoodCategory } from '../../../GoodCategory'
import { HeaderSearch as Header } from '../../../Header/HeaderSearch'
import { HeaderMessage } from '../../../HeaderMessage'
import { ChakraLoading } from '../../../Loading/ChakraLoading'
import { MessageCategory } from '../../../MessageCategory'
import { MessageComponent } from '../../../MessageComponent'
import { MessageToastPersonality } from '../../../MessageToastPersonality'
import { Pagination } from '../../../Pagination'
import { Product } from '../../../Product'
import { MenuCategory } from '../../../SideBar/MenuCategory'
import { SlideSwiper } from '../../../SlideSwiper'
import { SlideCategory } from './SlideCategory'

type IProps = {
    meInitBanners: IBanner[]
    meInitCategories: ICategory[]
    meInitMenuPolitics: IMenuPolitics
    meInitialProducts: IProducts
}

function HomeComponent({
    meInitCategories,
    meInitBanners,
    meInitMenuPolitics,
    meInitialProducts
}: IProps) {
    const { isAuthenticated } = useAuth()
    const [page, setPage] = useState(1)
    const [limit] = useState(5)

    const [status, setStatus] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce({ value: searchTerm, setPage })
    const [typeBanner] = useState('topo')

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        error: errorCategories
    } = useCategories(TypeCategory.MENU, {
        initialData: { data: meInitCategories }
    })

    const {
        data: menusPolitics,
        isLoading: isLoadingMenuPolitics,
        isFetching: isFetchingMenuPolitics,
        error: errorMenuPolitics
    } = usePolitics({
        initialData: meInitMenuPolitics
    })

    const {
        data: banners,
        isLoading: isLoadingBanners,
        isFetching: isFetchingBanners,
        error: errorBanners
    } = useBanners(typeBanner, {
        initialData: meInitBanners
    })

    const {
        data: products,
        isLoading: isLoadingProducts,
        isFetching: isFetchingProducts,
        error: errorProducts
    } = useProductsList(
        page,
        limit,
        status,
        {
            initialData: meInitialProducts
        },
        debouncedSearchTerm
    )

    const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setSearchTerm(value)
    }

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 1s`

    return (
        <Flex
            display="flex"
            justifyContent="space-between"
            overflowX="hidden"
            flexDir="column"
            bg="cinza.400"
            p="0"
            m="0">
            <HeaderMessage />
            <Header handleSearch={handleChangeSearch} />
            {isLoadingCategories && <ChakraLoading />}
            {!!categories?.data && (
                <MenuCategory
                    categories={categories?.data}
                    animation={animationItemAnimationTop}
                    position="fixed"
                />
            )}
            <MessageToastPersonality />
            <Flex w="100%" maxWidth="1440px" h="896px" mb="80px">
                {isLoadingBanners && <ChakraLoading />}
                {!!banners && <SlideSwiper photos={banners} />}
            </Flex>
            <GoodCategory />

            <Box flex="1" py="30">
                {isLoadingCategories && <ChakraLoading />}
                {!!categories.data && (
                    <SlideCategory
                        categories={categories.data}
                        isAuthenticated={isAuthenticated}
                    />
                )}
            </Box>
            <MessageCategory />
            <Box flex="1" py="30" bg="black.900">
                {isLoadingCategories && <ChakraLoading />}
                {!!categories?.data && (
                    <SlideCategory
                        categories={categories?.data}
                        isAuthenticated={isAuthenticated}
                    />
                )}
            </Box>
            <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={10}>
                {isLoadingProducts && <ChakraLoading />}
                <SimpleGrid
                    gap="5"
                    mt="80px"
                    flex="1"
                    minChildWidth="262px"
                    mb={10}>
                    {products?.products.length < 1 && (
                        <MessageComponent
                            title="Ooops! não conseguimos encontra produto!"
                            message="Tente entrar com outros dados!"
                        />
                    )}

                    {products?.products?.map((item: IProduct) => {
                        return (
                            <Product
                                key={item.id}
                                product={item}
                                boxShadow="inset 0px 0px 2px 2px #EBEBF0"
                            />
                        )
                    })}
                </SimpleGrid>
            </Box>
            {products?.products.length > 0 && (
                <Box
                    flex="1"
                    display="flex"
                    color="cinza.875"
                    justifyContent="flex-end"
                    alignItems="center"
                    m={10}>
                    <Pagination
                        totalCountOfRegisters={products?.info.total}
                        currentPage={page}
                        onPageChange={setPage}
                        registersPerPage={limit}
                    />
                </Box>
            )}
            {isLoadingMenuPolitics && <ChakraLoading />}

            {!!categories?.data && !!menusPolitics && (
                <Footer
                    categories={categories.data}
                    menusPolitics={menusPolitics}
                />
            )}
        </Flex>
    )
}

export { HomeComponent }
