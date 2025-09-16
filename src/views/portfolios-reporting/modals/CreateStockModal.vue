<template>
  <modal @close="closeModal">
    <div class="modal-content">
      <div class="header">
        <div class="content">
          <span class="title">Input Stock ticker</span>
          <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
        </div>
      </div>


      <label>
        <strong>
          <small> Enter Ticker <span class="validation-mark">*</span></small>
        </strong>
      </label>

      <input type="text" v-model="stockTicker"></input>


      <label>
        <strong>
          <small> Portfolio ID <span class="validation-mark">*</span></small>
        </strong>
      </label>

      <select v-model="portfolioId">
        <option value="">Select your portfolio</option>
        <option v-for="portfolio in portfolios" :key="portfolio.id" :value="portfolio.id">
          {{ portfolio.name }} ({{ portfolio.portfolio_type }})
        </option>
      </select>

      <div class="footer">
        <div class="content">
          <button class="cancel" @click="closeModal()">Cancel</button>
          <button :disabled="!buttenEnabled" class="confirm" @click="addNewRecord()">Add Ticker</button>
        </div>
      </div>
    </div>

  </modal>
</template>

<script lang="ts">

import Modal from "@/components/common/Modal.vue";
import Close_Icon from "@/assets/icons/Close_Icon.vue";
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { loadPortfolios } from "@/api/portfolios/portfolios";
import { iStock } from "@/models/iStock";
import { addNewStock } from "@/api/portfolios/stocks";

import { useStore } from "vuex";

export default defineComponent({
  components: {
    Modal,
    Close_Icon
  },

  emits: ['close-modal'],

  setup(_, context) {
    const stockTicker = ref('');
    const portfolioId = ref('')

    const portfolios = ref();
    const buttenEnabled = ref();

    const store = useStore();

    // TODO scope this to the users portfolio only..
    const getPortfolios = async () => {
      portfolios.value = await loadPortfolios();
    }

    watch(() => [stockTicker.value, portfolioId.value],
      () => {
        if (stockTicker.value === '' || portfolioId.value === '') {
          buttenEnabled.value = false
        } else {
          buttenEnabled.value = true
        }

      }
    )

    const addNewRecord = () => {
      let newStockRecord: Partial<iStock> = {};
      newStockRecord.portfolioId = portfolioId.value;
      newStockRecord.tickerName = stockTicker.value;

      addNewStock(newStockRecord).then((responseObject) => {
        store.dispatch('stockManagement/postStock', { responseObject })
        closeModal();
      }).catch(err => {
        console.log("error creating the stock, ", err);
      })
    }

    const closeModal = () => {
      context.emit('close-modal');
    }

    onBeforeMount(() => {
      getPortfolios();
    })

    return {
      buttenEnabled,
      portfolioId,
      stockTicker,

      portfolios,
      addNewRecord,
      closeModal
    };
  },

});

</script>