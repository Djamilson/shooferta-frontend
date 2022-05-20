import { Badge, Box, Image, Text } from '@chakra-ui/react'
import { NavLinkPage } from '../NavLinkPage'

type IProps = {
    title: string
    description: string
    url: string
    href: string
    titleLink: string
}

export function Collection({ title, description, url, href, titleLink }: IProps) {
    return (
        <Box
            maxW="sm"
            borderRadius="none"
            overflow="hidden"
            justifyContent="space-between"
            display="flex"
            h="600px"
            w="292px"
            flexDir="column"
            bg="white.900">
            <Image src={url} alt={title} />

            <Box p="6">
                <Box display="flex" mb="30px" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        New
                    </Badge>
                    <Box
                        as="span"
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {title}
                    </Box>
                </Box>

                <Text
                    as="p"
                    fontFamily="inter"
                    fontWeight="regular"
                    mt={0}
                    fontSize="16px"
                    color="cinza.800"
                    justifyContent="flex-start"
                    textAlign={['left', 'justify']}>
                    {description}
                </Text>
            </Box>
            <Box
                alignItems="center"
                w="100%"
                display="flex"
                justifyContent="center"
                mb="30px"
                px="6">
                <NavLinkPage
                    mt="10px"
                    href={href}
                    justifyContent="center"
                    alignItems="center"
                    bg="principal.900"
                    w="292px"
                    h="80px"
                    _hover={{
                        bg: 'rgba(255, 0, 0, 0.4)',
                        textDecoration: 'none'
                    }}
                    _focus={{ boxShadow: 'outline' }}>
                    <Text
                        as="span"
                        fontSize="18px"
                        fontFamily="Inter"
                        lineHeight="21,78px"
                        fontWeight="500"
                        color="white.900">
                        {titleLink}
                    </Text>
                </NavLinkPage>
            </Box>
        </Box>
    )
}
