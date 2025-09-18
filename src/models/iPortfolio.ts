import { v4 as uuidv4 } from 'uuid';

import { iTag } from './iTag';
import { ICategory } from './ICategory';

export interface iPortfolio {
    id: string;  //TODO needs UUID
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: ICategory;

    categoryId: string;

    tags: iTag;

}