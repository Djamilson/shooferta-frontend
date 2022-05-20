import { IFreight } from './freight'
import { ISearchAddress } from './searchAddress'

export interface ILocalizationDTO {
    address: ISearchAddress
    freights?: IFreight[]
}
