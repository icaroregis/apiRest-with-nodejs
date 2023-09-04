import express from 'express';
import paginar from '../middleware/paginar.js';
import AuthorController from '../controllers/authorsController.js';

const router = express.Router();

router
  .get('/autores', AuthorController.listAuthors, paginar)
  .get('/autores/:id', AuthorController.listAuthorById)
  .post('/autores', AuthorController.createAuthor)
  .put('/autores/:id', AuthorController.updateAuthor)
  .delete('/autores/:id', AuthorController.deleteAuthor);

export default router;
