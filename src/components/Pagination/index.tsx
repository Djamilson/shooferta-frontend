import { Box, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
    totalCountOfRegisters: number
    registersPerPage?: number
    currentPage?: number
    onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1
        })
        .filter(page => page > 0)
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

    const previousPages =
        currentPage > 1
            ? generatePagesArray(
                  currentPage - 1 - siblingsCount,
                  currentPage - 1
              )
            : []

    const nextPages =
        currentPage < lastPage
            ? generatePagesArray(
                  currentPage,
                  Math.min(currentPage + siblingsCount, lastPage)
              )
            : []

    return (
        <Stack
            direction={['column', 'row']}
            spacing="6"
            mt="8"
            borderRadius="none"
            justify="space-between"
            align="center"
            fontWeight="600"
            fontSize="sm"
            color="cinza.875">
            <Box as="span">
                <Box as="span">1</Box> -{' '}
                <Box as="span">
                    {currentPage * registersPerPage >= totalCountOfRegisters
                        ? totalCountOfRegisters
                        : currentPage * registersPerPage}
                </Box>{' '}
                de
                <Box as="span"> {totalCountOfRegisters}</Box>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > 1 + siblingsCount && (
                    <>
                        <PaginationItem
                            onPageChange={onPageChange}
                            number={1}
                        />
                        {currentPage > 2 + siblingsCount && (
                            <Text color="cinza.825" w="6" textAlign="center">
                                ...
                            </Text>
                        )}
                    </>
                )}

                {previousPages.length > 0 &&
                    previousPages.map(page => {
                        return (
                            <PaginationItem
                                onPageChange={onPageChange}
                                key={page}
                                number={page}
                            />
                        )
                    })}

                <PaginationItem
                    onPageChange={onPageChange}
                    number={currentPage}
                    isCurrent
                />

                {nextPages.length > 0 &&
                    nextPages.map(page => {
                        return (
                            <PaginationItem
                                onPageChange={onPageChange}
                                key={page}
                                number={page}
                            />
                        )
                    })}

                {currentPage + siblingsCount < lastPage && (
                    <>
                        {currentPage + 1 + siblingsCount < lastPage && (
                            <Text color="cinza.825" w="6" textAlign="center">
                                ...
                            </Text>
                        )}
                        <PaginationItem
                            onPageChange={onPageChange}
                            number={lastPage}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    )
}
