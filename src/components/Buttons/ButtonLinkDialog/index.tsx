import { Box, Button, ButtonProps, useTheme } from '@chakra-ui/react'

import { ElementType } from 'react'

interface IProps extends ButtonProps {
    icon?: ElementType
    title: string
    color?: string
    onClick: () => void
}

export function ButtonLinkDialog({
    title,
    color,
    icon: Icon,
    onClick,
    ...rest
}: IProps) {
    return (
        <Button
            leftIcon={Icon && <Icon fontSize="18px" />}
            justifyContent="left"
            alignItems="center"
            bg="none"
            w="100%"
            h="48px"
            _hover={{
                fontWeight: 'bold',
                textDecoration: 'underline #999'
            }}
            _focus={{ boxShadow: 'outline' }}
            color={color !== undefined ? color : 'cinza.800'}
            onClick={onClick}
            borderRadius="none"
            variant="link"
            {...rest}>
            <Box
                as="span"
                fontSize="14px"
                fontFamily="inter"
                lineHeight="16px"
                fontWeight="400"
                color="cinza.900">
                {title}
            </Box>
        </Button>
    )
}
