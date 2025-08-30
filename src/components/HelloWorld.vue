<template>
  <div>
  <ul v-for="portfolio in portfolios">
    <li>
      {{ portfolio.name }}
      {{ portfolio.description }}
    </li>
  </ul>
</div>
 
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { loadPortfolios} from '@/api/portfolios'

export default defineComponent({
  setup() {
    const portfolios = ref()

    // method to get objects - Needs to be async since this is promise-based
    const addPortfolios =  async () => {
      portfolios.value = await loadPortfolios();
    }

    // Now use a hook to call the method we created above
    onMounted(() => {
      addPortfolios()
    })
    return {
      portfolios
    }
  },
});
</script>


<style scoped lang="scss">

</style>
