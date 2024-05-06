<script lang="ts" setup>
import router from '@/router';
import PayOnceForm from '../components/forms/PayOnceForm.vue';

const foo = (value: number) => {
  router.push("/");
};
</script>

<template>
  <PayOnceForm @on-payment-expired-cancel="foo(1)" />
</template>
