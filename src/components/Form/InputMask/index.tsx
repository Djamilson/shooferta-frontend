import {
    ElementType,
    FormEvent,
    forwardRef,
    ForwardRefRenderFunction,
    useState
} from 'react'

import {
    FormControl,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormErrorMessage,
    InputLeftElement,
    useTheme,
    FormLabel
} from '@chakra-ui/react'

import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name?: string
    show?: boolean
    icon?: ElementType
    label?: string
    labelPlaceHolder?: string
    error?: FieldError
}

//
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    {
        name,
        label,
        labelPlaceHolder,
        icon: IconPrimary,
        onChange,
        error = null,
        ...rest
    },
    ref
) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const theme = useTheme()

    const [e, setE] = useState('')

    function handleKeyUp(e: FormEvent<HTMLInputElement>) {
        setE(e.currentTarget.value)
    }

    return (
        <FormControl
            isInvalid={!!error}
            variant="floating"
            id={name}
            onFocus={() => {
                setIsFocused(true)
            }}
            onBlur={() => {
                setIsFocused(false)
            }}>
            {IconPrimary && (
                <InputLeftElement
                    pointerEvents="none"
                    borderRight={IconPrimary ? '2px solid' : 'none'}
                    borderRightColor={IconPrimary ? 'cinza.400' : 'none'}
                    my={2}
                    w="55px"
                    h="30px"
                    children={
                        <IconPrimary
                            color={
                                isFocused ? 'red' : `${theme.colors.cinza[700]}`
                            }
                            size={22}
                        />
                    }
                />
            )}

            <ChakraInput
                pl={IconPrimary ? '70px' : '30px'}
                py={6}
                color="cinza.700"
                bg="white.900"
                name={name}
                ref={ref}
                onChange={e => {
                    handleKeyUp(e)
                    onChange(e)
                }}
                borderRadius={0}
                display="auto"
                {...rest}
            />

            {!!label && (
                <FormLabel
                    htmlFor={label}
                    fontFamily="archivo"
                    fontWeight="400"
                    color="cinza.700">
                    {e.length > 0 ? label : labelPlaceHolder}
                </FormLabel>
            )}

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    )
}

export const InputMask = forwardRef(InputBase)
