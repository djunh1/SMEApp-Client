<template >
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

        <input type="text" v-model="portfolioId"></input>

        <div class="footer">
            <div class="content">
                <button @click="closeModal()">Cancel</button>
                <button @click="addNewRecord()">Add Ticker</button>
            </div>
        </div>
    </div>

  </modal>
</template>

<script lang="ts">

import Modal from "@/components/common/Modal.vue";
import Close_Icon from "@/assets/icons/Close_Icon.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {
    Modal,
    Close_Icon
},

emits: ["close-modal"],

setup(_, context) {
    const stockTicker = ref('eg. TSLA');
    const portfolioId = ref('')

    const addNewRecord = () => {
        closeModal();
    }

    const closeModal = () => {
        context.emit('close-modal');
    }

    return {
        portfolioId,
        stockTicker,
        addNewRecord,
        closeModal
    };
  },

});

</script>