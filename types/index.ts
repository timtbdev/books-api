export interface IBook {
    _id: string,
    title: string,
    subtitle: string,
    slug: ISlug,
    description: string,
    author: string,
    rating: number,
    order: number,
    image: string,
    category: ICategory[],
    link: string,
}

export interface IBookResponse {
    id: string,
    title: string,
    subtitle: string,
    slug: string,
    description: string,
    author: string,
    rating: number,
    order: number,
    image: string,
    categoryId: String[],
    link: string,
}

export interface ISlug {
    _type: string,
    current: string
}

export interface ICategory {
    _id: string,
    title: string,
    order: number
}

export interface ICategoryResponse {
    id: string,
    title: string,
    order: number
}

export interface ILink {
    _id: string,
    title: string,
    url: string,
}