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

      <select v-model="portfolioType">
        <option v-for="type in portfolioTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <div class="footer">
        <div class="content">
          <button @click="closeModal()" class="cancel">Cancel</button>
          <button :disabled="btnDisabled" class="confirm" @click="handleUpdatePortfolio()">Update</button>
        </div>
      </div>

    </div>

  </modal>

</template>


<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import Modal from '@/components/common/Modal.vue';
import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { iPortfolio } from '@/models/iPortfolio';


export default defineComponent({
  components: {
    Close_Icon,
    Modal
  },
  props: {
    portfolio: {
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

    const portfolio = ref(props.portfolio)

    const portfolioName = ref(portfolio.value.name)
    const description = ref(portfolio.value.description)
    const portfolioType = ref(portfolio.value.portfolio_type)
    const portfolioTypes = ref(['Long Term', 'Swing', 'Variable', 'Day Trading']);

    const closeModal = () => {
      context.emit('close-modal');
    }

    const editPortfolio = (editedPortfolio: Partial<iPortfolio>) => {
      context.emit('handle-edit', editedPortfolio);
    }

    watch(

      () => [portfolioName.value, description.value, portfolioType.value],
      () => {
        if ((portfolioName.value !== ''
          && description.value !== ''
          && portfolioType.value !== '')
          &&
          (portfolioName.value !== portfolio.value.name
            || description.value !== portfolio.value.description
            || portfolioType.value !== portfolio.value.portfolio_type)
        ) {
          btnDisabled.value = false;
        }
        else {
          btnDisabled.value = true;
        }
      },
    );

    const handleUpdatePortfolio = () => {

      let editedPortfolio: Partial<iPortfolio> = {
        name: portfolioName.value,
        description: description.value,
        portfolioType: portfolioType.value
      }
      editPortfolio(editedPortfolio)
    }
    return {
      btnDisabled,
      portfolioName,
      description,
      portfolioType,
      portfolioTypes,

      closeModal,
      handleUpdatePortfolio

    }
  }
});

</script>