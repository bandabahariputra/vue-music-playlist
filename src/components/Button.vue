<template>
  <button
    class="bg-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
    :class="{ 'opacity-50 pointer-events-none': isLoading }"
  >
    {{ isLoading ? 'Loading...' : text }}
  </button>
</template>

<script>
export default {
  props: ['text', 'isLoading'],
};
</script>
