<template>
  <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
    * {{ error }}
  </div>
  <div v-if="documents">
    <p v-if="!documents.length" class="opacity-75 text-center">
      There is no playlist
    </p>
    <ListView :playlists="documents" />
  </div>
</template>

<script>
import ListView from '../components/ListView.vue';
import getCollection from '../composables/getCollection';

export default {
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('playlists');

    return { error, documents };
  },
};
</script>
