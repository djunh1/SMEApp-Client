import { iStock } from "@/models/iStock";
import { GlobalState } from "./types"
import { iPortfolio } from "@/models/iPortfolio";

const state = (): GlobalState => {
    return {
        portfolios: [],
        portfolioDetails: {} as iPortfolio,
        stocks: [],
        stockDetails: {} as iStock,
        pages: 0,
        pageNumber: 1,
        count: 0,
        numberOfPages: 0,
        users: [],
    }
}

export default state;