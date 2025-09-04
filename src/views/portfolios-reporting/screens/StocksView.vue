<template>
    <header>
        <span class="title">
            Home / Portfolios / All Stocks
        </span>
        <button class="button is-primary is-on-header" @click="openCreateModal()">
            <Plus_Icon class="nav_icon"></Plus_Icon>
            Add Stock to portfolio
        </button>
    </header>

    <create-stock-modal v-if="isCreateModalVisible" @close-modal="closeModal()"></create-stock-modal>
    <div>    
        <table>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Ticker </th>
                    <th>Sector</th>
                    <th>Added on</th>
                    <th>Portfolio type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in portfolioStocks" :key="i">
                    <td>{{ item.company_name }}</td>
                    <td>{{ item.ticker_name }}</td>
                    <td>{{ item.sector }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td class="table-actions">{{ item.portfolio.portfolio_type }}</td>
                    <td> 
                        <span>
                            <Edit_Icon class="table_icon__left" />
                        </span>
                        <span>
                            <Trash_Icon class="table_icon__left" />
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang="ts">
import formatDate from '@/composables/utils';
import { loadPortfolioStocks } from '@/api/portfolios';
import { defineComponent, onMounted, ref } from 'vue';
import CreateStockModal from '../modals/CreateStockModal.vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

export default defineComponent ({

    components: {
        Edit_Icon,
        Plus_Icon,
        Trash_Icon,
        CreateStockModal
    },

    setup () {
        const isCreateModalVisible = ref(false)

        const openCreateModal = () => {
            isCreateModalVisible.value = true
        }

        const closeModal = () => {
            isCreateModalVisible.value = false
        }

        const portfolioStocks = ref()

        const getAllPortfolioStocks = async () => {
            portfolioStocks.value = await loadPortfolioStocks();
        }

        onMounted(() => {
            getAllPortfolioStocks();
        })

        return {
            portfolioStocks,
            isCreateModalVisible,
            formatDate,
            openCreateModal,
            closeModal
        }

    }

    

    
    
})

</script>

