import { IPerson } from "../person/person"

export interface IUser {
    id: string
    is_verified: boolean
    firstName: string
    person: IPerson
    roles: string[]
}
