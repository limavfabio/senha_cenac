<template>
  <div>
    <h3 v-if="senhaAtual !== 0">Senha atual: {{ senhaAtual }}</h3>
    <h3 v-else>Por favor, aguarde enquanto a senha é atualizada</h3>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const channel = supabase.channel("senhaAtual");

const senhaAtual = ref(0);

channel
  .on(
    "broadcast",
    { event: "senhaCenac" },
    (payload) => (senhaAtual.value = payload.payload.senha)
  )
  .subscribe();
</script>
