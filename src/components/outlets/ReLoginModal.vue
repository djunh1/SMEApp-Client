<template>

</template>


<script lang="ts">
import { authenticate } from '@/api/admin/users';
import { hideOutlet } from '@/composables/outlets';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { save as saveToStore } from '@/localStorage';


export default defineComponent({
    components: {},
    props: {
        id: {
            type: String,
            required: true
        },
        loginInfo: {
            type: Object,
            required: true
        },
        onSuccess: {
            type: Function,
            required: true
        },
        onTimeout: {
            type: Function,
            required: true
        },
        onError: {
            type: Function,
            required: true
        }
    },


    setup(props, context){
        return {}
    }
});

</script>