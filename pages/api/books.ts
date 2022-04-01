import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from "next-sanity";
import { getClient, urlFor } from "@libs/sanity";

const booksQuery = groq`
*[_type == "book"] | order(order asc) {
    _id,
    title,
    subtitle,
    slug,
    description,
    author,
    rating,
    image,
    category[]->{_id, category},
    link[]->{_id, title, url},
  }
`;

interface IBook {
    _id: string,
    title: string,
    subtitle: string,
    slug: ISlug,
    text: string,
    author: string,
    rating: number,
    order: number,
    image: string,
    category: ICategory[],
    link: ILink[],
}

interface IResult {
    id: string,
    title: string,
    subtitle: string,
    slug: string,
    text: string,
    author: string,
    rating: number,
    order: number,
    image: string,
    category: ICategory[],
    link: ILink[],
}

interface ISlug {
    _type: string,
    current: string
}

interface ICategory {
    _id: string,
    title: string,
    order: number
}

interface ILink {
    _id: string,
    title: string,
    url: string,
}



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const books: IBook[] = await getClient().fetch(booksQuery);

    let data: IResult[]
    data = books.map(book =>{
        
        const slug = book.slug.current
        //const image = urlFor(book.image).url() || "";
        //const categories: String[] = book.category?.map((item) => item.title) ?? [];
        //const screenshots: String[] = project.screenshots?.map((item) => urlFor(item.image).url()) ?? [];
        return {
            id: book._id,
            title: book.title,
            subtitle: book.subtitle,
            slug: slug,
            text: book.text,
            author: book.author,
            rating: book.rating,
            order: book.order,
            image: book.image,
            category: book.category,
            link: book.link
        };
        }
      )

    
  res.status(200).json(data)
}