import {
    ElementType,
    FormEvent,
    forwardRef,
    ForwardRefRenderFunction,
    useState
} from 'react'
import { FieldError } from 'react-hook-form'

import {
    FormControl,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormErrorMessage,
    Icon,
    InputLeftElement,
    InputRightElement,
    IconButton,
    useTheme,
    FormLabel
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
    name?: string
    label?: string
    error?: FieldError
    status?: any
    icon?: ElementType
    iconSecondary?: ElementType
    handleClick?: () => void
    show?: boolean
    labelPlaceHolder?: string
}

//
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    {
        name,
        label,
        icon: IconPrimary,
        iconSecondary: IconSecondary,
        labelPlaceHolder,
        error = null,
        handleClick,
        status,
        show,
        onChange,
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
                color="cinza.900"
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

            {IconSecondary && (
                <>
                    <InputRightElement
                        py={1}
                        w="55px"
                        mt="0px"
                        children={
                            <IconButton
                                onClick={handleClick}
                                _focus={{ boxShadow: 'none' }}
                                aria-label="DarkMode Switch"
                                bg="white.900"
                                _hover={{
                                    bgColor: 'transparent'
                                }}
                                icon={
                                    show ? (
                                        <Icon
                                            as={IconPrimary}
                                            fontSize="22"
                                            color={`${theme.colors.cinza[700]}`}
                                        />
                                    ) : (
                                        <Icon
                                            as={IconSecondary}
                                            fontSize="22"
                                            color={`${theme.colors.cinza[700]}`}
                                        />
                                    )
                                }
                            />
                        }
                    />
                </>
            )}

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

export const Input = forwardRef(InputBase)
