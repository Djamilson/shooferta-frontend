import { formatPrice } from '../utils/formatPrice'

type IProps = {
    price_promotion?: number
    price: number
}

export function useNumberTimesSale({ price_promotion, price }: IProps) {
    if (price_promotion) {
        return { numberVez: '12x', price: formatPrice(price_promotion / 12) }
    }

    return { numberVez: '12x', price: formatPrice(price / 12) }
}
