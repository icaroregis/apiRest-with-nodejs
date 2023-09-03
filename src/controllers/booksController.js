import livros from '../models/Livros.js';

class BookController {
  static listBooks = async (request, response, next) => {
    try {
      const result = await livros.find().populate('autor').exec();
      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  static listBookById = async (request, response, next) => {
    try {
      const { id } = request.params;
      const result = await livros.findById(id).populate('autor').exec();

      if (!result) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  static createBook = async (request, response, next) => {
    try {
      const { titulo, autor, editora, numeroPaginas } = request.body;
      const camposObrigatorios = [
        'titulo',
        'autor',
        'editora',
        'numeroPaginas',
      ];

      const faltandoCampos = camposObrigatorios.filter(
        (campo) => !request.body[campo],
      );

      if (faltandoCampos.length > 0) {
        return response.status(400).json({
          message: `Campos obrigatórios faltando: ${faltandoCampos.join(', ')}`,
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
      next(error);
    }
  };

  static updateBook = async (request, response, next) => {
    try {
      const { id } = request.params;
      const { titulo, autor, editora, numeroPaginas } = request.body;
      const camposObrigatorios = [
        'titulo',
        'autor',
        'editora',
        'numeroPaginas',
      ];

      if (!id) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      const faltandoCampos = camposObrigatorios.filter((campo) => {
        return !request.body[campo];
      });

      if (faltandoCampos.length > 0) {
        return response.status(400).json({
          message: `Campos obrigatórios faltando: ${faltandoCampos.join(', ')}`,
        });
      }

      await livros.findByIdAndUpdate(id, {
        $set: { titulo, autor, editora, numeroPaginas },
      });

      response.status(200).send({ message: 'Livro atualizado com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (request, response, next) => {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      await livros.findByIdAndDelete(id);
      response.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  static listBooksByPublisher = (request, response, next) => {
    try {
      const { editora } = request.query;

      const result = livros.find({ editora: editora }, {});
      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
