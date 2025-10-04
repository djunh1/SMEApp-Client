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

    <edit-stock-modal v-if="isEditModalVisible" @close-modal="closeModal" :stock="stockObjToUpdate"
        @handle-edit="handleEdit"></edit-stock-modal>


    <confirm-delete-modal v-if="isDeleteModalVisible" :entity-type="ENTIRY_TYPE" :entity-id="entityId"
        @close-modal="closeModal" @handle-delete="handleDelete">
    </confirm-delete-modal>


    <!-- Search and filtering-->

       <div class="filters">
        <div class="filter-wrapper">
            <p>Portfolio Name</p>
            <select name="" id="">
                <option value="" disabled selected>All Portfolios (eventually users portfolios)</option>
            </select>
        </div>

        <div class="filter-wrapper">
            <p>Search</p>
            <input v-model="search"
                   type="text" 
                   placeholder="Search for portfolio name"
                   @keyup.enter="filterList"></input>
        </div>

         <div class="filter-wrapper">
            <p>Filter</p>
            <button id="filter" class="filters_button" @click="filterList">Filter</button>
        </div>

        <div class="filter-wrapper">
            <p>Refresh</p>
            <button id="refresh" class="filters_button"
            @click="refreshList">Clear Filters</button>
        </div>
         
    </div>

    <div>
        <table>
            <thead>
                <tr>
                    <th @click="setSortingBy(ORDER_BY_CREATED_AT)">Added on <Sorting_Icon class="sorting-icon"></Sorting_Icon></th>
                    <th @click=setSortingBy(ORDER_BY_TICKER)>Ticker 
                        <Sorting_Icon class="sorting-icon" :class="orderBy === ORDER_BY_TICKER ? 'active-sorting' : ''" />
                    </th>
                    <th>Company Name</th>
                    <th>Sector</th>
                    <th>Portfolio name</th>
                    <th>Action Jackson</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in allStocks" :key="i" @click="openDetails(item)">
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.ticker_name }}</td>
                    <td>{{ item.company_name }}</td>
                    <td>{{ item.sector }}</td>
                    
                    <td>{{ item.portfolio.name }}</td>
                    <td class="table-actions">
                        <span class="action-icon-wrapper">
                            <Edit_Icon @click.stop @click="openEditModal(item.id)" class="action-icon" />
                            <span class="tooltiptext">Edit</span>
                        </span>
                        <span class="action-icon-wrapper">
                            <Trash_Icon @click.stop @click="openDeleteModal(item.id)" class="action-icon" />
                            <span class="tooltiptext">Delete</span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

                <pagination v-if="count > 0" :current-page="currentPage" :per-page="perPage" :number-of-pages="numberOfPages"
                :count="count" @update-page="updatePage" @update-table-size="updateTableSize"></pagination>
    </div>
</template>


<script lang="ts">
import formatDate from '@/composables/utils';
import { editRecordInStocks, loadStocks } from '@/api/portfolios/stocks';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';
import CreateStockModal from '../modals/CreateStockModal.vue';
import EditStockModal from '../modals/EditStockModal.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { deleteRecordInStocks } from '@/api/portfolios/stocks';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';

import { useStore } from 'vuex';
import { iStock } from '@/models/iStock';
import router from '@/router';

// Pagination
import Pagination from '@/components/common/Pagination.vue';

