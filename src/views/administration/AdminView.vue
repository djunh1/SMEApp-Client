<template>
    <header>
        <span class="title">Admin </span>
    </header>
    <Tabs>
        <Tab title="Add new user">
          <add-user-action></add-user-action>   
        </Tab>
        
        <Tab title="Delete a user">
        <delete-user-action></delete-user-action>
        </Tab>

        <Tab title="Unblock user">
          <unblock-user-action ></unblock-user-action>
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

export default defineComponent({
    components: {
        AddUserAction,
        DeleteUserAction,
        UnblockUserAction,
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
.users {
    position: absolute;
    height: 30%;
    bottom: 20px;
    width: 78%;
    margin: .5rem .5rem 1rem;
    overflow-x: scroll;
}
</style>