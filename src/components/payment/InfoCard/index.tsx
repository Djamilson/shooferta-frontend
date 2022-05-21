import {
    Box,
    Center,
    Flex,
    Heading,
    Image,
    keyframes,
    Text,
    usePrefersReducedMotion,
    Wrap
} from '@chakra-ui/react'
import { itemAnimationRight } from '../../../styles/animation'
import { getCardIcon } from '../../../utils/getCardIcon'

type IProps = {
    numberCart: string
    cardExpiration: string
    flipped: boolean
    nameCart: string
    type?: string
    securityCodeCart: string
}

function InfoCard({
    flipped,
    numberCart,
    cardExpiration,
    nameCart,
    securityCodeCart,
    type
}: IProps) {
    const animationRight = usePrefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 300ms`

    const animationKeyframes = keyframes`
  0% { transform: scale(1.3) translateX(386px);  }
  25% { transform: scale(1.25) rotate(0); }
  50% {  transform: scale(1.15) rotateY(90deg);}
  75% { transform: scale(1.1) rotate(0) ;}
  100% { transform: scale(1) rotate(0) ;  }
`

    const animationFront = `${animationKeyframes} 1.6s ease-in-out`
    const animationBack = `${animationKeyframes} 1.6s ease-in-out`
    return (
        <Box
            w={{ base: '100%', md: '360px' }}
            display={{ md: 'flex' }}
            ml={{ md: 6 }}
            mt={{ base: 6 }}
        >
            <Center display="flex" flexDir="column">
                <Flex
                    shadow="md"
                    w="22em"
                    h="14em"
                    borderRadius="lg"
                    bgImage="url('/card/background-black.png')"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    flexDir="column"
                    justifyContent="center"
                    p={6}
                    animation={animationFront}
                    display={!flipped ? 'flex' : 'none'}
                >
                    <Image
                        borderRadius="5"
                        width="50px"
                        src="/chip.png"
                        alt="chip"
                    />
                    <Text
                        fontWeight="600"
                        letterSpacing="2px"
                        mt={4}
                        fontSize="16"
                        color="cinza.700"
                        textShadow="#FFF 1px 1px 1px"
                    >
                        {numberCart}
                    </Text>

                    <Wrap justify="left" spacing="30px">
                        <Box
                            flex="1"
                            alignContent="flex-start"
                            display="flex"
                            flexDir="column"
                        >
                            <Text
                                fontWeight="400"
                                color="cinza.800"
                                fontSize="14"
                                my={1}
                            >
                                <Text
                                    fontWeight="400"
                                    color="cinza.800"
                                    fontSize="12"
                                >
                                    VÁLIDO ATÉ
                                </Text>
                                {cardExpiration !== ''
                                    ? cardExpiration
                                    : 'dd/yyyy'}
                            </Text>
                            <Heading
                                fontWeight="500"
                                fontSize="16"
                                color="cinza.700"
                                textShadow="#FFF 1px 1px 1px"
                            >
                                {nameCart}
                            </Heading>
                        </Box>

                        <Center w="60px" animation={animationRight}>
                            {type && (
                                <Image
                                    borderRadius="5"
                                    width="60px"
                                    src={getCardIcon(type)}
                                    alt="chip"
                                />
                            )}
                        </Center>
                    </Wrap>
                </Flex>

                <Box
                    shadow="md"
                    w="22em"
                    h="14em"
                    borderRadius="lg"
                    bgImage="url('/background-card.png')"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    display={flipped ? 'flex' : 'none'}
                    flexDir="column"
                    justifyContent="center"
                    animation={animationBack}
                >
                    <Box
                        shadow="md"
                        mt="25px"
                        w="22em"
                        h="2.8em"
                        border="0"
                        bg="#242400"
                    />

                    <Box mt="20px" h="2.8em" display="flex" mx="2em" w="18em">
                        <Box
                            w="15em"
                            h="2.8em"
                            border="0"
                            bgImage="url('/card-back02.png')"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                        />
                        <Box
                            w="8em"
                            h="2.8em"
                            border="0"
                            bgImage="url('/card-back02.png')"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            display="flex"
                            justifyContent="end"
                            alignItems="center"
                        >
                            <Text
                                color="cinza.800"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="14"
                                mr="20px"
                            >
                                {securityCodeCart}
                            </Text>
                        </Box>
                    </Box>

                    <Box
                        mx="2em"
                        w="18em"
                        h="2.4em"
                        border="0"
                        bgImage="url('/background03.png')"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                    ></Box>
                </Box>
            </Center>
        </Box>
    )
}

export { InfoCard }
