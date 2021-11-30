<template>
  <div
    class="bg-white max-w-full mx-auto p-8 rounded-lg border border-gray-300"
    style="width: 600px"
  >
    <h1 class="font-semibold text-xl">Create New Playlist</h1>
    <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
      * {{ error }}
    </div>
    <form @submit.prevent="handleSubmit">
      <FormInput
        type="text"
        placeholder="Playlist title"
        v-model="title"
        class="mt-8"
      />
      <FormTextarea
        placeholder="Playlist description"
        v-model="description"
        class="mt-8"
      />
      <!-- input file -->
      <div class="mt-8">
        <label class="block text-sm text-gray-500"
          >Upload playlist cover image</label
        >
        <input type="file" class="mt-4" @change="handleFileChange" />
        <div v-if="fileError" class="mt-2 font-semibold text-sm text-red-400">
          * {{ fileError }}
        </div>
      </div>
      <Button text="Save" class="mt-8" :is-loading="isPending" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../../components/FormInput.vue';
import FormTextarea from '../../components/FormTextarea.vue';
import Button from '../../components/Button.vue';
import useStorage from '../../composables/useStorage';
import useCollection from '../../composables/useCollection';
import getUser from '../../composables/getUser';
import { timestamp } from '../../firebase/config';

export default {
  components: { FormInput, FormTextarea, Button },
  setup() {
    const router = useRouter();
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('playlists');
    const { user } = getUser();

    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    // allowed file types
    const types = ['image/png', 'image/jpeg'];

    const handleFileChange = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png or jpg)';
      }
    };

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp,
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id } });
        }
      }
    };

    return {
      title,
      description,
      handleFileChange,
      fileError,
      handleSubmit,
      isPending,
      error,
    };
  },
};
</script>
