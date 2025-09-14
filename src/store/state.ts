import { iStock } from "@/models/iStock";
import { GlobalState } from "./types"
import { iPortfolio } from "@/models/iPortfolio";

const state = (): GlobalState => {
    return {
        portfolios: [],
        portfolioDetails: {} as iPortfolio,
        stocks: [],
        stockDetails: {} as iStock
    }
}

export default state;