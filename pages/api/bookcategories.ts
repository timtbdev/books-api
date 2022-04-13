import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from "next-sanity";
import { getClient, urlFor } from "@libs/sanity";
import dateFormat from "date-fns/format";
import { IBookCategory, IBookCategoryCrossRef, IBookCategoryResponse } from "../../types"

const bookCategoryQuery = groq`
*[_type == "book"] | order(order asc) {
    _id,
    category[]->{_id, category},
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const bookCategories: IBookCategory[] = await getClient().fetch(bookCategoryQuery);

  let response: IBookCategoryResponse[]
  response = bookCategories.map(book => {

    let data: IBookCategoryCrossRef[]
    const bkId = book._id
    data = book.category?.map(item => {
      return {
        bookId: bkId,
        categoryId: item._id
      }
    })

    return {
      bookIdWithCategoryId: data
    };
  }
  )


  res.status(200).json(response)
}