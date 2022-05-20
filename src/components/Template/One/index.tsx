import { Box, Flex, FlexProps as ChakraFlexProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IProps extends ChakraFlexProps {
    children: ReactNode
    path_image: string
    path_imageRetangle01: string
    path_imageRetangle02: string
}

export default function TemplateOne({
    children,
    path_image,
    path_imageRetangle01,
    path_imageRetangle02,
    ...rest
}: IProps) {
    return (
        <Flex
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflowX="hidden"
            {...rest}>
            <Flex
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="1440px"
                maxWidth="1440px"
                h="820px"
                maxHeight="820px"
                mt="100px">
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
