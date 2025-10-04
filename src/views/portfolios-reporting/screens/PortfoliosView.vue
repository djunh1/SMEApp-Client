<template>
    <header>
        <span class="title">
            Home / Portfolios
        </span>
        <button class="button is-primary is-on-header" @click="openCreateModal()">
            <Plus_Icon class="nav_icon"></Plus_Icon>
            New Portfolio
        </button>
    </header>

    <div class="filters">
        <div class="filter-wrapper">
            <p>Portfolio Name</p>
            <select name="" id="">
                <option value="" disabled selected>All Portfolios</option>
            </select>
        </div>
        <div class="filter-wrapper">
            <p>Portfolio Category: </p>
            <select v-model="search">
                <option value="" disabled selected>All categories</option>
                <option v-for="(cat, i) in categories" :key="i" :value="cat">
                    {{ cat }}</option>

            </select>
        </div>
        <!-- <div class="filter-wrapper">
            <p>Search</p>
            <input v-model="search"
                   type="text" 
                   placeholder="Search by name of by portfolio type"
                   @keyup.enter="filterList"></input>
        </div> -->

        <div class="filter-wrapper">
            <p>Filter</p>
            <button id="filter" class="filters_button" @click="filterList">Filter</button>
        </div>

        <div class="filter-wrapper">
            <p>Refresh</p>
            <button id="refresh" class="filters_button" @click="refreshList">Refresh</button>
        </div>

    </div>

    <create-portfolio-modal v-if="isCreateModalVisible" @close-modal="closeModal()"></create-portfolio-modal>

    <edit-portfolio-modal v-if="isEditModalVisible" @close-modal="closeModal" :portfolio="portfolioObjectToUpdate"
        @handle-edit="handleEdit"></edit-portfolio-modal>


    <confirm-delete-modal v-if="isDeleteModalVisible" :entity-type="ENTIRY_TYPE" :entity-id="entityId"
        @close-modal="closeModal" @handle-delete="handleDelete">

    </confirm-delete-modal>
    <div>
        <table>
            <thead>
                <tr>
                    <th @click="setSortingBy(ORDER_BY_NAME)">Name
                        <Sorting_Icon class="sorting-icon" :class="orderBy === ORDER_BY_NAME ? 'active-sorting' : ''" />


                    </th>
                    <th @click="setSortingBy(ORDER_BY_UPDATED_AT)">
                        Updated <Sorting_Icon class="sorting-icon"></Sorting_Icon>
                    </th>

                    <th @click=setSortingBy(ORDER_BY_NAME)>ID
                        <span class="action-icon-wrapper">

                            <Sorting_Icon class="sorting-icon"
                                :class="orderBy === ORDER_BY_NAME ? 'active-sorting' : ''" />
                            <span v-if="orderBy === ORDER_BY_UPDATED_AT" class="tooltiptext">Sort by name</span>
                        </span>
                    </th>
                    <th @click=setSortingBy(ORDER_BY_UPDATED_AT)>Order date
                        <span class="action-icon-wrapper">
                            <Sorting_Icon class="sorting-icon"
                                :class="orderBy === ORDER_BY_UPDATED_AT ? 'active-sorting' : ''" />
                            <span v-if="orderBy === ORDER_BY_NAME" class="tooltiptext">Sort by updated</span>
                        </span>
                    </th>

                    <th>About</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in allPortfolios" :key="i" @click="openDetails(item)">
                    <td> {{ item.name }}</td>
                    <td> {{ formatDate(item.updated_at) }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.category?.name ?? 'None' }}</td>
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

import { loadPortfolios, editRecordInPortfolios } from '@/api/portfolios/portfolios';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';
import CreatePortfolioModal from '../modals/CreatePortfolioModal.vue';
import EditPortfolioModal from '../modals/EditPortfolioModal.vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import Sorting_Icon from '@/assets/icons/Sorting_Icon.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { deleteRecordInPortfolios } from '@/api/portfolios/portfolios';

import Pagination from '@/components/common/Pagination.vue';

// State mgmt

import { useStore } from 'vuex';

// TODO - To add links to individual portfolio, or is it OK just to natigate to port
// from table?

import router from '@/router';
import { iPortfolio } from '@/models/iPortfolio';
import { loadCategories, loadCategoriesUnPaged } from '@/api/common/categories';
import { extractValues, extractIds } from '@/composables/utils';

