import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Button,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup
} from '@chakra-ui/react'
import { IInstallment } from '../../payment/CartComponent'

type IProps = {
    selectedInstallment: IInstallment
    renderInstallments: IInstallment[]
    handleSelectInstallments: (item: IInstallment) => void
}

function SelectBase({
    selectedInstallment,
    renderInstallments,
    handleSelectInstallments
}: IProps) {
    return (
        <Menu variant="floating">
            {({ isOpen }) => (
                <>
                    <MenuButton
                        borderRadius={0}
                        border="1px solid"
                        borderColor="cinza.700"
                        color="cinza.650"
                        variant="floating"
                        backgroundColor="white.900"
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        {isOpen ? 'Selecione' : selectedInstallment.label}
                    </MenuButton>
                    <MenuList zIndex="9"
                        minWidth="240px"
                        color="cinza.900"
                        borderRadius={0}
                    >
                        <MenuOptionGroup
                            defaultValue="1"
                            title="Total"
                            type="radio"
                        >
                            {renderInstallments.map(item => {
                                return (
                                    <MenuItemOption
                                        onClick={() => {
                                            handleSelectInstallments(item)
                                        }}
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </MenuItemOption>
                                )
                            })}
                        </MenuOptionGroup>
                    </MenuList>
                </>
            )}
        </Menu>
    )
}

export { SelectBase }
