import { useQuery, UseQueryOptions } from 'react-query'
import { IPerson } from '../../@model/person/person'
import { IUser } from '../../@model/user/user'
import { api } from '../../_services/apiClient'

export async function getPerson(id: string): Promise<IPerson> {
    const url = `persons/${id}`

  const { data } = await api.get(url)

  console.log("DATATA PErson:",data)

    return data
}

export async function getUser(): Promise<IUser> {
    const url = `users`

    const { data } = await api.get(url)

    return data
}

export function usePersonById(id: string, options: UseQueryOptions) {

    return useQuery<any>([`person-${id}`, id], () => getPerson(id), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}

export function useUser(options: UseQueryOptions) {
    return useQuery<any>(`user`, () => getUser(), {
        staleTime: 100 * 60 * 10, // 10 min
        ...options
    })
}
