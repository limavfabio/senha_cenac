<template>
  <div>
    <h3>Senha atual: {{ senhaAtual }}</h3>
    <button @click="incrementSenha()">Incrementar Senha</button>
    <div class="senhaSetter">
      <input v-model="senhaInput" type="text" />
      <button @click="setSenha(senhaInput)">Setar Senha</button>
    </div>
    <button @click="resetSenha()" class="outline secondary">
      Resetar Senha
    </button>
  </div>
</template>

<script setup lang="ts">
import config from "nitropack/dist/runtime/config";

const supabase = useSupabaseClient();
const senhaAtual = ref(0);
const senhaInput = ref();

const channel = supabase.channel("senhaAtual", {
  config: {
    broadcast: {
      self: true,
    },
  },
});

channel
  .on(
    "broadcast",
    { event: "senhaCenac" },
    (payload) => (senhaAtual.value = payload.payload.senha)
  )
  .subscribe();

const incrementSenha = () => {
  channel.send({
    type: "broadcast",
    event: "senhaCenac",
    payload: { senha: (senhaAtual.value += 1) },
  });
};

const setSenha = (num: number) => {
  channel.send({
    type: "broadcast",
    event: "senhaCenac",
    payload: { senha: num },
  });
  senhaInput.value = "";
};

const resetSenha = () => {
  channel.send({
    type: "broadcast",
    event: "senhaCenac",
    payload: { senha: (senhaAtual.value = 0) },
  });
};
</script>

<style scoped>
.senhaSetter {
  display: flex;
  gap: 2rem;
}
</style>
