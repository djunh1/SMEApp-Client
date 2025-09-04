<template >
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
            <small> Portoflio about<span class="validation-mark">*</span></small>
        </strong>
        </label>

        <input type="text" v-model="description"></input>


        <label>
        <strong>
            <small> portfolio type<span class="validation-mark">*</span></small>
        </strong>
        </label>

        <select>
        <option value="" disbaled select>Select type</option>
        </select>

        <div class="footer">
            <div class="content">
                <button @click="closeModal()">Cancel</button>
                <button @click="addNewRecord()">Add Portolfio</button>
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
    Close_Icon,
  },

  emits: ["close-modal"],

  setup(_, context) {
    // TODO update once user and all fields are final
   // const stockId = ref(false);
    //const userId? when the user object created = ref(false)
    const portfolioName = ref(false);
    const description = ref(false);
    const portfolio_type = ref(false);
    //const tags? = ref(false)

    const addNewRecord = () => {
        closeModal();
    }

    const closeModal = () => {
        context.emit('close-modal');
    }
    return {
      //  stockId,
        portfolioName,
        description,
        portfolio_type,

        addNewRecord,
        closeModal
    };
  },
});
</script>
