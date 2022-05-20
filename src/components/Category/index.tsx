import { Box, Image, Text } from '@chakra-ui/react'
import { NavLinkPage } from '../NavLinkPage'

type IProps = {
    title: string
    description: string
    url: string
    href: string
    titleLink: string
}

export function Category({ title, description, url, href, titleLink }: IProps) {
    return (
        <NavLinkPage
            href={href}
            _hover={{
                textDecoration: 'none',
                borderBottom: '2px solid',
                borderBottomColor: 'principal.900',
                transform: 'translateY(-25px)',
                transition: `top 0.5s ease-in-out`
            }}
            _focus={{ boxShadow: 'outline' }}>
            <Box
                boxShadow="sm"
                maxW="sm"
                borderWidth="1px"
                overflow="hidden"
                borderRadius="none"
                bg="white.900">
                <Image src={url} alt={title} />

                <Box px="6" py="30">
                    <Box
                        as="span"
                        mb="4"
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="14"
                        textTransform="uppercase">
                        {title}
                    </Box>

                    <Text
                        as="p"
                        mt={4}
                        letterSpacing="wide"
                        color="cinza.850"
                        fontSize="sm">
                        {description}
                    </Text>

                    <Box display="flex" alignItems="baseline">
                        <Box
                            flex="1"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bg="principal.900"
                            w="100%"
                            h="48px"
                            mt={6}>
                            <Text
                                as="span"
                                fontSize="16px"
                                fontFamily="Inter"
                                lineHeight="18px"
                                fontWeight="500"
                                color="white.900">
                                {titleLink}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </NavLinkPage>
    )
}
