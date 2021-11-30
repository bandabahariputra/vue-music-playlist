<template>
  <div v-if="!showForm" class="flex justify-center">
    <Button text="Add Song" @click="showForm = true" />
  </div>
  <div
    v-if="showForm"
    class="bg-white w-full max-w-full mx-auto p-8 rounded-lg border border-gray-300"
  >
    <h1 class="font-semibold text-xl">Add a New Song</h1>
    <div class="mt-2 font-semibold text-sm text-red-400"></div>
    <form @submit.prevent="handleSubmit">
      <FormInput
        type="text"
        placeholder="Song title"
        v-model="title"
        class="mt-8"
      />
      <FormInput
        type="text"
        placeholder="Artist"
        v-model="artist"
        class="mt-8"
      />
      <Button text="Add" class="mt-8" />
      <button
        class="ml-4 text-sm text-gray-500 hover:underline"
        @click="showForm = false"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import FormInput from './FormInput.vue';
import Button from './Button.vue';
import useDocument from '../composables/useDocument';

export default {
  props: ['playlist'],
  components: { FormInput, Button },
  setup(props) {
    const { updateDoc } = useDocument('playlists', props.playlist.id);

    const title = ref('');
    const artist = ref('');
    const showForm = ref(false);

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: uuidv4(),
      };

      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });

      title.value = '';
      artist.value = '';
      showForm.value = false;
    };

    return { title, artist, showForm, handleSubmit };
  },
};
</script>
