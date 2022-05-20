import { ChevronRightIcon } from '@chakra-ui/icons'
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    SimpleGrid,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import ICategory from '../../../../@model/category/category'
import { IMenuPolitics } from '../../../../@model/politic/menuPolitics'
import IProduct from '../../../../@model/product/product'
import { IProducts } from '../../../../@model/product/products'
import {
    TypeCategory,
    useCategories
} from '../../../../hooks/Entity/useCategories'
import { usePolitics } from '../../../../hooks/Entity/usePolitics'
import { useProductByCategoryId } from '../../../../hooks/Entity/useProducts'
import { useDebounce } from '../../../../hooks/useDebounce'
import {
    itemAnimationLeft,
    itemAnimationRight,
    itemAnimationTop
} from '../../../../styles/animation'
import { Footer } from '../../../Footer'
import { GoodCategory } from '../../../GoodCategory'
import { HeaderSearch as Header } from '../../../Header/HeaderSearch'
import { HeaderMessage } from '../../../HeaderMessage'
import { ChakraLoading } from '../../../Loading/ChakraLoading'
import { MessageComponent } from '../../../MessageComponent'
import { MessageToastPersonality } from '../../../MessageToastPersonality'
import { Pagination } from '../../../Pagination'
import { Product } from '../../../Product'
import { MenuCategory } from '../../../SideBar/MenuCategory'
import { SidebarSubCategory } from '../../../SideBar/SidebarSubCategory'

type IProps = {
    meInitCategories: ICategory[]
    meInitMenuPolitics: IMenuPolitics
    meInitialProducts: IProducts
}

function CollectionComponent({
    meInitCategories,
    meInitMenuPolitics,
    meInitialProducts
}: IProps) {
    const router = useRouter()
    const { id } = router.query
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce({ value: searchTerm, setPage })

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

    const [status, setStatus] = useState<boolean>(true)
    const {
        data: products,
        isLoading: isLoadingProducts,
        isFetching: isFetchingProducts,
        error: errorProducts
    } = useProductByCategoryId(
        String(id),
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

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 300ms`

    useEffect(() => {
        console.log('eitasfsdfas :', products)
        console.log('products?.products.length', products?.products?.length)
        console.log('search:::', debouncedSearchTerm)
    }, [products])

    const animationItemAnimationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    return (
        <Flex
            display="flex"
            justifyContent="space-between"
            overflowX="hidden"
            flexDir="column"
            bg="white.900"
            maxWidth={1440}
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

            <Breadcrumb
                spacing="8px"
                shadow="md"
                separator={<ChevronRightIcon color="gray.500" />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">página inicial</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="#">eletrônicos</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Contact</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <MessageToastPersonality />
            <GoodCategory />

            {isLoadingProducts && <ChakraLoading />}

            <Flex w="100%" maxWidth={1440} mx="auto" px={['4', '4', '6']}>
                <SidebarSubCategory animationLeft={animationLeft} />

                <Box
                    flex="1"
                    borderRadius="0"
                    bg="white.900"
                    animation={animationItemAnimationRight}
                    mt={-20}>
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
                </Box>
            </Flex>

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

export { CollectionComponent }
