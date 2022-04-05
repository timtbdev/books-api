import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from "next-sanity";
import { getClient } from "@libs/sanity";
import { ICategory, ICategoryResponse} from "../../types"

const categoriesQuery = groq`
*[_type == "category"] | order(order asc) {
    _id,
    title,
    order,
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const categories: ICategory[] = await getClient().fetch(categoriesQuery);

    let data: ICategoryResponse[]
    data = categories.map(category =>{
        
        return {
            id: category._id,
            title: category.title,
            order: category.order,
        };
        }
      )

    
  res.status(200).json(data)
}