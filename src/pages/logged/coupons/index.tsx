import React, { useState } from 'react'

import { Flex, Box, SimpleGrid, useDisclosure, usePrefersReducedMotion } from '@chakra-ui/react'

import { Header } from '../../../components/Header'
import { SideBar } from '../../../components/logged/Sidebar'
import { withSSRGuest } from '../../../utils/withSSRGuest'
import { Coupon } from '../../../components/Coupon'
import { Title } from '../../../components/Title'
import { SubTitle } from '../../../components/SubTitle'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { itemAnimationLeft } from '../../../styles/animation'

export default function Coupons() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [coupon, setCoupon] = useState<string>('')

    function handleConfirmation(id: string) {
        onOpen()
        setCoupon(id)
    }

  const prefersReducedMotion = usePrefersReducedMotion()

  const animationLeft = prefersReducedMotion
      ? undefined
    : `${itemAnimationLeft} 1s`

    return (
        <Flex direction="column" flex="1" bg="cinza.400">
            <Header />
            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1" bg="cinza.400" p={6}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}>
                        <Title> vales</Title>

                        <SubTitle>
                            aqui você pode encontrar todos os seus vales!
                        </SubTitle>
                    </Box>
                    <Box flex="1" mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        <SimpleGrid
                            flex="1"
                            gap="4"
                            minChildWidth="320px"
                            my="10">
                            <Coupon handleConfirmation={handleConfirmation} />
                            <Coupon handleConfirmation={handleConfirmation} />
                            <Coupon handleConfirmation={handleConfirmation} />
                        </SimpleGrid>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
