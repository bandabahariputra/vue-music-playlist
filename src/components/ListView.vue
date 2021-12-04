<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div
        class="card-list bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 ease-in-out"
      >
        <div class="w-40 h-24 rounded-lg overflow-hidden">
          <img
            :src="playlist.coverUrl"
            alt="playlist cover"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="w-full">
          <h1 class="font-semibold text-lg">{{ playlist.title }}</h1>
          <p class="text-sm">Created by {{ playlist.userName }}</p>
        </div>
        <div class="ml-auto">{{ playlist.songs.length }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['playlists'],
};
</script>

<style scoped>
.card-list:hover {
  transform: scale(1.02);
}
</style>
