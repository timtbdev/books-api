import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from "next-sanity";
import { getClient, urlFor } from "@libs/sanity";
import { IBook, IBookResponse, ICategory, ILink, ISlug} from "../../types"

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const books: IBook[] = await getClient().fetch(booksQuery);

    let data: IBookResponse[]
    data = books.map(book =>{
        
        const slug = book.slug.current
        //const image = urlFor(book.image).url() || "";
        const categoryIds: String[] = book.category?.map((item) => item._id) ?? [];
        //const screenshots: String[] = project.screenshots?.map((item) => urlFor(item.image).url()) ?? [];
        return {
            id: book._id,
            title: book.title,
            subtitle: book.subtitle,
            slug: slug,
            description: book.description,
            author: book.author,
            rating: book.rating,
            order: book.order,
            image: book.image,
            categoryId: categoryIds,
            link: book.link
        };
        }
      )

    
  res.status(200).json(data)
}