import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select as ChakraSelect,
    SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
import {
    FormEvent,
    forwardRef,
    ForwardRefRenderFunction,
    useState
} from 'react'
import { FieldError } from 'react-hook-form'

type IOption = {
    value: string
    label: string
}

interface SelectProps extends ChakraSelectProps {
    name?: string
    label?: string
    error?: FieldError
    handleClick?: () => void
    labelPlaceHolder?: string
    options: IOption[]
}

//
const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
    {
        name,
        label,
        labelPlaceHolder,
        error = null,
        handleClick,
        onChange,
        options,
        ...rest
    },
    ref
) => {
    const [e, setE] = useState('')

    function handleKeyUp(e: FormEvent<HTMLInputElement>) {
        setE(e.currentTarget.value)
    }

    function serealizableOption(options: IOption[]) {
        return options.map((option: IOption) => {
            if (option.value === '') {
                return (
                    <option key="wqq" value="testest" disabled hidden>
                        Selecione
                    </option>
                )
            } else {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
            }
        })
    }

    return (
        <label htmlFor={name}>
            <FormControl isInvalid={!!error} variant="floating" id={name}>
                <ChakraSelect
                    id={name}
                    name={name}
                    ref={ref}
                    onChange={(e: any) => {
                        handleKeyUp(e)
                        onChange(e)
                    }}
                    borderRadius={0}
                    display="auto"
                    {...rest}>
                    {serealizableOption(options)}
                </ChakraSelect>

                {!!label && (
                    <FormLabel
                        htmlFor={name}
                        fontFamily="archivo"
                        fontWeight="400"
                        color="cinza.700">
                        {e.length > 0 ? label : labelPlaceHolder}
                    </FormLabel>
                )}

                {!!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
            </FormControl>
        </label>
    )
}

export const Select = forwardRef(SelectBase)
