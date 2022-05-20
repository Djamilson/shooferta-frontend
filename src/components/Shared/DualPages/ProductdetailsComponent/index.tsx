import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure,
  usePrefersReducedMotion
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { FiPackage } from 'react-icons/fi'
import { MdContactSupport } from 'react-icons/md'
import ICategory from '../../../../@model/category/category'
import { IPhoto } from '../../../../@model/photo/photo'
import { IMenuPolitics } from '../../../../@model/politic/menuPolitics'
import IProduct from '../../../../@model/product/product'
import { DialogConfirmationProduct } from '../../../../components/DialogConfirmationProduct'
import { Horizontal } from '../../../../components/Divider/Horizontal'
import { Footer } from '../../../../components/Footer'
import { Header } from '../../../../components/Header'
import { HeaderMessage } from '../../../../components/HeaderMessage'
import { MessageToastPersonality } from '../../../../components/MessageToastPersonality'
import { SlidePhotosProduct } from '../../../../components/Product/SlidePhotosProduct'
import { MenuCategory } from '../../../../components/SideBar/MenuCategory'
import { useAuth } from '../../../../contexts/auth'
import {
  TypeCategory,
  useCategories
} from '../../../../hooks/Entity/useCategories'
import { usePolitics } from '../../../../hooks/Entity/usePolitics'
import { useDetailsProductByProductId } from '../../../../hooks/Entity/useProducts'
import {
  itemAnimationLeft,
  itemAnimationRight,
  itemAnimationTop
} from '../../../../styles/animation'
import { ChakraLoading } from '../../../Loading/ChakraLoading'
import { PhotoComponent } from '../../../Product/Photo'
import { Freight } from '../BasketComponent/Freight'

type IProps = {
    meInitCategories: ICategory[]
    meInitProduct: IProduct
    meInitMenuPolitics: IMenuPolitics
}