export default defineComponent({

    components: {
        Edit_Icon,
        Plus_Icon,
        Sorting_Icon,
        Trash_Icon,
        CreateStockModal,
        EditStockModal,
        ConfirmDeleteModal,
        Pagination
    },

    setup() {

        const ORDER_BY_CREATED_AT = 'created_at';
        const ORDER_BY_TICKER = 'ticker_name'
        const store = useStore();

        const ENTIRY_TYPE = 'stock'
        const entityId = ref();
        const stockIdToDelete = ref('')

        const isCreateModalVisible = ref(false)
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false);


        const stockIdToUpdate = ref()
        const stockObjToUpdate = ref()

        // Searching
        const search = ref('')

        //Ordering

        const orderBy = ref('created_at');

        // Pagination
        const currentPage = ref(1);
        const perPage = ref(15);

        const numberOfPages = computed(() => {
            const data = store.getters['paginationManagement/getNumberOfPages']
            return Number(data);
        })

        const count = computed(() => {
            const data = store.getters['paginationManagement/getCount']
            return Number(data);
        })

        const updatePage = (page: any) => {
            currentPage.value = page;
            updateList();
        }

        const updateTableSize = (pageSize: any) => {
            perPage.value = pageSize.value;
            currentPage.value = 1;
            updateList();
        }



        const allStocks = computed(() => {
            let data = store.getters['stockManagement/getStocks']
            if (!data) return
            return data
        })

        const openCreateModal = () => {
            isCreateModalVisible.value = true
        }

        const openEditModal = (id: string) => {
            stockIdToUpdate.value = id;
            stockObjToUpdate.value = toRaw(allStocks.value).find((x: any) => x.id === id);
            isEditModalVisible.value = true;
        }

        const openDeleteModal = (id: string) => {
            entityId.value = id;
            isDeleteModalVisible.value = true;
            stockIdToDelete.value = id;
        }

        const closeModal = () => {
            isCreateModalVisible.value = false
            isEditModalVisible.value = false;
            isDeleteModalVisible.value = false;
        }

        //Searching and filtering

        const filterList = () => {
            currentPage.value = 1
            updateList();
        }

        const refreshList = () => {
            window.location.reload();
        }

        // Ordering

        const setSortingBy = (ordering: string) => {
            orderBy.value = ordering;
            updateList();
        }


        const updateList = async () => {

            let data: any = await  Promise.allSettled([
                store.dispatch('stockManagement/setStocks', {
                    search: search.value,
                    per_page: perPage.value,
                    page: currentPage.value,
                    order_by: orderBy.value
                })
            ]);

            let pageInfo = data[0].value;

            await store.dispatch('paginationManagement/setNumberOfPages', pageInfo.number_of_pages);
            await store.dispatch('paginationManagement/setCount', pageInfo.count);

            return data


        }

        const handleEdit = (editedStock: any) => {
            isEditModalVisible.value = false;
            let id = stockIdToUpdate.value;

            editRecordInStocks(stockIdToUpdate.value, editedStock)
                .then(() => {
                    closeModal();

                    store.dispatch('stockManagement/updateStock',
                        { editedStock, id })

                    stockIdToUpdate.value = '';
                })
        }

        const handleDelete = () => {
            isDeleteModalVisible.value = false;
            deleteRecordInStocks(stockIdToDelete.value)
                .then(() => {
                    return store.dispatch('stockManagement/deleteStock', stockIdToDelete.value)
                }).catch((error) => {
                    console.log(error);
                })
        }

        const openDetails = (item: iStock) => {
            let id = item.id;
            setDataForDetailsPage(item);
            router.push({
                name: 'stock-details',
                params: {
                    id
                }
            });
        }

        const setDataForDetailsPage = (item: iStock) => {
            return store.dispatch('stockManagement/setStockDetails', {
                ...item
            })
        }

        onMounted(() => {
            updateList();
        })


        return {
            ENTIRY_TYPE,
            ORDER_BY_CREATED_AT,
            ORDER_BY_TICKER,
            currentPage,
            numberOfPages,
            count,
            perPage,


            entityId,
    
            allStocks,
            isCreateModalVisible,
            isDeleteModalVisible,
            isEditModalVisible,
            refreshList,
            filterList,
            formatDate,
            openCreateModal,
            handleDelete,
            handleEdit,
            closeModal,
            openDeleteModal,
            openEditModal,

            setSortingBy,
            orderBy,

            updatePage,
            updateTableSize,

            search,
            stockObjToUpdate,

            openDetails
        }

    }





})

</script>
