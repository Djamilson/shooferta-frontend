import { Icon, Image, ImageProps } from '@chakra-ui/react'
import { ElementType } from 'react'

interface IProps extends ImageProps {
    photoUrl?: string
    name: string
    icon: ElementType
    iconColor?: string
    iconDimension?: string
}
function PhotoComponent({
    photoUrl,
    name,
    icon,
    iconColor,
    iconDimension,
    ...rest
}: IProps) {
    return photoUrl ? (
        <Image src={photoUrl} alt={name} {...rest} />
    ) : (
        <Icon
            as={icon}
            w={iconDimension ? iconDimension : 8}
            h={iconDimension ? iconDimension : 8}
            color={iconColor ? iconColor : 'cinza.800'}
        />
    )
}

export { PhotoComponent }
