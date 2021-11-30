<template>
  <div
    class="bg-white w-96 max-w-full mx-auto p-8 rounded-lg border border-gray-300"
  >
    <h1 class="font-semibold text-center text-xl">Login</h1>
    <div v-if="error" class="mt-2 font-semibold text-sm text-red-400">
      * {{ error }}
    </div>
    <form @submit.prevent="handleSubmitLogin">
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
      <Button text="Login" class="mt-8" :is-loading="isPending" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../../components/FormInput.vue';
import Button from '../../components/Button.vue';
import useLogin from '../../composables/useLogin';

export default {
  components: { FormInput, Button },
  setup() {
    const router = useRouter();
    const { isPending, error, login } = useLogin();

    const email = ref('');
    const password = ref('');

    const handleSubmitLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: 'UserPlaylists' });
      }
    };

    return { email, password, handleSubmitLogin, isPending, error };
  },
};
</script>
