<script setup>
import { ref, nextTick } from "vue";
import axios from "axios";

const amount = ref(10);
const order_id = ref(Date.now());
const dataLiqpay = ref("");
const signatureLiqpay = ref("");
const formRef = ref(null);
const API_URL = import.meta.env.VITE_API_URL;

const submit = async () => {
  const res = await axios.post(`${API_URL}/api/payment`, {
    amount: amount.value,
    order_id: order_id.value,
  });

  dataLiqpay.value = res.data.data;
  signatureLiqpay.value = res.data.signature;

  await nextTick();

  formRef.value.submit();
};
</script>

<template>
  <div class="text-2xl">Home</div>
  <button
    class="mt-4 w-fit rounded-xl border hover:border-green-500"
    @click="submit"
  >
    <img src="/logo.svg" alt="logo" class="m-2 w-30" />
  </button>

  <form action="https://liqpay.ua/api/3/checkout" method="POST" ref="formRef">
    <input type="hidden" class="border" :value="dataLiqpay" />
    <input type="hidden" class="border" :value="signatureLiqpay" />
  </form>
</template>
