<template>
  <div class="modal" @keyup.esc="$emit('close')">
    <div class="modal-background" @click="$emit('close')"></div>
    <slot class="modal-body"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    // Sends event to parent from child
    emits: ['close'],
    setup(){}
})
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
}
</style>
