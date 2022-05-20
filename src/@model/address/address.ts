export type IAddress = {
    id: string
    person_id: string
    main: boolean

    street: string
    number: number
    complement?: string
    zip_code: string
    zipCodeFormat?: string
    neighborhood: string
    city: string
    state: string
}
