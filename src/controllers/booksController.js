import livros from '../models/Livros.js';

class BookController {
  static listBooks = async (request, response) => {
    try {
      const result = await livros.find().populate('autor').exec();
      response.status(200).send(result);
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };

  static listBookById = async (request, response) => {
    try {
      const { id } = request.params;
      const result = await livros.findById(id).populate('autor').exec();

      if (!result) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      response.status(200).send(result);
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };

  static createBook = async (request, response) => {
    try {
      const { titulo, autor, editora, numeroPaginas } = request.body;

      if (!titulo || !autor || !editora || !numeroPaginas) {
        return response.status(400).send({
          message: 'titulo, autor, editora and numeroPaginas are required!',
        });
      }

      const existingAuthor = await livros.findOne({ titulo });

      if (existingAuthor) {
        return response
          .status(409)
          .send({ message: 'Este Livro já está cadastrado' });
      }

      const livro = new livros({ titulo, autor, editora, numeroPaginas });
      const result = await livro.save();

      response.status(201).send(result);
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };

  static updateBook = async (request, response) => {
    try {
      const { id } = request.params;
      const { titulo, autor, editora, numeroPaginas } = request.body;

      if (!id) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      if (!titulo || !autor || !editora | !numeroPaginas) {
        return response.status(400).send({
          message: 'titulo, autor, editora and numeroPaginas are required!',
        });
      }

      await livros.findByIdAndUpdate(id, {
        $set: { titulo, autor, editora, numeroPaginas },
      });

      response.status(200).send({ message: 'Livro atualizado com sucesso' });
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };

  static deleteBook = async (request, response) => {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      await livros.findByIdAndDelete(id);
      response.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };

  static listBooksByPublisher = (request, response) => {
    try {
      const { editora } = request.query;

      const result = livros.find({ editora: editora }, {});
      response.status(200).send(result);
    } catch (error) {
      response.status(500).send({
        message: `${error.message}   
      An error occurred on the server.`,
      });
    }
  };
}

export default BookController;