export default defineComponent({

    components: {
        Edit_Icon,
        Plus_Icon,
        Sorting_Icon,
        Trash_Icon,
        EditPortfolioModal,
        CreatePortfolioModal,
        ConfirmDeleteModal,
        Pagination
    },

    setup() {

        const ORDER_BY_UPDATED_AT = 'updated_at';
        const ORDER_BY_NAME = 'name'

        const store = useStore();

        // For deletion
        const ENTIRY_TYPE = 'portfolio';
        const entityId = ref();
        const portfolioIdToDelete = ref('');

        const isCreateModalVisible = ref(false);
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false);

        //Ordering

        const orderBy = ref('updated_at');

        //Searching

        const search = ref('');

        //Still a search in the back end.  no filtering for portfolios yet
        const categories = ref('');
        const filteredCategory = ref('');

        // pagination

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


        const closeModal = () => {
            isCreateModalVisible.value = false;
            isEditModalVisible.value = false;
            isDeleteModalVisible.value = false;
        }

        const setSortingBy = (ordering: string) => {
            orderBy.value = ordering;
            updateList();
        }


        const openDetails = (item: iPortfolio) => {
            let id = item.id;
            setDataForDetailsPage(item);

            // Redirect
            router.push({
                name: 'portfolio-details',
                params: {
                    id
                }
            });
        }


        // Need portfolio itself and the id for update
        const portfolioIdToUpdate = ref('')
        const portfolioObjectToUpdate = ref();

        const allPortfolios = computed(() => {
            let data = store.getters['portfolioManagement/getPortfolios']
            if (!data) return
            return data;
        })

        const openCreateModal = () => {
            isCreateModalVisible.value = true
        }

        const openEditModal = (id: string) => {
            portfolioIdToUpdate.value = id;
            portfolioObjectToUpdate.value = toRaw(allPortfolios.value).find((x: any) => x.id === id);
            isEditModalVisible.value = true;
        }

        // Searching and filtering
        const filterList = () => {
            currentPage.value = 1
            updateList();
        }

        const refreshList = () => {
            window.location.reload();
        }



        const openDeleteModal = (id: string) => {
            entityId.value = id;
            isDeleteModalVisible.value = true;
            portfolioIdToDelete.value = id;
        }

        const getCategories = async () => {
            let data: any = await loadCategoriesUnPaged();
            categories.value = extractValues(data);

        }

        const updateList = async () => {

            let data: any = await Promise.allSettled([

                store.dispatch('portfolioManagement/setPortfolios', {
                    filteredCategory: filteredCategory.value,
                    search: search.value,
                    per_page: perPage.value,
                    page: currentPage.value,
                    order_by: orderBy.value
                }),
            ]);

            let paginationInfo = data[0].value

            await store.dispatch('paginationManagement/setNumberOfPages', paginationInfo.number_of_pages);
            await store.dispatch('paginationManagement/setCount', paginationInfo.count);

            return data
        }


        const handleEdit = (editedPortfolio: any) => {
            isEditModalVisible.value = false;
            let id = portfolioIdToUpdate.value;

            editRecordInPortfolios(portfolioIdToUpdate.value, editedPortfolio)
                .then(() => {
                    closeModal();
                    store.dispatch('portfolioManagement/updatePortfolio', { editedPortfolio, id })
                    portfolioIdToUpdate.value = '';
                })
        }

        const handleDelete = () => {
            isDeleteModalVisible.value = false;
            deleteRecordInPortfolios(portfolioIdToDelete.value).then(() => {
                return store.dispatch('portfolioManagement/deletePortfolio', portfolioIdToUpdate.value)
            }).catch((error) => {
                console.log(error);
            })

        }

        const setDataForDetailsPage = (item: iPortfolio) => {
            return store.dispatch('portfolioManagement/setPortfolioDetails', {
                ...item
            })
        }


        onMounted(() => {
            updateList();
            getCategories();
        })

        return {
            ENTIRY_TYPE,
            ORDER_BY_UPDATED_AT,
            ORDER_BY_NAME,

            entityId,
            portfolioIdToDelete,
            isDeleteModalVisible,

            filterList,
            handleEdit,
            handleDelete,
            allPortfolios,
            portfolioObjectToUpdate,
            isCreateModalVisible,
            isEditModalVisible,
            categories,
            filteredCategory,

            closeModal,
            openCreateModal,
            openEditModal,
            openDeleteModal,

            openDetails,
            search,
            refreshList,
            updateList,
            setSortingBy,

            updatePage,
            updateTableSize,

            orderBy,

            currentPage,
            count,
            numberOfPages,
            perPage,
            formatDate

        }

    }
})
</script>