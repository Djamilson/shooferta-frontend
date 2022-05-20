import { Center, Image, Text, TextProps } from '@chakra-ui/react'

interface IProps extends TextProps {}
export function Logo01({ ...rest }: IProps) {
    return (
        <Text
            as="span"
            fontSize={['2xl', '3xl']}
            fontWeight="bold"
            letterSpacing="tight"
            w="80px"
            {...rest}>
            <Center w="280px" h="80px" bg="principal.900">
                <Text
                    as="span"
                    ml="1"
                    color="pink.500"
                    display="flex"
                    alignItems="center">
                    <Image src="/logo.png" alt="Brand" h="30px" />
                </Text>
            </Center>
        </Text>
    )
}
