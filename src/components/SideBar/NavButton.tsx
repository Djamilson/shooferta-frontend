import {
    Icon,
    Text,
    useTheme,
    ButtonProps as ChakraButtonProps,
    Box,
    Button
} from '@chakra-ui/react'
import { ElementType } from 'react'

interface NavButtonProps extends ChakraButtonProps {
    icon?: ElementType
    colorText?: string
    children: string
    onClick: () => void
}

export function NavButton({
    icon,
    children,
    colorText,
    onClick,
    ...rest
}: NavButtonProps) {
    const theme = useTheme()

    return (
        <Button w="100%" display="flex" align="center" color="red" {...rest}>
            <Box
                w="100%"
                _hover={{ color: `${theme.colors.principal[900]}` }}
                color={colorText ? colorText : 'cinza.875'}
                onClick={() => onClick()}
                display="flex">
                {icon && <Icon mr="4" as={icon} fontSize="22px" />}
                <Text
                    as="p"
                    fontWeight="400"
                    fontFamily="inter"
                    fontSize="16px">
                    {children}
                </Text>
            </Box>
        </Button>
    )
}
