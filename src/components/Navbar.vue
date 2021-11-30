<template>
  <div class="bg-white shadow-sm sticky top-0 z-10">
    <nav class="container flex items-center justify-between py-4">
      <router-link
        :to="{ name: 'Home' }"
        class="flex items-center gap-4 hover:text-black z-20"
      >
        <img
          src="https://drive.google.com/uc?export=view&id=1f2P2HY1v3VlW9GOgBWnPWp_uBXsOsnqB"
          alt="logo"
          class="w-10"
        />
        <span class="font-bold text-xl uppercase">Music Playlists</span>
      </router-link>
      <div
        class="cursor-pointer block md:hidden z-20"
        @click="handleToggleMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      <div
        ref="menu"
        class="absolute top-0 right-0 w-0 h-screen bg-white pt-20 overflow-x-hidden md:relative md:h-auto md:w-auto md:pt-0 md:translate-x-0 transition-all duration-200 ease-in-out z-10"
      >
        <div v-if="user" class="md:flex md:items-center md:gap-8">
          <router-link
            :to="{ name: 'CreatePlaylist' }"
            class="block px-8 py-2 md:inline md:p-0 hover:text-black"
            >Create Playlist</router-link
          >
          <router-link
            :to="{ name: 'UserPlaylists' }"
            class="block px-8 py-2 md:inline md:p-0 hover:text-black"
            >My Playlists</router-link
          >
          <div
            class="block px-8 py-2 md:inline-block md:p-0 md:pl-4 border-0 md:border-l border-gray-100"
          >
            Hi, {{ user.displayName }}
          </div>
          <div class="px-8 py-2 md:p-0">
            <Button text="Logout" @click="handleLogout" />
          </div>
        </div>
        <div v-else class="md:flex md:items-center md:gap-8">
          <router-link
            :to="{ name: 'Login' }"
            class="block px-8 py-2 md:inline md:p-0 hover:text-black"
            >Login</router-link
          >
          <router-link
            :to="{ name: 'Signup' }"
            class="block px-8 py-2 md:inline md:p-0 hover:text-black"
            >Sign Up</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';

export default {
  components: { Button },
  setup() {
    const router = useRouter();
    const { logout } = useLogout();
    const { user } = getUser();

    const menu = ref(null);

    const handleToggleMenu = () => {
      menu.value.classList.toggle('w-0');
      menu.value.classList.toggle('w-96');
    };

    const handleLogout = async () => {
      await logout();
      router.push({ name: 'Login' });
    };

    return { menu, handleToggleMenu, handleLogout, user };
  },
};
</script>
