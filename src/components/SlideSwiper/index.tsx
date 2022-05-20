import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Image } from '@chakra-ui/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import IBanner from '../../@model/banner/banner'
import { useSwiperRef } from './useSwiperRef'

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination])

interface IProps {
    photos: IBanner[]
}

export function SlideSwiper({ photos }: IProps) {
    const [nextEl, nextElRef] = useSwiperRef()
    const [prevEl, prevElRef] = useSwiperRef()
    const [paginationEl, paginationRef] = useSwiperRef()

    return (
        <Flex
            flexDir="column"
            w="100%"
            maxWidth="1440px"
            h="896px"
            alignItems="center"
            justifyContent="center">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                pagination={{
                    el: paginationEl,
                    clickable: true
                }}
                navigation={{
                    prevEl,
                    nextEl
                }}
                spaceBetween={50}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }}
                className="mySwiper"
                onSlideChange={() => {}}
                autoplay={{ delay: 3000 }}>
                {photos?.map((el, i) => {
                    return (
                        <Box justifyContent="center" w="100%" key={el.id}>
                            <SwiperSlide key={el.id}>
                                <Image
                                    w="1919px"
                                    h="896px"
                                    src={el.banner_url}
                                    alt={el.name}
                                />
                            </SwiperSlide>
                        </Box>
                    )
                })}
            </Swiper>

            <Flex
                flexDir="row"
                h="80px"
                align="center"
                w="100%"
                mt="-60px "
                zIndex="2"
                justifyContent="space-between">
                <Box w="25%" alignItems="right" justifyContent="space-between">
                    <ChevronLeftIcon
                        ref={prevElRef}
                        w={8}
                        h={8}
                        color="principal.900"
                    />
                </Box>
                <Box w="50%" alignItems="center" justifyContent="center">
                    <span ref={paginationRef} />
                </Box>
                <Box w="25%" alignItems="left" justifyContent="center">
                    <ChevronRightIcon
                        ref={nextElRef}
                        w={8}
                        h={8}
                        color="principal.900"
                    />
                </Box>
            </Flex>
        </Flex>
    )
}
