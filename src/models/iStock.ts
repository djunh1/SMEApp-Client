import { v4 as uuidv4 } from 'uuid';

import { iPortfolio } from './iPortfolio';

export interface iStock {
    id: string; 
    portfolio: iPortfolio;
    tickerName: string;
    companyName: string | null;
    sector: string | null;
    createdAt: Date;
    updatedAt: Date;
    portfolioId: string
}