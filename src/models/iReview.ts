import { v4 as uuidv4 } from 'uuid';

import { iPortfolio } from './iPortfolio';

export interface iReview {
    id: string; //TODO needs UUID
    body: string | null;
    portfolio: iPortfolio;
    created: Date;

}
