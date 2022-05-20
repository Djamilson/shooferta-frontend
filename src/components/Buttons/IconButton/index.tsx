import {
    IconButton as ChakraIconButton,
    IconButtonProps,
    Tooltip
} from '@chakra-ui/react'

interface IProps extends IconButtonProps {
    label: string
    bgColor?: string
}

export function IconButton({ label, bgColor, ...rest }: IProps) {
    return (
        <Tooltip hasArrow label={label} bg={bgColor ? bgColor : 'red.600'}>
            <ChakraIconButton
                borderRadius="0"
                boxShadow="md"
                size="sm"
                {...rest}
                _hover={{
                    borderColor: 'pink.400',
                    borderWidth: '1px',
                    transform: 'translateY(-5px)',
                    fontSize: '24px',
                    color: 'pink.400',
                    bgColor: 'cinza.400'

                }}
            />
        </Tooltip>
    )
}
