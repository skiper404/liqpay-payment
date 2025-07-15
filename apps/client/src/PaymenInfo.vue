<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const back = () => {
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="text-center">
    <div class="">Payment Ok!</div>
    <button class="hover:text-blue-500" @click="back"><- Back</button>
  </div>
</template>
