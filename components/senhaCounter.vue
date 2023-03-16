<template>
  <div>
    <h3 v-if="senhaAtual !== 0">Senha atual: {{ senhaAtual }}</h3>
    <h3 v-else>Por favor, aguarde enquanto a senha é atualizada</h3>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const channel = supabase.channel("senhaAtual").subscribe();

const senhaAtual = ref(0);

// Listen for messages
channel.on(
  "broadcast",
  { event: "senhaCenac" },
  (payload) => (senhaAtual.value = payload.payload.senha)
);

// Send senhaAtual request on join
channel.send({
  type: "broadcast",
  event: "join",
  payload: { join: "I'm Joining!" },
});
</script>
