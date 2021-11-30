<template>
  <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
    * {{ error }}
  </div>
  <div v-if="playlist" class="block md:flex items-start gap-24">
    <div class="w-full md:w-1/3">
      <div class="w-full h-full rounded-lg overflow-hidden mb-4">
        <img
          :src="playlist.coverUrl"
          alt="playlist cover"
          class="w-full h-full object-cover"
        />
      </div>
      <h1 class="font-semibold text-lg text-center text-lg">
        {{ playlist.title }}
      </h1>
      <p class="text-sm opacity-75 text-center">
        Created by {{ playlist.userName }}
      </p>
      <div class="mt-4">{{ playlist.description }}</div>
      <div v-if="ownership" class="flex justify-center mt-12">
        <Button
          text="Delete Playlist"
          class="transform scale-90"
          :is-loading="isPending"
          @click="handleDelete"
        />
      </div>
    </div>
    <div class="w-full md:w-2/3">
      <p v-if="!playlist.songs.length" class="opacity-75">
        No songs have been added to this playlist yet
      </p>
      <div
        v-for="song in playlist.songs"
        :key="song.id"
        class="border-b border-gray-300 pb-2 mb-4 flex items-center justify-between gap-4"
      >
        <div>
          <h1 class="font-semibold mb-2">{{ song.title }}</h1>
          <p class="text-sm opacity-75">{{ song.artist }}</p>
        </div>
        <Button
          text="Delete"
          class="transform scale-75"
          :is-loading="isPending"
          @click="handleDeleteSong(song.id)"
        />
      </div>
      <div class="mt-8">
        <AddSong v-if="ownership" :playlist="playlist" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import AddSong from '../../components/AddSong.vue';
import getUser from '../../composables/getUser';
import getDocument from '../../composables/getDocument';
import useDocument from '../../composables/useDocument';
import useStorage from '../../composables/useStorage';

export default {
  props: ['id'],
  components: { Button, AddSong },
  setup(props) {
    const router = useRouter();
    const { user } = getUser();
    const { error, document: playlist } = getDocument('playlists', props.id);
    const { isPending, deleteDoc, updateDoc } = useDocument(
      'playlists',
      props.id,
    );
    const { deleteImage } = useStorage();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId === user.value.uid
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();

      router.push({ name: 'Home' });
    };

    const handleDeleteSong = async (id) => {
      const newSongs = playlist.value.songs.filter((song) => song.id !== id);

      await updateDoc({
        songs: newSongs,
      });
    };

    return {
      isPending,
      error,
      playlist,
      ownership,
      handleDelete,
      handleDeleteSong,
    };
  },
};
</script>
