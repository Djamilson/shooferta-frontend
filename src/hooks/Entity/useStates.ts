import axios from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { IBGEUFResponse } from '../../components/Address/InputFormAddress'

export async function getStates(): Promise<IBGEUFResponse[]> {
    const { data } = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    )

    const ufInitials = data
        .map((uf: any) => {
            return {
                name: uf.nome,
                sigla: uf.sigla
            }
        })

        .sort((a: any, b: any) => a.name.toLowerCase() - b.name.toLowerCase())

    console.log('ufInitials:', ufInitials)
    return ufInitials
}

export function useStates(options: UseQueryOptions) {
    return useQuery<any>('states', () => getStates(), {
        staleTime: 100 * 60 * 10 * 3, // 30 min
        ...options
    })
}
