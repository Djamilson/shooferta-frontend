import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Image } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IPhoto } from '../../../@model/photo/photo'
import { useSwiperRef } from '../../SlideSwiper/useSwiperRef'

type IProps = {
    photos: IPhoto[]
    handleSelectedSlide: (index: number) => void
}

function SlidePhotosProduct({ photos, handleSelectedSlide }: IProps) {
    const [nextEl, nextElRef] = useSwiperRef()
    const [prevEl, prevElRef] = useSwiperRef()
    const [paginationEl, paginationRef] = useSwiperRef()

    return (
        <Flex mt="20px" flexDir="column">
            <Swiper
                width={20}
                pagination={{
                    el: paginationEl,
                    clickable: true
                }}
                navigation={{
                    prevEl,
                    nextEl
                }}
                spaceBetween={1}
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
                    640: {
                        width: 58,
                        slidesPerView: 1,
                        spaceBetween: 100
                    },
                    768: {
                        width: 58,
                        slidesPerView: 1,
                        spaceBetween: 30
                    }
                }}
                onSlideChange={el => handleSelectedSlide(el.activeIndex)}>
                {photos?.map((el, i) => {
                    return (
                        <Box
                            display="flex"
                            justifyContent="center"
                            w="100%"
                            border="1px solid red"
                            key={el.id}
                            position="absolute">
                            <SwiperSlide key={el.id}>
                                <Box
                                    onClick={() => handleSelectedSlide(i)}
                                    flex="1"
                                    css={{ cursor: 'pointer' }}>
                                    <Image
                                        h="70px"
                                        src={el.photo_url}
                                        alt={el.name}
                                    />
                                </Box>
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
                zIndex="2"
                mt={-8}
                justifyContent="space-between"
                color="red">
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

export { SlidePhotosProduct }
