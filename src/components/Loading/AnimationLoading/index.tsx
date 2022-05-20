import { Box } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'
import React, { useRef } from 'react'
import loadingCar from '../../../../public/loadingCart.json'

function AnimationLoading() {
    const ref = useRef(null)

    return (
        <Box
            flex="1"
            display="flex"
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            pos="fixed"
            zIndex={99}>
            <Player
                id="firstLottie"
                ref={ref}
                autoplay
                controls
                loop
                src={loadingCar}
                style={{ height: '20%', width: '20%' }}></Player>
        </Box>
    )
}
export { AnimationLoading }
