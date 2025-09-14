import { iPortfolio } from "@/models/iPortfolio";
import { iStock } from "@/models/iStock";

export interface GlobalState {
    portfolios: any[],
    portfolioDetails: iPortfolio,
    stocks: any[],
    stockDetails: iStock
}