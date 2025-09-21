<template>
  <div class="bg-slate-500 min-h-screen w-screen flex flex-col items-center p-6">
    
    <!-- Modal de edição -->
    <div v-if="modoEditor" class="fixed inset-0 bg-[#0e070769] backdrop-blur-[3px] flex items-center justify-center z-50">
      <div class="bg-white w-[90%] md:w-[35vw] rounded-2xl shadow-lg p-6 flex flex-col gap-4">
        <h2 class="text-2xl font-semibold text-slate-700 text-center">Editar Livro</h2>

        <input v-model="livro.titulo" type="text" placeholder="Título" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
        <input v-model="livro.autor" type="text" placeholder="Autor" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
        <input v-model="livro.genero" type="text" placeholder="Gênero" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />

        <select v-model="livro.status" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400">
          <option disabled value="">Selecione o status</option>
          <option value="lido">📘 Lido</option>
          <option value="lendo">📖 Lendo</option>
          <option value="quero-ler">✨ Quero Ler</option>
        </select>

        <div class="flex gap-4">
          <button @click="cancelarEdicao" class="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition">Cancelar</button>
          <button @click="salvarEdicao" class="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition">Salvar</button>
        </div>
      </div>
    </div>

    <h1 class="text-4xl font-bold text-white text-center mb-6">📚 Biblioteca Virtual Pessoal</h1>

    <!-- Card de adicionar livro -->
    <div class="bg-white w-[90%] md:w-[35vw] rounded-2xl shadow-lg p-6 flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-slate-700 text-center">Adicionar Livro</h2>

      <input v-model="livro.titulo" type="text" placeholder="Título" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
      <input v-model="livro.autor" type="text" placeholder="Autor" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
      <input v-model="livro.genero" type="text" placeholder="Gênero" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />

      <select v-model="livro.status" class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400">
        <option disabled value="">Selecione o status</option>
        <option value="lido">📘 Lido</option>
        <option value="lendo">📖 Lendo</option>
        <option value="quero-ler">✨ Quero Ler</option>
      </select>

      <button @click="adicionarLivro" class="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">➕ Adicionar</button>
    </div>

    <!-- Lista de livros -->
    <div class="mt-8 w-[90%] md:w-[60vw]">
      <h2 class="text-2xl text-white mb-4">📋 Minha Lista</h2>

      <div v-if="livros.length === 0" class="text-white text-center italic">Nenhum livro adicionado ainda...</div>

      <ul class="space-y-4">
        <li v-for="liv in livros" :key="liv._id" class="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 class="font-bold text-lg text-slate-700">{{ liv.title }}</h3>
            <p class="text-sm text-slate-500">Autor: {{ liv.autor }} | Gênero: {{ liv.genero }}</p>
            <span class="px-3 py-1 text-xs rounded-full font-semibold" :class="{
              'bg-green-200 text-green-800': liv.status === 'lido',
              'bg-blue-200 text-blue-800': liv.status === 'lendo',
              'bg-yellow-200 text-yellow-800': liv.status === 'quero-ler'
            }">{{ liv.status }}</span>
          </div>

          <div class="flex gap-2">
            <button @click="editarLivro(liv)" class="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition">✏️</button>
            <button @click="deletarLivro(liv._id)" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">🗑️</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const livros = ref([]);
const modoEditor = ref(false);
const livroEditandoId = ref(null);

const livro = reactive({
  titulo: '',
  autor: '',
  genero: '',
  status: ''
});

const carregarLivros = async () => {
  try {
    const res = await fetch("http://localhost:3000/livros");
    livros.value = await res.json();
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
  }
};

const adicionarLivro = async () => {
  if (!livro.titulo || !livro.autor || !livro.genero || !livro.status) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const novoLivro = {
    title: livro.titulo,
    autor: livro.autor,
    genero: livro.genero,
    status: livro.status
  };

  try {
    const res = await fetch("http://localhost:3000/criarLivros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro)
    });
    if (res.ok) {
      carregarLivros();
      resetForm();
    }
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
  }
};

const deletarLivro = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/deletarLivros/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      carregarLivros();
    }
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
  }
};

const editarLivro = (livroSelecionado) => { 
  modoEditor.value = true;
  livroEditandoId.value = livroSelecionado._id;

  livro.titulo = livroSelecionado.title;
  livro.autor = livroSelecionado.autor;
  livro.genero = livroSelecionado.genero;
  livro.status = livroSelecionado.status;
};

const salvarEdicao = async () => {
  try {
    const res = await fetch(`http://localhost:3000/atualizarLivros/${livroEditandoId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: livro.titulo,
        autor: livro.autor,
        genero: livro.genero,
        status: livro.status
      })
    });

    if (res.ok) {
      carregarLivros();
      cancelarEdicao();
    }
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
  }
};

const cancelarEdicao = () => {
  modoEditor.value = false;
  livroEditandoId.value = null;
  resetForm();
};

const resetForm = () => {
  livro.titulo = '';
  livro.autor = '';
  livro.genero = '';
  livro.status = '';
};

onMounted(() => {
  carregarLivros();
});
</script>