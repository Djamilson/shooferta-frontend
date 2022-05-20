import {
    Box,
    Button,
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Text,
    Tr
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { Input } from '../../Form/Input'
import { IBGEUFResponse } from '../InputFormAddress'

type IProps = {
    isOpen: boolean
    onClose: () => void
    states: IBGEUFResponse[]
    handleSelectedState: (state: IBGEUFResponse) => void
    title: string
}

function StateModal({
    isOpen,
    onClose,
    states,
    handleSelectedState,
    title
}: IProps) {
    const [q, setQ] = useState('')
    const [searchParam] = useState(['name'])

    function search(items: IBGEUFResponse[]) {
        return items?.filter((item: IBGEUFResponse) => {
            return searchParam?.some(newItem => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                )
            })
        })
    }

    return (
        <ChakraModal
            onClose={onClose}
            size="xl"
            isOpen={isOpen}
            isCentered
            scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent borderRadius="none" color="cinza.650">
                <ModalHeader>
                    <Box
                        flex="1"
                        display="flex"
                        flexDir="column"
                        borderBottom="1px"
                        borderBottomColor="cinza.500"
                        paddingBottom={4}>
                        {title}

                        <Input
                            placeholder="Busca"
                            name="search"
                            color="cinza.900"
                            iconSecondary={RiSearchLine}
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                        <Box
                            justifyContent="space-between"
                            display="flex"
                            alignItems="center"
                            mt={10}
                            mb={0}
                            mx={2}>
                            <Box as="span" fontFamily="inter" fontSize={14}>
                                Nome
                            </Box>

                            <Box
                                as="span"
                                mr={130}
                                fontFamily="inter"
                                fontSize={14}>
                                Seleciona
                            </Box>
                        </Box>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <>
                        <Table
                            variant="simple"
                            color="cinza.875"
                            fontWeight="400"
                            fontFamily="inter"
                            fontSize="16px">
                            <Tbody>
                                {search(states).length < 1 && (
                                    <Tr>
                                        <Td colSpan={2}>
                                            Não encontramos os estados
                                        </Td>
                                    </Tr>
                                )}
                                {search(states)?.map(
                                    (state: IBGEUFResponse) => {
                                        return (
                                            <Tr key={state.sigla}>
                                                <Td p={2}>
                                                    <Box>
                                                        <Text>
                                                            {state.name}
                                                        </Text>
                                                    </Box>
                                                </Td>

                                                <Td p={0}>
                                                    <Button
                                                        type="button"
                                                        ml={2}
                                                        mt="0px"
                                                        borderRadius="none"
                                                        w="100px"
                                                        h="30px"
                                                        fontSize={12}
                                                        color="principal.900"
                                                        colorScheme="teal"
                                                        onClick={() =>
                                                            handleSelectedState(
                                                                state
                                                            )
                                                        }
                                                        variant="outline">
                                                        {state.sigla}
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        )
                                    }
                                )}
                            </Tbody>
                        </Table>
                    </>
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    )
}

export { StateModal }
