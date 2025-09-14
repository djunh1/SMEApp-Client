<template>
    <header>
        <div class="title">
            Portfolios / Stock / Details
        </div>

        <button class="button is-cancel" style="margin-right: 2.8rem;" @click="$router.go(-1)">
            <Back_Icon class="nav_icon" />
            Go back
        </button>
    </header>

    <div class="details-body">

        <div class="details-content">
            <h4 class="details-label">Ticker:</h4>
            <p class="details-input-desc">{{ ticker }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Sector:</h4>
            <p class="details-input-desc">{{ sector }}</p>
            <hr>
        </div>


        <div class="details-content">
            <h4 class="details-label">Company Name:</h4>
            <p class="details-input-desc">{{ companyName }}</p>
            <hr>
        </div>

        <div class="details-content">
            <h4 class="details-label">Belongs to Portfolio:</h4>
            <p class="details-input-desc">{{ portfolioInfo }}</p>
            <hr>
        </div>

    </div>
</template>


<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'
import Back_Icon from '@/assets/icons/Back_Icon.vue';
import { useStore } from 'vuex';
import { getStockDetails } from '@/api/portfolios/stocks';

export default defineComponent({
    components: {
        Back_Icon
    },
    props: {},
    emits: [],

    setup(props, context){
        const route = useRoute();
        const store = useStore();

        const ticker = ref('')
        const sector = ref('')
        const companyName = ref ('')
        const portfolioInfo = ref('')

        const passedID = computed(() => {
            return route.params.id ? route.params.id as string : ''
        });

        const getDetails = async () => {
            let details = store.getters['stockManagement/getStockDetails']

            if(!details) {
                details = await getStockDetails(passedID.value)
            }

            ticker.value = details.ticker_name;
            sector.value = details.sector;
            companyName.value = details.company_name;
            portfolioInfo.value = details.portfolio.name;
        }


        onBeforeMount( () => {
            getDetails()
        })

        return {
            ticker,
            sector,
            companyName,
            portfolioInfo


        }
    }
});

</script>