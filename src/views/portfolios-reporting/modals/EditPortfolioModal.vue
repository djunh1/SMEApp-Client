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
          <button :disabled="btnDisabled" class="confirm" @click="handleUpdatePortfolio()">Update</button>
        </div>
      </div>

    </div>

  </modal>

</template>


<script lang="ts">

import { defineComponent, onBeforeMount, ref, watch } from 'vue';
import Modal from '@/components/common/Modal.vue';
import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { iPortfolio } from '@/models/iPortfolio';
import { loadCategories } from '@/api/common/categories';


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
    //const category = ref(portfolio.value.category.name)
    const categoryId = ref('');
    
    // Foreign keys
    const categories = ref()

    const closeModal = () => {
      context.emit('close-modal');
    }

    const editPortfolio = (editedPortfolio: Partial<iPortfolio>) => {
      context.emit('handle-edit', editedPortfolio);
    }

    const getCategories = async () => {
            categories.value = await loadCategories();
      };

    watch(

      () => [portfolioName.value, description.value, categoryId.value],
      () => {
        if ((portfolioName.value !== ''
          && description.value !== ''
          && categoryId.value !== '')
          &&
          (portfolioName.value !== portfolio.value.name
            || description.value !== portfolio.value.description
            || categoryId.value !== portfolio.value.categoryId)
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
        categoryId: categoryId.value
      }
      editPortfolio(editedPortfolio)
    }

    onBeforeMount(() => {
          getCategories();

     })
    return {
      btnDisabled,
      portfolioName,
      description,
      categoryId,
      categories,


      closeModal,
      handleUpdatePortfolio

    }
  }
});

</script>