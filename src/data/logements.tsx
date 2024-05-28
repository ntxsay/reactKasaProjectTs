interface ILogementHost {
    name: string,
    picture: string
}

interface ILogement {
    id: string,
    title: string,
    cover: string,
    pictures: string[],
    description: string,
    host: ILogementHost,
    rating: string,
    location: string,
    equipments: string[],
    tags: string[]
}

interface IPropLogements {
    logements:ILogement[]
}

interface IPropLogement {
    logement:ILogement
}