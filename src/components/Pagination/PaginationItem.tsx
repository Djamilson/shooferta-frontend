import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
    isCurrent?: boolean
    number: number
    onPageChange: (page: number) => void
}
export function PaginationItem({
    isCurrent = false,
    number,
    onPageChange
}: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                borderRadius="none"
                size="sm"
                width="4"
                border="1px solid "
                borderColor="cinza.600"
                _hover={{ bg: 'cinza.500' }}
                disabled
                color="cinza.825"
                _disabled={{
                    bg: 'cinza.400',
                    cursor: 'default'
                }}>
                {number}
            </Button>
        )
    }

    return (
        <Button
            borderRadius="none"
            size="sm"
            width="4"
            border="1px solid "
            borderColor="cinza.600"
            _hover={{ bg: 'cinza.500' }}
            disabled
            color="cinza.825"
            onClick={() => onPageChange(number)}>
            {number}
        </Button>
    )
}
