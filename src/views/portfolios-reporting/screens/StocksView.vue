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

    <create-stock-modal v-if="isCreateModalVisible" 
                         @close-modal="closeModal()"
                         @update-list="updateList()"></create-stock-modal>

    <edit-stock-modal v-if="isEditModalVisible"
                      @close-modal="closeModal"
                      :stock="stockObjToUpdate"
                      @handle-edit="handleEdit"></edit-stock-modal>
    <div>    
        <table>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Ticker </th>
                    <th>Sector</th>
                    <th>Added on</th>
                    <th>Portfolio name</th>
                    <th>Portfolio type</th>
                    <th>Action Jackson</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in allStocks" :key="i" @click="openDetails(item)">
                    <td>{{ item.company_name }}</td>
                    <td>{{ item.ticker_name }}</td>
                    <td>{{ item.sector }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.portfolio.name }}</td>
                    <td class="table-actions">{{ item.portfolio.portfolio_type }}</td>
                    <td> 
                        <span>
                            <Edit_Icon @click.stop @click="openEditModal(item.id)" class="table_icon__left" />
                        </span>
                        <span>
                            <Trash_Icon @click.stop class="table_icon__left" />
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang="ts">
import formatDate from '@/composables/utils';
import { editRecordInStocks, loadStocks } from '@/api/portfolios/stocks';
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue';
import CreateStockModal from '../modals/CreateStockModal.vue';
import EditStockModal from '../modals/EditStockModal.vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';

import { useStore } from 'vuex';
import { iStock } from '@/models/iStock';
import router from '@/router';

export default defineComponent ({

    components: {
        Edit_Icon,
        Plus_Icon,
        Trash_Icon,
        CreateStockModal,
        EditStockModal
    },

    setup () {
        const store = useStore();

        const isCreateModalVisible = ref(false)
        const isEditModalVisible = ref(false);
        const stockIdToUpdate = ref()
        const stockObjToUpdate = ref()
        const allStocks = computed( () => {
            let data = store.getters['stockManagement/getStocks']
            if(!data) return
            return data
        })

        const openCreateModal = () => {
            isCreateModalVisible.value = true
        }

        const openEditModal = (id: string) => {
            stockIdToUpdate.value = id;
            stockObjToUpdate.value = toRaw(allStocks.value).find((x:any ) => x.id === id);
            isEditModalVisible.value = true;
        }

        const closeModal = () => {
            isCreateModalVisible.value = false
            isEditModalVisible.value = false;
        }

       
        const updateList = async () => {
            return Promise.allSettled([
                store.dispatch('stockManagement/setStocks', {})
            ])
        }

        const handleEdit = (editedStock: any) => {
            isEditModalVisible.value = false;
            let id = stockIdToUpdate.value;
            
            console.log("the stock to edit -->", editedStock)
            editRecordInStocks(stockIdToUpdate.value, editedStock)
            .then( () => {
                closeModal();
                updateList();
                stockIdToUpdate.value = '';
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
            allStocks,
            isCreateModalVisible,
            isEditModalVisible,
            formatDate,
            openCreateModal,
            handleEdit,
            closeModal,
            openEditModal,
            updateList,
            stockObjToUpdate,

            openDetails
        }

    }

    

    
    
})

</script>

