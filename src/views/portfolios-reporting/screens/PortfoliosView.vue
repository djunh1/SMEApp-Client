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

    <create-portfolio-modal v-if="isCreateModalVisible" @close-modal="closeModal()"></create-portfolio-modal>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Portfolio Name</th>
                    <th>Type</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in portfolios" :key="i">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.portfolio_type }}</td>
                    <td class="table-actions"> 
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

import { loadPortfolios } from '@/api/portfolios';
import { defineComponent, onMounted, ref } from 'vue';
import CreatePortfolioModal from '../modals/CreatePortfolioModal.vue';

import Edit_Icon from '@/assets/icons/Edit_Icon.vue';
import Trash_Icon from '@/assets/icons/Trash_Icon.vue';
import Plus_Icon from '@/assets/icons/Plus_Icon.vue';


export default defineComponent ({

    components: {
        Edit_Icon,
        Plus_Icon,
        Trash_Icon,
        CreatePortfolioModal
    },

    setup () {
        const portfolios = ref()

        const isCreateModalVisible = ref(false)

        const openCreateModal = () => {
            isCreateModalVisible.value = true
        }

        const closeModal = () => {
            isCreateModalVisible.value = false
        }

        const getPortfolios = async () => {
            portfolios.value = await loadPortfolios();
        }

        onMounted( () => {
            getPortfolios();
        })

        return {
            portfolios,
            isCreateModalVisible,
            openCreateModal,
            closeModal

        }

    }
})
</script>
<style lang="">
    
</style>