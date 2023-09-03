import mongoose from 'mongoose';

//modelo representativo do banco de dados. Será gravado no banco neste formato. E quando busca vem neste formato.
const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: true,
  },
  editora: { type: String, required: true },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: 'O número de páginas deve estar entre 10 e 5000!',
    },
  },
});

const livros = mongoose.model('books', livroSchema);

export default livros;
