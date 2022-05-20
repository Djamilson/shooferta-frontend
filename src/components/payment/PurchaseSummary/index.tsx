import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { ButtonLinkDialog } from '../../Buttons/ButtonLinkDialog'
import { Horizontal } from '../../Divider/Horizontal'
import { Title } from '../../Title'

type IProps = {
    totalQt: number
    total: string
    handleAddress: () => void
    bgColor?: string
}

function PurchaseSummary({ totalQt, total, handleAddress, bgColor }: IProps) {
    return (
        <Box
            mt={{ base: 4, md: 0 }}
            p={{ base: 4, md: 6 }}
            ml={{ base: 0, md: 4 }}
            bg={bgColor ? bgColor : 'cinza.350'}
            color="cinza.825">
            <Title
                fontSize={{
                    base: '14px',
                    md: '16px',
                    lg: '18px'
                }}>
                resumo da compra
            </Title>

            <Horizontal />

            <Flex
                display="flex"
                justifyContent="space-between"
                my={4}
                flexDir="column">
                <SimpleGrid columns={2} spacing={2}>
                    <Box
                        display="flex"
                        color="cinza.650"
                        fontSize="15px"
                        flexDir="row"
                        alignContent="center"
                        justifyContent="left"
                        lineHeight="22.5px">
                        {totalQt === 0 && `0`}
                        {totalQt === 1 && `${totalQt} produto`}
                        {totalQt > 1 && `${totalQt} produtos`}
                        <ButtonLinkDialog
                            mt={-1}
                            w={100}
                            ml={2}
                            title="visualizar"
                            color="cinza.900"
                            onClick={handleAddress}
                        />
                    </Box>
                    <Box
                        as="span"
                        color="cinza.650"
                        fontSize="15px"
                        lineHeight="22.5px"
                        textAlign="right">
                        {total}
                    </Box>
                    <Box
                        as="span"
                        color="green.900"
                        fontSize="sm"
                        justifyContent="left">
                        frete
                    </Box>
                    <Box
                        as="span"
                        color="green.900"
                        fontSize="sm"
                        textAlign="right">
                        grátis
                    </Box>
                </SimpleGrid>

                <Horizontal />

                <SimpleGrid columns={2} spacing={2}>
                    <Box
                        display="flex"
                        color="cinza.650"
                        fontSize="18px"
                        fontWeight="700"
                        flexDir="row"
                        alignContent="center"
                        justifyContent="left"
                        lineHeight="22.5px">
                        Total
                    </Box>
                    <Flex align="right" flexDir="column">
                        <Box
                            as="span"
                            color="cinza.650"
                            fontSize="18px"
                            fontWeight="700"
                            lineHeight="22.5px"
                            textAlign="right">
                            {total}
                        </Box>
                        <Box
                            as="span"
                            color="cinza.650"
                            fontSize="12px"
                            textAlign="right">
                            em 1x no cartão
                        </Box>
                        <Box
                            as="span"
                            color="cinza.650"
                            fontSize="12px"
                            fontWeight="400"
                            textAlign="right">
                            {`ou ${total} em até 10x`}
                        </Box>

                        <Box
                            mt={3}
                            as="span"
                            color="cinza.650"
                            fontSize="14px"
                            fontWeight="500"
                            textAlign="right">
                            {`${total} no boleto`}
                        </Box>
                    </Flex>
                </SimpleGrid>
            </Flex>
        </Box>
    )
}

export { PurchaseSummary }
