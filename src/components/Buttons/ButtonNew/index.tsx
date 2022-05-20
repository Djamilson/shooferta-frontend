import React from 'react'
import { RiAddLine } from 'react-icons/ri'

import Link from 'next/link'

import { Button, Icon } from '@chakra-ui/react'

interface IProps {
    href: string
    label: string
}

const ButtonNew = ({ href, label }: IProps) => {
    return (
        <Link href={href} passHref>
            <Button
                as="a"
                size="sm"
                colorScheme="pink"
                fontSize="20px"
                py={6}
                px={6}
                mx={6}
                leftIcon={<Icon as={RiAddLine} />}>
                {label}
            </Button>
        </Link>
    )
}

export default ButtonNew
