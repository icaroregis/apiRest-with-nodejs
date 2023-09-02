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
  numeroPaginas: { type: Number },
});

const livros = mongoose.model('books', livroSchema);

export default livros;
