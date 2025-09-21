## Biblioteca Virtual 📚

Um CRUD completo para gerenciar sua biblioteca virtual. O projeto conta com uma API em Node.js + MongoDB para persistência dos dados e uma interface em Vue.js para interação. Você pode cadastrar livros com nome, autor, gênero e status de leitura, além de editar, listar e excluir.

---

## ✨ Funcionalidades

- ➕ Adicionar livros com nome, autor, gênero e status de leitura.

- 📖 Atualizar o status de leitura (ex: lendo, lido, quero ler).

- ✏️ Editar informações já cadastradas.

- 🗑️ Remover livros da biblioteca.

- 🔎 Visualizar todos os livros em lista organizada.

- 💾 Integração com banco de dados MongoDB para persistência.

- 🌐 API REST com rotas de criação, leitura, atualização e exclusão.

- 🎨 Interface simples, responsiva e intuitiva.

---

## 📂 Estrutura do Projeto

```plaintext

biblioteca-virtual-crud/
│── biblioteca/ (Vue.js)
│   ├── public/          # Arquivos públicos
│   ├── src/
│   │   ├── components/  # Componentes Vue (LivroForm.vue, LivroList.vue, etc.)
│   │   ├── views/       # Páginas principais
│   │   ├── App.vue      # Componente raiz
│   │   └── main.js      # Configuração inicial do Vue
│   └── package.json     # Dependências do frontend
│
│── API-Biblioteca/ (Node.js + Express)
│   ├── server.js        # Configuração do servidor
│   ├── routes/          # Rotas da API
│   ├── models/          # Schemas do MongoDB
│   └── controllers/     # Lógica das operações da API
│
└── README.md


```

---

## 🛠 Tecnologias Utilizadas

# Frontend:

- Vue.js

- Tailwind CSS

# Backend:

- Node.js

- Express.js

- MongoDB + Mongoose

---

## 🌐 API Endpoints

```plaintext
| Método | Rota                   | Descrição                        |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/livros`              | Lista todos os livros            |
| POST   | `/criarLivros`         | Adiciona um novo livro           |
| PUT    | `/atualizarLivros/:id` | Atualiza informações de um livro |
| DELETE | `/deletarLivros/:id`   | Remove um livro da biblioteca    |

```

--... (NaN KB restante(s))
