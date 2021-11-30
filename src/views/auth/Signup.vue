<template>
  <div
    class="bg-white w-96 max-w-full mx-auto p-8 rounded-lg border border-gray-300"
  >
    <h1 class="font-semibold text-center text-xl">Signup</h1>
    <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
      * {{ error }}
    </div>
    <form @submit.prevent="handleSubmitSignup">
      <FormInput type="text" placeholder="Name" v-model="name" class="mt-8" />
      <FormInput
        type="email"
        placeholder="Email Address"
        v-model="email"
        class="mt-8"
      />
      <FormInput
        type="password"
        placeholder="Password"
        v-model="password"
        class="mt-8"
      />
      <Button text="Sign Up" class="mt-8" :is-loading="isPending" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../../components/FormInput.vue';
import Button from '../../components/Button.vue';
import useSignup from '../../composables/useSignup';

export default {
  components: { FormInput, Button },
  setup() {
    const router = useRouter();
    const { isPending, error, signup } = useSignup();

    const name = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmitSignup = async () => {
      await signup(name.value, email.value, password.value);

      if (!error.value) {
        router.push({ name: 'UserPlaylists' });
      }
    };

    return { name, email, password, handleSubmitSignup, isPending, error };
  },
};
</script>
