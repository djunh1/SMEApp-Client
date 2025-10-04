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

      <input type="text" v-model="portfolioName" @keyup="validatePortfolioName"></input>
      <error-message v-if="!portfolioNameValid" :message="'portfolio name must be longer'"></error-message>

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

      <select v-model="categoryId">
        <option value="">Select portfolio type</option>
        <option v-for="category in categories" 
                :key="category.id" 
                :value="category.id">
                {{ category.name }}
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

import { useStore } from "vuex";
import { loadCategories } from "@/api/common/categories";

import ErrorMessage from '@/components/common/ErrorMessage.vue';

export default defineComponent({
  components: {
    Modal,
    Close_Icon,
    ErrorMessage
  },

  emits: ["close-modal"],

  setup(_, context) {

    const buttenEnabled = ref(false)
    const portfolioName = ref();
    const description = ref();
    const categoryId = ref('');

    // Foreign keys
    const categories = ref()

    // Error msg
    const portfolioNameValid = ref(true)

    const store = useStore();
    watch(() => [portfolioName.value,
    description.value,
    categoryId.value],
      () => {
        if (portfolioName.value === ''
          || description.value === ''
          || categoryId.value === '') {
          buttenEnabled.value = false
        } else {
          buttenEnabled.value = true
        }
      }
    )

     const getCategories = async () => {
            categories.value = await loadCategories();
      };

    const closeModal = () => {
      context.emit('close-modal');
    }

    const validatePortfolioName = () => {
      if(portfolioName.value.length < 5){
        portfolioNameValid.value = false;
      } else {
        portfolioNameValid.value = true;
      }
    }

    const addNewRecord = () => {
      let newPortfolioRecord: Partial<iPortfolio> = {};

      newPortfolioRecord.name = portfolioName.value;
      newPortfolioRecord.description = description.value;
      newPortfolioRecord.categoryId = categoryId.value;

      addNewPortfolio(newPortfolioRecord).then((responseObject) => {
        store.dispatch('portfolioManagement/postPortfolio', { responseObject })
        closeModal();

      }).catch(err => {
        console.log("error creating the portfolio", err)
      })
    }

    onBeforeMount(() => {
            getCategories();

        })



    return {
      buttenEnabled,
      portfolioName,
      description,
      categories,
      categoryId,

      addNewRecord,
      closeModal,

      validatePortfolioName,
      portfolioNameValid
    };
  },
});
</script>
