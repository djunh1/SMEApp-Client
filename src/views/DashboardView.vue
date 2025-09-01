<template>
    <div class="default-layout">
        <aside>
            <header class="logo">
                <img :style="{height: '40%', width: '20%'}" src="@/assets/logo.png">
            </img>
            <h2>Portfolios</h2>
            </header>
            <nav>
                <section class="nav-section">
                    <div class="section-title">
                        Stock Platform
                    </div>
                    <section>
                        <a href="#">
                            <span>User Portfolios</span>
                            <div class="subs">
                                <router-link :to="{name: 'portfolios'}">
                                    Portfolios
                                </router-link>
                                <router-link :to="{name: 'reviews'}">
                                    Reviews
                                </router-link>
                                <router-link :to="{name: 'stocks'}">
                                    Stocks
                                </router-link>
                            </div>
                        </a>
                    </section>
                    <section>
                        <a href="#">
                            <span>User Profiles</span>
                            <div class="subs">
                                <router-link :to="{name: 'profiles'}">
                                    Profiles
                                </router-link>
                            </div>
                        </a>
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

import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent ({

    setup () {
        const route = useRoute()

        return {
            route
        }
    }
    
})
</script>
<style lang="">
    
</style>