import { Flex } from '@chakra-ui/react'
import { FormEvent } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { Input } from '../Form/Input'

interface IProps {
    handleSearch: (event: FormEvent<Element>) => void
}

export function SearchBox({ handleSearch }: IProps) {
    return (
        <Flex
            flex="1"
            w={{ base: '100%', md: '60%' }}
            minWidth={400}
            mr="100px">
            <Input
                placeholder="Busca"
                name="search"
                color="cinza.900"
                onChange={handleSearch}
                iconSecondary={RiSearchLine}
            />
        </Flex>
    )
}
