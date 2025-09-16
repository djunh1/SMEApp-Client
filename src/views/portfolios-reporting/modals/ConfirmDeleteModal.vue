<template>
  <modal @close="closeModal">
    <div class="modal-content">
      <div class="header">
        <div class="content">
          <span class="title">Portfolio Properties</span>
          <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
        </div>
      </div>
      <div>
        <p>
          Confirm delete of {{ entityType }} with an ID of
          <strong>
            {{ entityId }}
          </strong>
        </p>
      </div>

      <div class="footer">
        <div class="content">
          <button @click="closeModal()" class="cancel">Cancel</button>
          <button class="confirm" @click="handleDelete()">Delete</button>
        </div>
      </div>
    </div>
  </modal>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';

import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';

export default defineComponent({
  components: {
    Close_Icon,
    Modal
  },
  props: {
    entityType: {
      type: String
    },
    entityId: {
      type: Number
    }
  },
  emits: ['close-modal', 'handle-delete'],

  setup(props, context) {

    const entityType = ref(props.entityType);
    const entityId = ref(props.entityId);

    const closeModal = () => {
      context.emit('close-modal');
    }

    const handleDelete = () => {
      context.emit('handle-delete');
    }
    return {
      entityType,
      entityId,
      closeModal,
      handleDelete
    }
  },
});

</script>