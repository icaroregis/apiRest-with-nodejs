import livros from '../models/Livros.js';

class BookController {
  static listBooks = (request, response) => {
    livros
      .find()
      .populate('autor')
      .exec((err, livros) => {
        response.status(200).json(livros);
      });
  };

  static listBookById = (request, response) => {
    const { id } = request.params;

    livros
      .findById(id)
      .populate('autor')
      .exec((err, livro) => {
        if (err) {
          response
            .status(400)
            .send({ message: `${err.message} - ${id} id not found` });
        } else {
          response.status(200).send(livro.toJSON());
        }
      });
  };

  static createBook = (request, response) => {
    const livro = new livros(request.body);

    livro.save((err) => {
      if (err) {
        response
          .status(500)
          .send({ message: `${err.message} - Failed to register the book` });
      } else {
        response.status(201).send(livro.toJSON());
      }
    });
  };

  static updateBook = (request, response) => {
    const { id } = request.params;

    livros.findByIdAndUpdate(id, { $set: request.body }, (err) => {
      if (!err) {
        response.status(200).send({ message: 'Successfully updated book' });
      } else {
        response.status(500).send({ message: err.message });
      }
    });
  };

  static deleteBook = (request, response) => {
    const { id } = request.params;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        response.status(200).send({ message: 'Successfully deleted book!!' });
      } else {
        response.status(500).send({ message: err.message });
      }
    });
  };

  static listBooksByPublisher = (req, res) => {
    const editora = req.query.editora;

    livros.find({ editora: editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };
}

export default BookController;
