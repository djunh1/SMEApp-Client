<template>
  <modal @close="closeModal">
    <div class="modal-content">
      <div class="header">
        <div class="content">
          <span class="title">Portfolio Properties</span>
          <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
        </div>
      </div>
      <label>
        <strong>
          <small>Portfolio Name <span class="validation-mark">*</span></small>
        </strong>
      </label>

      <input type="text" v-model="portfolioName"></input>

      <label>
        <strong>
          <small> Portoflio description<span class="validation-mark">*</span></small>
        </strong>
      </label>

      <input type="text" v-model="description"></input>

      <label>
        <strong>
          <small> Portfolio type<span class="validation-mark">*</span></small>
        </strong>
      </label>

      <select>
        <option value="">Select portfolio type</option>
        <option v-for="type in portfolioTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <div class="footer">
        <div class="content">
          <button @click="closeModal()" class="cancel">Cancel</button>
          <button :disabled="!buttenEnabled" class="confirm" @click="addNewRecord()">Create</button>
        </div>
      </div>
    </div>
  </modal>

</template>

<script lang="ts">

import Modal from "@/components/common/Modal.vue";
import Close_Icon from "@/assets/icons/Close_Icon.vue";
import { defineComponent, onBeforeMount, ref, watch } from "vue";

import { iPortfolio } from "@/models/iPortfolio";
import { addNewPortfolio } from "@/api/portfolios/portfolios";

export default defineComponent({
  components: {
    Modal,
    Close_Icon,
  },

  emits: ["close-modal", "update-list"],

  setup(_, context) {

    const buttenEnabled = ref(false)
    const portfolioName = ref();
    const description = ref();
    const portfolio_type = ref();
    const portfolioTypes = ref(['Long Term', 'Swing', 'Variable', 'Day Trading']);

    watch(() => [portfolioName.value,
    description.value,
    portfolio_type.value],
      () => {
        if (portfolioName.value === ''
          || description.value === ''
          || portfolio_type.value === '') {
          buttenEnabled.value = false
        } else {
          buttenEnabled.value = true
        }
      }
    )

    const closeModal = () => {
      context.emit('close-modal');
    }

    const updateList = () => {
      context.emit('update-list')
    }

    const addNewRecord = () => {
      let newPortfolioRecord: Partial<iPortfolio> = {};

      newPortfolioRecord.name = portfolioName.value;
      newPortfolioRecord.description = description.value;
      newPortfolioRecord.portfolioType = portfolio_type.value;

      addNewPortfolio(newPortfolioRecord).then(() => {
        closeModal();
        updateList();
      })
    }



    return {
      buttenEnabled,
      portfolioName,
      description,
      portfolio_type,
      portfolioTypes,

      addNewRecord,
      closeModal
    };
  },
});
</script>
