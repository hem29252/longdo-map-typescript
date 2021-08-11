export type typeUsers = {
    id: number
    firstname: string,
    lastname: string,
    username: string
    password: string
    email: string
}

export type typeVaccine = {
    id: number,
    name: string
    amount: number,
    lat: number,
    long: number,
    email: string,
    tel: string,
    description: string,
}

export type typeDeocode = {
    geocode: string,
    province: string,
    district: string,
    subdistrict: string,
    postcode: string,
    elevation: number,
    road: string
}

