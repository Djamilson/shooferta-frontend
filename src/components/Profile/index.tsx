import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import { IPhone } from '../../@model/phone/phone'
import { IUser } from '../../@model/user/user'
import { TabProfile } from './Tab'
import { TabEmail } from './TabEmail'
import { TabPassword } from './TabPassword'
import { TabPhone } from './TabPhone'
import { TabUser } from './TabUser'

type IProps = {
    user?: IUser
    updateUser: (user: IUser) => void
    phones?: IPhone[]
}
export function Profile({ user, updateUser, phones }: IProps) {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Flex flex="1" minWidth="384px" flexDir="column" px={4}>
            <Tabs
                defaultIndex={0}
                onChange={index => {
                    setTabIndex(index)
                }}
                variant="line"
                id="table01">
                <TabList>
                    <TabProfile tabIndex={tabIndex} domain={0} title="Dados" />

                    <TabProfile
                        tabIndex={tabIndex}
                        domain={1}
                        title="Telefones"
                    />
                    <TabProfile
                        tabIndex={tabIndex}
                        domain={2}
                        title="Trocar senha"
                    />

                    <TabProfile tabIndex={tabIndex} domain={3} title="Email" />
                </TabList>

                <TabPanels>
                    <TabPanel mt="24px" p="0">
                        <TabUser user={user} updateUser={updateUser} />
                    </TabPanel>

                    <TabPanel mt="24px" p="0">
                        <TabPhone phones={phones} />
                    </TabPanel>

                    <TabPanel mt="24px" p="0">
                        <TabPassword />
                    </TabPanel>
                    <TabPanel mt="24px" p="0">
                        {!!user && (
                            <TabEmail user={user} updateUser={updateUser} />
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}
