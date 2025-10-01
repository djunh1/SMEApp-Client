<template>
    <div class="admin-action">
        <div class="admin-action__title">
            <h3><b>New user</b></h3>
        </div>
        <div class="admin-action__content">
            <form @submit.prevent="submitForm">
                <div>
                    <label for="username">Username</label>
                    <input type="text" required name="username" v-model.trim="username">
                </div>
                <div>
                    <label for="firstName">First name</label>
                    <input type="text" required name="firstName" v-model.trim="firstName">
                </div>
                <div>
                    <label for="lastName">Last name</label>
                    <input type="text" required name="lastName" v-model.trim="lastName">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" required name="email" v-model.trim="email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" required name="password" v-model.trim="password">
                </div>
                <div>
                    <label for="isAdmin">Is Admin</label>
                    <select name="isAdmin" required id="" v-model="isAdmin">
                        <option :value="1">Yes</option>
                        <option :value="0" selected>No</option>
                    </select>
                </div>
                <button class="button is-primary">Save</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { IUser } from "@/models/iUser";

// import { addUser } from '@api/admin/admin';

import { useStore } from "vuex";

export default defineComponent({
    components: {},


    setup() {
        const buttenEnabled = ref(false);

        const firstName = ref();
        const lastName = ref();
        const email = ref();
        const password = ref();
        const isAdmin = ref();
        const username = ref();
        const store = useStore();


        const submitForm = async () => {
            const body = {
                username: username.value,
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                is_staff: isAdmin.value,
                passwd: password.value,
            };

            let status = await store.dispatch('administrationManagement/addUser', body);

            if (status) {
                cleanForm()
            }

        }

        const cleanForm = () => {
            username.value = '',
                firstName.value = '',
                lastName.value = '',
                email.value = '',
                isAdmin.value = 0,
                password.value = ''
        }
return {
    submitForm,

    firstName,
    lastName,
    email,
    password,
    isAdmin,
    username
}
    }
});

</script>

<style lang='scss' scoped>
@import "@/styles/components/administration.scss"
</style>