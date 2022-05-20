import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@chakra-ui/icons'
import {
    chakra,
    css as chakraCSS,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    StyleObjectOrFn,
    Text,
    useTheme
} from '@chakra-ui/react'
import { ClassNames } from '@emotion/react'
import ptBR from 'date-fns/locale/pt-BR'
import React, {
    ElementType,
    forwardRef,
    ForwardRefRenderFunction,
    useCallback,
    useMemo,
    useState
} from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { FieldError } from 'react-hook-form'

const StyledaDatepicker = chakra(DatePicker)

const CustomInput = forwardRef<any, any>((props, ref) => {
    return (
        <InputGroup>
            <Input
                p={3.5}
                pl={6}
                borderRadius={6}
                focusBorderColor="cinza.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{ bg: 'cinza.500' }}
                size="lg"
                {...props}
                ref={ref}
            />
            <InputRightElement
                userSelect="none"
                pointerEvents="none"
                mt={1.5}
                children={<CalendarIcon fontSize="lg" color="cinza.700" />}
            />
        </InputGroup>
    )
})

const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
}: any) => {
    return (
        <Stack
            isInline
            alignItems="center"
            textAlign="left"
            pl={4}
            pr={2}
            pb={6}>
            <Text
                color="cinza.800"
                flex={1}
                fontSize="22px"
                fontWeight="medium">
                {new Intl.DateTimeFormat('pt-br', {
                    year: 'numeric',
                    month: 'long'
                }).format(date)}
            </Text>
            <IconButton
                borderRadius="full"
                size="sm"
                variant="ghost"
                aria-label="Previous Month"
                icon={<ChevronLeftIcon fontSize="22px" />}
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
            />
            <IconButton
                borderRadius="full"
                size="sm"
                variant="ghost"
                aria-label="Next Month"
                icon={<ChevronRightIcon fontSize="22px" />}
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
            />
        </Stack>
    )
}

function useDatePickerStyles() {
    const theme = useTheme()
    return useMemo(() => {
        const defaultStyles: StyleObjectOrFn = {
            borderRadius: 'none',
            border: '1px solid #EBEBF0',
            boxShadow: 'sm',
            fontFamily: 'unset',
            marginLeft: '-20px',

            '& .react-datepicker': {
                '&__header': {
                    bg: 'none',
                    borderBottom: 'none',
                    ml: 6
                },
                '&__month': {
                    mt: 0,
                    ml: 5
                },
                '&__day-name': {
                    mt: 2,
                    color: 'cinza.800',
                    fontWeight: 'medium',
                    fontFamily: 'inter',
                    w: 6,
                    ml: 4,
                    mr: 6,
                    mb: 8,
                    fontSize: 18
                },
                '&__day': {
                    lineHeight: '28px',
                    color: 'gray.700',
                    w: 12,
                    h: 12,
                    borderRadius: 'none',
                    fontSize: '1rem',
                    mt: 0,
                    ml: 3,
                    pt: 2.5
                },
                '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--disabled, .react-datepicker__day--keyboard-selected):hover':
                    {
                        bg: 'white',
                        boxShadow: '0 0 1px 1px rgba(255, 0, 0, 0.4)',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        color: '#fff'
                    },
                '&__day--today': {
                    bg: 'gray.100',
                    fontWeight: '400',
                    fontSize: '0.9rem'
                },
                '&__day--selected, &__day--keyboard-selected': {
                    bg: 'principal.900',
                    color: 'white'
                },

                '&__day:not(.react-datepicker__day--disabled):hover': {
                    bg: 'principal.900',
                    boxShadow: '0 0 1px 1px rgba(255, 0, 0, 0.4)'
                },

                '&__day--disabled, &__day--keyboard-disabled': {
                    color: '#666360 !important',
                    background: 'cinza.500 !important',
                    pointerEvents: 'none',
                    webkitTextDecorationLine: 'line-through',
                    textDecorationLine: 'line-through'
                },

                '&__day--in-range': { bg: 'red.50', color: 'principal.900' },
                '&__day--range-start': {
                    color: '#fff',
                    bg: 'principal.900'
                },
                '&__day--range-end': {
                    color: '#fff',
                    bg: 'principal.900'
                },

                '&__day--range-start:hover ': {
                    color: 'cinza.900'
                },
                '&__day--range-end:hover ': {
                    color: 'cinza.900'
                },

                '&__day--in-selecting-range': {
                    color: 'cinza.800',
                    bg: 'red.50'
                },

                '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover':
                    {
                        bg: 'red.50',
                        color: 'principal.900',
                        boxShadow: '0 0 1px 1px rgba(0,0,0,0.2)'
                    },
                '&__day--excluded': {
                    color: '#fff !important',
                    bg: 'cinza.700',
                    pointerEvents: 'none',
                    webkitTextDecorationLine: 'line-through',
                    textDecorationLine: 'line-through',
                    borderRadius: 'full'
                }
            }
        }
        return chakraCSS(defaultStyles)(theme)
    }, [theme])
}

interface InputProps extends ReactDatePickerProps {
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

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    {
        label,
        name,
        icon: IconPrimary,
        iconSecondary: IconSecondary,
        labelPlaceHolder,
        error = null,
        handleClick,
        status,
        show,
        onChange,
        ...props
    },
    ref
) => {
    const message = 'Campo de data é obrigatório'

    const styles = useDatePickerStyles()

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const [e, setE] = useState('')

    const render = useCallback(
        ({ css }) => {
            return (
                <FormControl
                    zIndex="9"
                    isInvalid={!!error}
                    variant="floating"
                    id={name}
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}>
                    <StyledaDatepicker
                        popperClassName={css({
                            marginTop: '4px!important',
                            background: 'red'
                        })}
                        calendarClassName={css(styles)}
                        locale={ptBR}
                        onChange={onChange}
                        className="react-datapicker__input-text"
                        borderRadius="0"
                        color="cinza.900"
                        bg="white.900"
                        border="1px solid"
                        borderColor="gray.200"
                        customInput={<CustomInput />}
                        renderCustomHeader={CustomHeader}
                        {...props}
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

                    {!!error && (
                        <FormHelperText color="red.500" fontSize="lg">
                            {message}
                        </FormHelperText>
                    )}
                </FormControl>
            )
        },
        [styles, label, error, onChange]
    )

    return <ClassNames>{render}</ClassNames>
}

export const Datepicker = forwardRef(InputBase)
