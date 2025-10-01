<template>
    <header>
        <span class="title">Admin </span>
    </header>
    <Tabs>
        <Tab title="Add user">
          <add-user-action></add-user-action>   
        </Tab>
        
        <Tab title="Delete user">
        <delete-user-action></delete-user-action>
        </Tab>

        <Tab title="Unblock">
          <unblock-user-action ></unblock-user-action>
        </Tab>
        <Tab title=" Update status">
            <update-user-status-action></update-user-status-action>
        </Tab>
        <Tab title=" Update user password">
            <update-user-password-action></update-user-password-action>
        </Tab>

    </Tabs>
    <div>
        <users-overview class="users"></users-overview>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

import UsersOverview from './screens/UsersOverview.vue';
import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';

import AddUserAction from './actions/AddUserAction.vue';
import DeleteUserAction from './actions/DeleteUserAction.vue';
import UnblockUserAction from '@/views/administration/actions/UnblockUserAction.vue';
import UpdateUserStatusAction from '@/views/administration/actions/UpdateUserStatusAction.vue'
import UpdateUserPasswordAction from '@/views/administration/actions/UpdateUserPasswordAction.vue'


export default defineComponent({
    components: {
        AddUserAction,
        DeleteUserAction,
        UnblockUserAction,
        UpdateUserPasswordAction,
        UpdateUserStatusAction,
        Tab,
        Tabs,
        UsersOverview
    },


    setup(){
        const store = useStore();

        const updateList = async () => {
            return Promise.allSettled([
                store.dispatch('administrationManagement/setUsers')
            ])
        }

        onMounted(() => {
            updateList()
        })
        return {}
    }
});

</script>

<style lang="scss" scoped>
@import "@/styles/components/administration.scss";
</style>