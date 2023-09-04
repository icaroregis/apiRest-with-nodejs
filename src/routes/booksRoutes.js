import express from 'express';
import paginar from '../middleware/paginar.js';
import BookController from '../controllers/booksController.js';

const router = express.Router();

router
  .get('/livros', BookController.listBooks, paginar)
  .get('/livros/busca', BookController.searchBookByFilter, paginar)
  .get('/livros/:id', BookController.listBookById)
  .post('/livros', BookController.createBook)
  .put('/livros/:id', BookController.updateBook)
  .delete('/livros/:id', BookController.deleteBook);

export default router;