function ProductDetailsComponent({
    meInitCategories,
    meInitProduct,
    meInitMenuPolitics
}: IProps) {
    const router = useRouter()
    const { id } = router.query
    const { isAuthenticated } = useAuth()

    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleConfirmation() {
        onOpen()
    }

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
        data: product,
        isLoading: isLoadingProduct,
        isFetching: isFetchingProduct,
        error: errorProduct
    } = useDetailsProductByProductId(String(id), {
        initialData: meInitProduct
    })

    const [selectedSlide, setSelectedSlide] = useState<IPhoto>({} as IPhoto)

    function handleSelectedSlide(index: number) {
        if (product?.photos.length > 0) {
            setSelectedSlide(product.photos[index])
        }
    }

    useEffect(() => {
        if (product?.photos.length > 0) {
            setSelectedSlide(product?.photos[0])
        }
    }, [product])

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

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
            <Header />

            {isLoadingCategories && <ChakraLoading />}
            {!!categories?.data && (
                <MenuCategory
                    categories={categories?.data}
                    animation={animationItemAnimationTop}
                    position="relative"
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

            <Flex
                w="100%"
                my="6"
                maxWidth={1440}
                mx="auto"
                px="6"
                display={{ md: 'flex' }}>
                <Box flex="1" borderRadius="none" animation={animationLeft}>
                    <Flex mr={{ base: 0, md: 4 }} display={{ md: 'flex' }}>
                        <Box
                            p={['6', '8']}
                            bg="white.900"
                            w={{ base: '100%', md: '400px' }}
                            borderRadius="none"
                            color="cinza.800"
                            pb="4">
                            <Box
                                p={['6', '8']}
                                w="400px"
                                borderRadius="none"
                                pb="4">
                                <Text fontSize="lg" mb="4">
                                    button Compartilhamento
                                </Text>
                            </Box>

                            {product?.subcategory && (
                                <Box flex="1" borderRadius="none" mb={8}>
                                    <PhotoComponent
                                        w="100%"
                                        h="300px"
                                        photoUrl={selectedSlide.photo_url}
                                        name={product.subcategory.name}
                                        icon={FiPackage}
                                        iconColor="red.500"
                                        iconDimension="200"
                                    />
                                </Box>
                            )}

                            <SlidePhotosProduct
                                handleSelectedSlide={handleSelectedSlide}
                                photos={product?.photos}
                            />
                        </Box>
                        <Box
                            zIndex={1}
                            p={['6', '8']}
                            color="cinza.800"
                            bg="white.900"
                            flex="1"
                            borderRadius="none"
                            pb="4"
                            my={{ base: 4, md: 0 }}>
                            <Text
                                fontSize="lg"
                                mb="4"
                                color="cinza.900"
                                fontWeight="700"
                                fontFamily="Helvetica"
                                lineHeight="22px"
                                noOfLines={[1, 3]}>
                                {product && product.subcategory.name}
                            </Text>

                            <Box display="flex" my="2" alignItems="center">
                                {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={
                                                i < 4
                                                    ? 'reviews.900'
                                                    : 'reviews.800'
                                            }
                                        />
                                    ))}
                                <Box
                                    as="span"
                                    ml="2"
                                    color="gray.600"
                                    fontSize="sm">
                                    {product?.total_reviews &&
                                        `${product?.total_reviews} reviews`}
                                </Box>
                                <Icon as={MdContactSupport} fontSize="26px" />
                                <Box
                                    color="gray.500"
                                    fontWeight="400"
                                    letterSpacing="wide"
                                    fontSize="14px"
                                    ml="2">
                                    5 perguntas
                                </Box>
                            </Box>

                            <Text fontSize="lg" my="4" noOfLines={[1, 3]}>
                                {product && product.description.description}
                            </Text>

                            <Text fontSize="lg" mb="4">
                                mais informações
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    zIndex={1}
                    bg="white.900"
                    borderRadius="none"
                    w={{ base: '100%', md: '360px' }}
                    animation={animationRight}>
                    <Box pt="6" pb="3" px="6">
                        <Box display="flex" alignItems="baseline">
                            <Box
                                color="cinza.900"
                                fontWeight="600"
                                letterSpacing="normal"
                                fontSize="30"
                                fontFamily="helvetica">
                                {product?.price.price_promotion === '0.00'
                                    ? product?.price.price_format
                                    : product?.price.price_promotion_format}
                                <Box
                                    as="span"
                                    ml="2"
                                    fontWeight="600"
                                    fontSize="16"
                                    color="principal.900"
                                    fontFamily="helvetica">
                                    veem
                                    <Box
                                        as="span"
                                        color="cinza.900"
                                        fontWeight="600"
                                        ml="2"
                                        letterSpacing="normal"
                                        fontSize="16"
                                        fontFamily="helvetica">
                                        Comigo
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="baseline">
                            <Box
                                color="gray.500"
                                fontWeight="400"
                                letterSpacing="wide"
                                fontSize="xs"
                                textDecoration="line-through"
                                mt="4">
                                {product?.price.price_promotion === '0.00'
                                    ? product?.price.price_promotion_format
                                    : product?.price.price_format}
                            </Box>
                            {product?.price.price_promotion !== '0.00' && (
                                <Badge
                                    ml="4"
                                    borderRadius="full"
                                    colorScheme="red">
                                    Promoção
                                </Badge>
                            )}
                        </Box>

                        <Box
                            mt={1}
                            color="gray.600"
                            fontWeight="400"
                            fontSize="14"
                            fontFamily="helvetica">
                            {`em até ${product?.price.number_times_sale.numberVez} sem juros no`}

                            <Box
                                as="span"
                                color="gray.600"
                                mx="2"
                                fontWeight="700"
                                fontSize="14"
                                fontFamily="helvetica">
                                cartão de crédito
                            </Box>
                        </Box>

                        <Box display="flex" mt="6" alignItems="center">
                            <Box as="span" color="gray.600" fontSize="sm">
                                mais formas de pagamento
                            </Box>
                        </Box>
                        <Horizontal />
                        <Freight status_freight={true} />
                        <Horizontal />
                        <DialogConfirmationProduct
                            isAuthenticated={isAuthenticated}
                            isOpen={isOpen}
                            product={product}
                            onClose={onClose}
                        />
                        <Box>
                            <Button
                                mt="20px"
                                leftIcon={<BsFillBasket2Fill fontSize="22px" />}
                                justifyContent="center"
                                alignItems="center"
                                bg="principal.900"
                                w="100%"
                                h="48px"
                                _hover={{
                                    opacity: 0.7,
                                    textDecoration: 'none'
                                }}
                                _focus={{ boxShadow: 'outline' }}
                                onClick={handleConfirmation}
                                borderRadius="none">
                                <Box
                                    as="span"
                                    fontSize="20px"
                                    fontFamily="Inter"
                                    lineHeight="18px"
                                    fontWeight="500"
                                    color="white.900">
                                    comprar
                                </Box>
                            </Button>
                        </Box>
                    </Box>
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

export { ProductDetailsComponent }
