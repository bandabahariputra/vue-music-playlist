<template>
  <label class="block relative cursor-text">
    <input
      :type="type"
      :placeholder="placeholder"
      class="block w-full text-sm border-b-2 border-gray-500 py-1 outline-none placeholder-transparent focus:border-gray-700"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
      required
    />
    <span
      class="text-sm text-gray-500 py-1 absolute top-0 left-0 transition-all duration-200 ease-in-out"
      >{{ placeholder }}</span
    >
  </label>
</template>

<script>
export default {
  props: ['type', 'placeholder', 'modelValue'],
};
</script>

<style scoped>
input:focus ~ span,
input:not(:placeholder-shown) ~ span {
  @apply transform -translate-y-5 text-xs;
}
</style>
