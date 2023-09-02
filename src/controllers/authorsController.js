import authors from '../models/Autor.js';

class AuthorController {
  static listAuthors = (request, response) => {
    authors.find((err, livros) => {
      response.status(200).json(livros);
    });
  };

  static listAuthorById = (request, response) => {
    const { id } = request.params;

    authors.findById(id, (err, livro) => {
      if (err) {
        response
          .status(400)
          .send({ message: `${err.message} - ${id} id not found` });
      } else {
        response.status(200).send(livro.toJSON());
      }
    });
  };

  static createAuthor = (request, response) => {
    const livro = new authors(request.body);

    livro.save((err) => {
      if (err) {
        response
          .status(500)
          .send({ message: `${err.message} - Failed to register the author` });
      } else {
        response.status(201).send(livro.toJSON());
      }
    });
  };

  static updateAuthor = (request, response) => {
    const { id } = request.params;

    authors.findByIdAndUpdate(id, { $set: request.body }, (err) => {
      if (!err) {
        response.status(200).send({ message: 'Successfully updated author' });
      } else {
        response.status(500).send({ message: err.message });
      }
    });
  };

  static deleteAuthor = (request, response) => {
    const { id } = request.params;

    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        response.status(200).send({ message: 'Successfully deleted author!!' });
      } else {
        response.status(500).send({ message: err.message });
      }
    });
  };
}

export default AuthorController;
