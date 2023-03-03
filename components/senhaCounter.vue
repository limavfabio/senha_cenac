<template>
  <div>
    <h3>Senha atual: {{ senhaAtual }}</h3>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const senhaAtual = ref(0);

const channel = supabase.channel("senhaAtual");

channel
  .on(
    "broadcast",
    { event: "senhaCenac" },
    (payload) => (senhaAtual.value = payload.payload.senha)
  )
  .subscribe();
</script>
