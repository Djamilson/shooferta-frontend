import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ICategory from '../../../../../@model/category/category'
import { Category } from '../../../../Category'
import { useSwiperRef } from '../../../../SlideSwiper/useSwiperRef'

type IProps = {
    categories: ICategory[]
    isAuthenticated: boolean
}

function SlideCategory({ categories, isAuthenticated }: IProps) {
    const [nextEl, nextElRef] = useSwiperRef()
    const [prevEl, prevElRef] = useSwiperRef()
    const [paginationEl] = useSwiperRef()

    return (
        <Flex mt="20px" flexDir="column" mx={6}>
            <Swiper
                width={272}
                pagination={{
                    el: paginationEl,
                    clickable: true
                }}
                navigation={{
                    prevEl,
                    nextEl
                }}
                title="categorias"
                spaceBetween={20}
                slidesPerView={1}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={false}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }}
                breakpoints={{
                    630: {
                        width: 272,
                        slidesPerView: 1,
                        spaceBetween: 3
                    },
                    768: {
                        width: 272,
                        slidesPerView: 1,
                        spaceBetween: 30
                    }
                }}
                onSlideChange={el => {}}>
                {categories?.map((category: ICategory, i) => {
                    return (
                        <SwiperSlide key={category.id}>
                            <Category
                                key={category.id}
                                title={category.name}
                                description={category.description}
                                url={category.photo_url}
                                href={
                                    isAuthenticated
                                        ? `/collections/${category.id}`
                                        : `/collection/${category.id}`
                                }
                                titleLink="ver coleção completa"
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Flex
                flexDir="row"
                h="80px"
                align="center"
                w="100%"
                zIndex="2"
                mt={-308}
                mb={308}
                justifyContent="space-between"
                color="red">
                <ChevronLeftIcon
                    alignItems="right"
                    ref={prevElRef}
                    w={10}
                    h={10}
                    color="white.900"
                    bg="principal.900"
                    borderRadius="50%"
                    _hover={{ backgroundColor: 'principal.800' }}
                />

                <ChevronRightIcon
                    ref={nextElRef}
                    w={10}
                    h={10}
                    color="white.900"
                    bg="principal.900"
                    borderRadius="50%"
                    _hover={{ backgroundColor: 'principal.800' }}
                />
            </Flex>
        </Flex>
    )
}

export { SlideCategory }
