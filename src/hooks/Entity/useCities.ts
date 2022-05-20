import axios from 'axios'
import { useQuery } from 'react-query'
import { v4 as uuid } from 'uuid'
import { IBGECityResponse } from '../../components/Address/InputFormAddress'

export async function getCities(
    selectStateSigla: string
): Promise<IBGECityResponse[]> {
    const { data } = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectStateSigla}/municipios`
    )

    const cities = data.map((city: any) => {
        return {
            id: String(uuid()),
            name: city.nome
        }
    })

    return cities
}

export function useCities(selectStateSigla: string) {
    return useQuery<any>(
        [`cities-${selectStateSigla}`, selectStateSigla],
        () => getCities(selectStateSigla),
        {
            staleTime: 100 * 60 * 10 * 6 * 24 // 30 min
        }
    )
}
