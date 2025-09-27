import { iPortfolio } from "@/models/iPortfolio";
import { iStock } from "@/models/iStock";
import { IUser } from "@/models/iUser";

export interface GlobalState {
    portfolios: any[], //disables typescript
    portfolioDetails: iPortfolio,
    stocks: any[],
    stockDetails: iStock,
    pages: number,
    pageNumber: number,
    count: number,
    numberOfPages: number,
    users: IUser[]
}