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
                <option value="" disabled selected>All Portfolios (eventually users portfolios)</option>
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
            <button id="refresh" class="filters_button"
            @click="refreshList">Refresh</button>
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
                    <th>Name</th>
                    <th>About</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in allPortfolios" :key="i" @click="openDetails(item)">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.category?.name ?? 'None' }}</td>
                    <td class="table-actions">
                        <span>
                            <Edit_Icon @click.stop @click="openEditModal(item.id)" class="table_icon" />
                        </span>
                        <span>
                            <Trash_Icon @click.stop @click="openDeleteModal(item.id)" class="table_icon__left" />
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">

import { loadPortfolios, editRecordInPortfolios } from '@/api/portfolios/portfolios';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';
import CreatePortfolioModal from '../modals/CreatePortfolioModal.vue';
import EditPortfolioModal from '../modals/EditPortfolioModal.vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';
import { deleteRecordInPortfolios } from '@/api/portfolios/portfolios';

// State mgmt

import { useStore } from 'vuex';

// To add links to individual portfolio

import router from '@/router';
import { iPortfolio } from '@/models/iPortfolio';
import { loadCategories, loadCategoriesUnPaged } from '@/api/common/categories';
import { extractValues, extractIds } from '@/composables/utils';

export default defineComponent({

    components: {
        Edit_Icon,
        Plus_Icon,
        Trash_Icon,
        EditPortfolioModal,
        CreatePortfolioModal,
        ConfirmDeleteModal
    },

    setup() {
        const store = useStore();

        // For deletion
        const ENTIRY_TYPE = 'portfolio';
        const entityId = ref();
        const portfolioIdToDelete = ref('');

        const isCreateModalVisible = ref(false);
        const isEditModalVisible = ref(false);
        const isDeleteModalVisible = ref(false);

        //Searching

        const search = ref ('');

        //Still a search in the back end.  no filtering for portfolios yet
        const categories = ref('');
        const filteredCategory = ref('');

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
            updateList();
        }

        const refreshList = () => {
            filteredCategory.value = '';
            search.value = '';
            updateList();
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

            return Promise.allSettled([
                store.dispatch('portfolioManagement/setPortfolios', {
                    filteredCategory: filteredCategory.value,
                    search: search.value
                })
            ])
        }

        const closeModal = () => {
            isCreateModalVisible.value = false;
            isEditModalVisible.value = false;
            isDeleteModalVisible.value = false;
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
            entityId,
            ENTIRY_TYPE,
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
            updateList

        }

    }
})
</script>