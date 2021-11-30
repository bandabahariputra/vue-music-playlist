<template>
  <Navbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>
