<template>
  <div>
    <h3>Senha atual: {{ senhaAtual }}</h3>
    <button @click="incrementSenha()">Incrementar Senha</button>
    <div class="senhaSetter">
      <input placeholder="0" v-model="senhaInput" type="number" />
      <button @click="setSenha(senhaInput)">Setar Senha</button>
    </div>
    <button @click="resetSenha()" class="outline secondary">
      Resetar Senha
    </button>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";

const senhaAtual = ref(0);
const shouldRun = ref(true);

// Supabase connection
const supabase = useSupabaseClient();
const channel = supabase.channel("senhaAtual").subscribe();

// Start listening for requests, then resending messages on join detected
channel.on("broadcast", { event: "join" }, () =>
  channel.send({
    type: "broadcast",
    event: "senhaCenac",
    payload: { senha: senhaAtual.value },
  })
);

// Send messages when senhaAtual changes
watch(senhaAtual, () => {
  if (shouldRun.value) {
    channel.send({
      type: "broadcast",
      event: "senhaCenac",
      payload: { senha: senhaAtual.value },
    });
  } else {
    // Immediately sets to true as to only avoid block once
    shouldRun.value = true;
  }
});

// Listen for messages
channel.on("broadcast", { event: "senhaCenac" }, (payload) => {
  // This will mutate senhaAtual without running the effect
  shouldRun.value = false;
  senhaAtual.value = payload.payload.senha;
});

// Functions

const incrementSenha = () => {
  senhaAtual.value += 1;
};

const senhaInput = ref();

const setSenha = (num: number) => {
  // Parse input value for valid number
  if (z.number().safeParse(Number(num)).success) {
    senhaAtual.value = Number(num);
    senhaInput.value = "";

    // If not valid number, reset senhaAtual
  } else {
    senhaAtual.value = 0;
    senhaInput.value = "";
  }
};

const resetSenha = () => {
  senhaAtual.value = 0;
};
</script>

<style scoped>
.senhaSetter {
  display: flex;
  gap: 2rem;
}
</style>
