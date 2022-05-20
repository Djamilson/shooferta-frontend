import { useState } from 'react'

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Text,
    Flex,
    Stack,
    Icon
} from '@chakra-ui/react'

import { NavLinkPage } from '../NavLinkPage'
import { RiCheckboxCircleFill, RiMapPinLine } from 'react-icons/ri'
import { ButtonLink } from '../ButtonLink'
import { BsArrowLeftRight } from 'react-icons/bs'
import { AiOutlineLike } from 'react-icons/ai'
import { MdOutlineCircle } from 'react-icons/md'

export function Request() {
    const [hiddenImage, setHiddenImage] = useState<boolean>(true)

    return (
        <Box flex="1" my="10" border="1px solid" borderColor="cinza.500">
            <Accordion allowToggle color="cinza.650" borderRadius="none">
                <AccordionItem border="none">
                    <h2>
                        <AccordionButton
                            onClick={() => setHiddenImage(!hiddenImage)}>
                            <Flex
                                flexDir="column"
                                display="flex"
                                flex="1"
                                px={6}>
                                <Box
                                    flex="1"
                                    borderBottom="1px solid #AEAEB3"
                                    borderColor="cinza.500"
                                    display="flex"
                                    py={2}
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <AccordionIcon fontSize={30} />
                                    <Box
                                        flex="1"
                                        ml={6}
                                        as="span"
                                        fontSize={14}
                                        fontWeight="bold"
                                        lineHeight="16px"
                                        textAlign="left"
                                        color="green.950">
                                        oooba, pedido entregue
                                    </Box>
                                    <Box
                                        flex="1"
                                        as="span"
                                        lineHeight="16px"
                                        fontSize={14}
                                        fontWeight="400"
                                        textAlign="right">
                                        entregue dia 20/nov
                                    </Box>
                                </Box>
                                {hiddenImage && (
                                    <Box p={4} display={{ md: 'flex' }}>
                                        <Box flexShrink={0}>
                                            <Image
                                                borderRadius="lg"
                                                width={{ md: 40 }}
                                                src="https://bit.ly/2jYM25F"
                                                alt="Woman paying for a purchase"
                                            />
                                        </Box>
                                        <Box
                                            mt={{ base: 4, md: 0 }}
                                            ml={{ md: 6 }}>
                                            <Text
                                                mt={2}
                                                maxWidth="sm"
                                                align="start">
                                                kit completo ring light 10
                                                polegadas com tripé 2,1 metros
                                                dimmer youtuber selfie pro
                                            </Text>

                                            <Text
                                                mt={2}
                                                align="start"
                                                fontWeight="bold"
                                                fontSize="sm"
                                                letterSpacing="wide">
                                                1 unidade
                                            </Text>
                                        </Box>
                                    </Box>
                                )}
                            </Flex>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} px={{ base: 4, md: 10 }}>
                        <Box w="100%" display="flex" flexDir="column" mt={6}>
                            <Text
                                as="span"
                                fontWeight="bold"
                                fontSize="14px"
                                letterSpacing="wide">
                                Pedido:
                                <Box as="span" ml={2}>
                                    02-784846424
                                </Box>
                            </Text>
                            <Box py={4} display={{ md: 'flex' }}>
                                <Box flexShrink={0}>
                                    <Image
                                        borderRadius="lg"
                                        width={{ md: 40 }}
                                        src="https://bit.ly/2jYM25F"
                                        alt="Woman paying for a purchase"
                                    />
                                </Box>
                                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                                    <Text>
                                        kit completo ring light 10 polegadas com
                                        tripé 2,1 metros dimmer youtuber selfie
                                        pro
                                    </Text>

                                    <Text
                                        mt={2}
                                        fontWeight="bold"
                                        fontSize="sm"
                                        letterSpacing="wide">
                                        1 unidade
                                    </Text>
                                </Box>
                            </Box>

                            <Stack
                                display="flex"
                                direction={['column', 'row']}
                                my={6}
                                spacing="0px"
                                w="100%"
                                maxWidth={1440}>
                                <Box
                                    display="flex"
                                    flexDir="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flex="1">
                                    <Box
                                        as="span"
                                        h={0.5}
                                        w="90%"
                                        bg="green.950"
                                        ml="100%"
                                        mt={3.5}
                                    />
                                    <Box position="absolute">
                                        <Icon
                                            as={RiCheckboxCircleFill}
                                            fontSize={30}
                                            color="green.950"
                                        />
                                    </Box>

                                    <Text
                                        mt={10}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        letterSpacing="wide"
                                        fontSize="14px">
                                        Pedido
                                    </Text>
                                    <Text
                                        mt={-2}
                                        mb={4}
                                        textAlign="center"
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="14px"
                                        lineHeight="16px">
                                        recebido
                                    </Text>
                                    <Box
                                        as="i"
                                        mb={7}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="11px"
                                        textAlign="center"
                                        lineHeight="13px">
                                        15/nov 07:03
                                    </Box>
                                </Box>

                                <Box
                                    display="flex"
                                    flexDir="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flex="1">
                                    <Box
                                        as="span"
                                        h={0.5}
                                        w="90%"
                                        bg="green.950"
                                        ml="100%"
                                        mt={3.5}
                                    />
                                    <Box position="absolute">
                                        <Icon
                                            as={RiCheckboxCircleFill}
                                            fontSize={30}
                                            color="green.950"
                                        />
                                    </Box>

                                    <Text
                                        mt={10}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        letterSpacing="wide"
                                        fontSize="14px">
                                        Pagamento
                                    </Text>
                                    <Text
                                        mt={-2}
                                        mb={4}
                                        textAlign="center"
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="14px"
                                        lineHeight="16px">
                                        aprovado
                                    </Text>
                                    <Box
                                        as="i"
                                        mb={7}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="11px"
                                        textAlign="center"
                                        lineHeight="13px">
                                        15/nov 07:06
                                    </Box>
                                </Box>

                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDir="column"
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <Box
                                        as="span"
                                        h={0.5}
                                        w="90%"
                                        bg="green.950"
                                        ml="100%"
                                        mt={3.5}
                                    />
                                    <Box position="absolute">
                                        <Icon
                                            as={MdOutlineCircle}
                                            fontSize={30}
                                            color="green.950"
                                        />
                                    </Box>

                                    <Text
                                        mt={10}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        letterSpacing="wide"
                                        fontSize="14px">
                                        Em transporte
                                    </Text>

                                    <Box
                                        as="i"
                                        mb={7}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="11px"
                                        textAlign="center"
                                        lineHeight="13px">
                                        20/nov 09:04
                                    </Box>
                                </Box>

                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDir="column"
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <Box
                                        position="absolute"
                                        as="span"
                                        pt={1.5}
                                        pl={1.5}
                                        w="40px"
                                        h="40px"
                                        mt="-9px"
                                        borderRadius="33px"
                                        bg="white.900"
                                        border="2px solid"
                                        borderColor="green.950">
                                        <Icon
                                            as={AiOutlineLike}
                                            color="green.950"
                                            fontSize="24px"
                                        />
                                    </Box>

                                    <Text
                                        mt={16}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        letterSpacing="wide"
                                        fontSize="14px">
                                        Pedido
                                    </Text>

                                    <Text
                                        mb={4}
                                        textAlign="center"
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="14px"
                                        lineHeight="16px">
                                        entregue
                                    </Text>
                                    <Box
                                        as="i"
                                        mb={7}
                                        color="cinza.650"
                                        fontFamily="inter"
                                        fontSize="11px"
                                        textAlign="center"
                                        lineHeight="13px">
                                        20/nov 11:25
                                    </Box>
                                </Box>
                            </Stack>

                            <Box display={{ md: 'flex' }} mt={{ md: 10 }}>
                                <ButtonLink
                                    h="54px"
                                    mt={{ base: 5, md: 0 }}
                                    mx={{ base: 0, md: 10 }}
                                    _hover={{
                                        textDecoration: `underline #fff`
                                    }}
                                    bg="principal.900"
                                    colorText="white.900"
                                    icon={BsArrowLeftRight}
                                    href="/logged/exchangeorreturn">
                                    trocar ou devolver
                                </ButtonLink>

                                <ButtonLink
                                    h="54px"
                                    mx={{ base: 0, md: 10 }}
                                    mt={{ base: 5, md: 0 }}
                                    colorText="principal.900"
                                    icon={RiMapPinLine}
                                    _hover={{
                                        textDecoration: `underline #DC1637`
                                    }}
                                    border="2px solid"
                                    borderColor="principal.900"
                                    href="/trackshipping">
                                    acompanhar envio
                                </ButtonLink>
                            </Box>

                            <Box
                                display="flex"
                                flex="1"
                                my={{ base: 4, md: 6 }}
                                ml={{ md: 6 }}
                                alignItems="center"
                                justifyContent="center">
                                <NavLinkPage
                                    href="/detailsrequest"
                                    fontFamily="inter"
                                    fontWeight="semibold"
                                    h="25px"
                                    fontSize="16px"
                                    color="white.900"
                                    _hover={{
                                        textDecoration: `underline`
                                    }}
                                    _focus={{ boxShadow: 'outline' }}>
                                    <Text
                                        fontFamily="inter"
                                        fontWeight="600"
                                        lineHeight="25px">
                                        detalhes do pedido
                                    </Text>
                                </NavLinkPage>
                            </Box>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}
