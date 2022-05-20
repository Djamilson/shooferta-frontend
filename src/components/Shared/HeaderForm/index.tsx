import { Box, Heading, Text } from '@chakra-ui/react'

type IProps = {
    title: String
    description: String
}

export function HeaderForm({ title, description }: IProps) {
    return (
        <Box w="100%" h="100%" p={8} mt={10}>
            <Heading
                mb={10}
                fontSize="36px"
                fontWeight="semibold"
                color="cinza.850"
                fontFamily="archivo">
                {title}
            </Heading>
            <Text
                fontSize="20px"
                fontFamily="Inter"
                lineHeight="30px"
                fontWeight="400"
                color="cinza.800">
                {description}
            </Text>
        </Box>
    )
}
