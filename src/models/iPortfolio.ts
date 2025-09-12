import { v4 as uuidv4 } from 'uuid';

import { iTag } from './iTag';

export interface iPortfolio {
    id: string;  //TODO needs UUID
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    portfolioType: string;
    tags: iTag;

}