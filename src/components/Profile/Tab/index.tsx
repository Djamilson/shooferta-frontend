import { Tab, Text } from '@chakra-ui/react'

type IProps = {
    tabIndex: number
    domain: number
    title: string
}
export function TabProfile({ tabIndex, title, domain }: IProps) {
    return (
        <Tab
            w="100%"
            _selected={{
                bg: 'none',
                borderBottom: '2px solid',
                borderBottomColor:
                    tabIndex !== domain ? 'cinza.600' : 'principal.900'
            }}>
            <Text
                flex="1"
                w="100%"
                h="100%"
                fontFamily="archivo"
                fontWeight="600"
                fontSize="20px"
                lineHeight="22px"
                color={tabIndex !== domain ? 'cinza.600' : 'cinza.900'}>
                {title}
            </Text>
        </Tab>
    )
}
