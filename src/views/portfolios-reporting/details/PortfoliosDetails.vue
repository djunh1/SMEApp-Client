<template>
    <header>
        <div class="title">
            Portfolios / Portfolio / Details
        </div>

        <button class="button is-cancel" style="margin-right: 2.8rem;" @click="$router.go(-1)">
            <Back_Icon class="nav_icon" />
            Go back
        </button>
    </header>

    <div class="details-body">

        <div class="details-content">
            <h4 class="details-label">Portfolio Name:</h4>
            <p class="details-input-desc">{{ name }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Portfolio type:</h4>
            <p class="details-input-desc">{{ categoryInfo?.name ?? 'None' }}</p>
            <hr>
        </div>


        <div class="details-content">
            <h4 class="details-label">About:</h4>
            <p class="details-input-desc">{{ description }}</p>
            <hr>
        </div>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'

import { getPortfolioDetails } from '@/api/portfolios/portfolios';

import Back_Icon from '@/assets/icons/Back_Icon.vue';
import formatDate from '@/composables/utils';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        Back_Icon
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        // todo add user here
        // const customer = ref('')
        const createdAt = ref('')
        const name = ref('')
        const description = ref('')
        const categoryInfo = ref('')

        const passedID = computed(() => {
            return route.params.id ? route.params.id as string : ''
        });

        const getDetails = async () => {

            // This makes API call each time.  Instead use the state.
            //let details: any = await getPortfolioDetails(passedID.value);
            let details = store.getters['portfolioManagement/getPortfolioDetails']

            //Refresh
            if(!details){
                details = await getPortfolioDetails(passedID.value);
            }
            
            name.value = details.name
            description.value = details.description;
            createdAt.value = formatDate(details.created_at);
            categoryInfo.value =  details.category; 
        }

        onBeforeMount(() => {
            getDetails()
        })
        
        return {
            createdAt,
            name,
            description,
            categoryInfo
        }
    }
})
</script>

