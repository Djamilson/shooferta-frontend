import { IAddress } from '../address/address'
import { IPhone } from '../phone/phone'

export interface IPerson {
    id: string
    name: string
    email: string
    cpf: string
    birth_date: string
    status: boolean
    privacy: boolean

    avatar?: string
    avatar_url?: string
    phone_id?: string
    address_id?: string
    address?: IAddress
    phone?: IPhone
}
