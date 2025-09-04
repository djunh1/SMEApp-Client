<template>
    <div class="default-layout">
        <aside>
            <header>
                <img class="logo" src="@/assets/logo.png">
                </img>
                <h2>Market Edge</h2>
            </header>
            <nav>
                <section class="nav-section">
                    <div class="section-title">Main</div>
                    <section :class="{'is-toggled': toggledViews.includes('portfolios-reporting')}">
                        <a href="#" @click.prevent="toggleViews('portfolios-reporting')">
                            <Home_Icon class="nav_icon" :color="colorKey === 'portfolios-reporting' ? activeColor: baseColor" />
                            <span>Portfolios</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                            <router-link :to="{ name: 'portfolios' }" class="each">
                                Portfolios
                            </router-link>
                            <router-link :to="{ name: 'reviews' }" class="each">
                                Reviews
                            </router-link>
                            <router-link :to="{ name: 'stocks' }" class="each">
                                Stocks
                            </router-link>
                        </div>
                    </section>
                    <section :class="{'is-toggled': toggledViews.includes('user-profiles')}">
                        <a href="#" @click.prevent="toggleViews('user-profiles')">
                            <Customers_Icon class="nav_icon" :color="colorKey === 'user-profiles' ? activeColor: baseColor" />
                            <span>Investors</span>
                            <MenuToggle_Icon class="menuToggle" />
                        </a>
                        <div class="subs">
                            <router-link :to="{ name: 'profiles' }" class="each">
                                Profiles
                            </router-link>
                        </div>
                    </section>
                </section>
            </nav>
        </aside>
        <main class="body">
            <router-view :key="route.path">

            </router-view>
        </main>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import Home_Icon from '@/assets/icons/Home_Icon.vue';
import Customers_Icon from '@/assets/icons/Customers_Icon.vue';
import MenuToggle_Icon from '@/assets/icons/MenuToggle_Icon.vue';

export default defineComponent({

    components: {
        Customers_Icon,
        Home_Icon,
        MenuToggle_Icon
    },

    setup() {
        const route = useRoute()

        const activeColor = ref('#d5b155');
        const baseColor = ref('white');
        const colorKey = ref('');

        const toggledViews = ref(
            [router.currentRoute.value.meta.screen].filter(Boolean)
        )

        const toggleViews = (key: string) => {
            if(toggledViews.value[0] === key){
                toggledViews.value=['']
                colorKey.value=''
            } else {
                toggledViews.value = [key]
                colorKey.value = key
            }
            toggledViews.value = [key]
        }
        

        return {
            route,
            toggledViews,
            activeColor,
            baseColor,
            colorKey,
            toggleViews

        }
    }

})
</script>
<style lang="">

</style>