import React, { ElementType } from 'react'

import Link from 'next/link'
import { Button, Icon } from '@chakra-ui/react'

interface IProps {
    href: string
    icon: ElementType
    colorIcon?: string
}

const ButtonBack = ({ href, icon, colorIcon }: IProps) => {
    return (
        <Link href={href} passHref>
            <Button
                as="a"
                textDecoration="none"
                fontSize="24px"
                variant="unstyled"
                color={colorIcon !== undefined ? colorIcon : 'cinza.800'}
                w="20px"
                h="20px"
                leftIcon={<Icon as={icon} />}
                _hover={{
                    borderColor:
                        colorIcon !== undefined ? colorIcon : 'cinza.800',

                    fontSize: '24px',
                    color: colorIcon !== undefined ? colorIcon : 'cinza.800',
                    borderRadius: 'none',
                    w: '20px',
                    h: '20px'
                }}
            />
        </Link>
    )
}

export default ButtonBack
