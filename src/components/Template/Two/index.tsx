import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type IProps = {
    children: ReactNode
}
export default function TemplateTwo({ children }: IProps) {
    return (
        <Flex
            w="100vw"
            display="flex"
            flex="1"
            alignItems="center"
            justifyContent="center"
            bg="white.900"
            overflowX="hidden">
            <Flex
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="1440px"
                maxWidth="1440px"
                h="820px"
                maxHeight="820px"
                mt="0px">
                <Flex
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    maxWidth="1120px"
                    h="613px"
                    minHeight="613px"
                    maxHeight="613px"
                    m="100px">
                    <Box
                        w="477px"
                        maxWidth="477px"
                        h="613px"
                        maxHeight="613px"
                        mb="100px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDir="column">
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}
