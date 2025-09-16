<template>
    <modal @close="closeModal">
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Edit {{ stock.ticker_name }}'s portfolio'</span>
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>

            <label>
                <strong>
                    <small>
                        Ticker symbol
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="text" v-model="tickerName">



            <select v-model="portfolioIdtoUpdate">
                <option value="" disabled selected>{{ presentPortfolio.name }}</option>
                <option v-for="portfolio in portfolios" :key="portfolio.id" :value="portfolio.id">
                    {{ portfolio.name }}
                </option>
            </select>

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">Cancel</button>
                    <button :disabled="btnDisabled" class="confirm" @click="handleUpdateStock(); closeModal();">Update
                        stock's portfolio</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">

import Modal from "@/components/common/Modal.vue";
import Close_Icon from "@/assets/icons/Close_Icon.vue";
import { defineComponent, onBeforeMount, ref, watch, reactive } from "vue";
import { loadPortfolios } from "@/api/portfolios/portfolios";
import { iStock } from "@/models/iStock";

export default defineComponent({
    components: {
        Modal,
        Close_Icon
    },
    props: {
        stock: {
            type: Object,
            required: true
        }
    },
    emits: [
        'close-modal',
        'handle-edit'
    ],

    setup(props, context) {

        const btnDisabled = ref(true)
        const stock = ref(props.stock)
        const portfolios = ref()

        const presentPortfolio = reactive({ ...stock.value.portfolio })
        const tickerName = ref(stock.value.ticker_name)

        const portfolioIdtoUpdate = ref('')

        const closeModal = () => {
            context.emit('close-modal');
        }

        const editStock = (editedStock: Partial<iStock>) => {
            context.emit('handle-edit', editedStock);
        }

        const getPortfolios = async () => {
            portfolios.value = await loadPortfolios();

        }

        watch(

            () => [portfolioIdtoUpdate.value, tickerName.value],
            () => {
                if ((presentPortfolio.id !== portfolioIdtoUpdate.value) && tickerName.value !== '') {
                    btnDisabled.value = false;
                }
                else
                    if (presentPortfolio.id === portfolioIdtoUpdate.value) {
                        btnDisabled.value = true;
                    }
            },
        );

        const handleUpdateStock = () => {
            let editedStock: Partial<iStock> = {
                tickerName: tickerName.value,
                portfolio: portfolioIdtoUpdate.value === '' ? presentPortfolio.id : portfolios.value.find((x: any) => x.id === portfolioIdtoUpdate.value)
            }
            editStock(editedStock)
        }

        onBeforeMount(() => {
            getPortfolios()
        })

        return {
            btnDisabled,
            portfolios,
            presentPortfolio,
            portfolioIdtoUpdate,

            closeModal,
            handleUpdateStock,
            tickerName
        }

    }
});

</script>