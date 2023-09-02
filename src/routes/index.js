import express from 'express';
import livros from './booksRoutes.js';
import authors from './authorsRoutes.js';

const routes = (app) => {
  app.route('/').get((request, response) => {
    response.status(200).send({ titulo: 'Curso de Node Js!!!' });
  });

  app.use(express.json(), livros, authors);
};

export default routes;
