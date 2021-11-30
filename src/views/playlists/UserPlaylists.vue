<template>
  <h1 class="font-semibold text-xl mb-4">My Playlists</h1>
  <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
    * {{ error }}
  </div>
  <div v-if="playlists" class="mb-8">
    <p v-if="!playlists.length" class="opacity-75 text-center">
      You have no playlist
    </p>
    <ListView :playlists="playlists" />
  </div>
  <router-link
    :to="{ name: 'CreatePlaylist' }"
    class="inline-block bg-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
    >Create a New Playlist</router-link
  >
</template>

<script>
import ListView from '../../components/ListView.vue';
import getUser from '../../composables/getUser';
import getCollection from '../../composables/getCollection';

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { error, documents: playlists } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid,
    ]);

    return { error, playlists };
  },
};
</script>
