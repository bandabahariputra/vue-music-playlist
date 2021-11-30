<template>
  <label class="block relative cursor-text">
    <textarea
      :placeholder="placeholder"
      class="block h-20 min-h-0 w-full text-sm border-b-2 border-gray-500 py-1 outline-none placeholder-transparent focus:border-gray-700"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
      required
    ></textarea>
    <span
      class="text-sm text-gray-500 py-1 absolute top-0 left-0 transition-all duration-200 ease-in-out"
      >{{ placeholder }}</span
    >
  </label>
</template>

<script>
export default {
  props: ['placeholder', 'modelValue'],
};
</script>

<style scoped>
textarea:focus ~ span,
textarea:not(:placeholder-shown) ~ span {
  @apply transform -translate-y-5 text-xs;
}
</style>
