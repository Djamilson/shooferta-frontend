import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Icon,
    Button,
    Flex,
    Text,
    Stack
} from '@chakra-ui/react'
import { ElementType, useRef } from 'react'

interface IModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    message: string
    title: string
    icon?: ElementType
    colorIcon?: String
}

export function ModalCreateAccountSuccess({
    isOpen,
    onClose,
    message,
    title,
    icon,
    colorIcon
}: IModalProps) {
    const initialRef = useRef()
    const finalRef = useRef()
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            isCentered>
            <ModalOverlay />
            <ModalContent
                w="324px"
                h="448px"
                bg="shapes.900"
                borderRadius="none">
                <ModalBody p="0">
                    <Flex
                        flex="1"
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <Stack
                            spacing={4}
                            background="url(../union.png)"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                            w="100%"
                            h="100%">
                            <Flex
                                flex="1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mt="24px">
                                <Icon
                                    as={icon}
                                    fontSize="160px"
                                    color={`${colorIcon}`}
                                />
                            </Flex>
                            <Flex
                                flex="1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                               >
                                <Text
                                    color="white.900"
                                    fontFamily="archivo"
                                    fontSize="36px"
                                    textAlign="center"
                                    w="250px"
                                    lineHeight="39.17px"
                                    fontWeight="600">
                                    {title}
                                </Text>
                            </Flex>
                            <Flex
                                flex="1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mt="22px">
                                <Text
                                    color="cinza.750"
                                    fontFamily="inter"
                                    fontSize="18px"
                                    textAlign="center"
                                    w="280px"
                                    lineHeight="28px"
                                    fontWeight="400">
                                    {message}
                                </Text>
                            </Flex>
                            <Flex
                                flex="1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mb={10}>
                                <Button
                                    onClick={onClose}
                                    w="120px"
                                    h="64px"
                                    borderRadius="none"
                                    bg="cinza.900"
                                    _focus={{ boxShadow: 'outline' }}
                                    _hover={{
                                        bg: 'rgba(255, 0, 0, 0.03)',
                                        border: '2px solid rgba(255, 0, 0, 0.4)'
                                    }}>
                                    <Text
                                        color="white.900"
                                        fontFamily="inter"
                                        fontSize="16px"
                                        lineHeight="19.36px"
                                        fontWeight="500">
                                        OK
                                    </Text>
                                </Button>
                            </Flex>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
