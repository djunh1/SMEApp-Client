import { GlobalState } from "./types"
import { iPortfolio } from "@/models/iPortfolio";

const state = (): GlobalState => {
    return {
        portfolios: [],
        portfolioDetails: {} as iPortfolio
    }
}

export default state;