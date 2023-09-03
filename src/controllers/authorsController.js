import authors from '../models/Autor.js';

class AuthorController {
  static listAuthors = async (request, response, next) => {
    try {
      const result = await authors.find({});
      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  static listAuthorById = async (request, response, next) => {
    try {
      const { id } = request.params;
      const result = await authors.findById(id);

      if (!result) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  static createAuthor = async (request, response, next) => {
    try {
      const { nome, nacionalidade } = request.body;

      if (!nome || !nacionalidade) {
        return response
          .status(400)
          .send({ message: 'Nome and Nacionalidade are required!' });
      }

      const existingAuthor = await authors.findOne({ nome });

      if (existingAuthor) {
        return response
          .status(409)
          .send({ message: 'Este autor já está cadastrado' });
      }

      const livro = new authors({ nome, nacionalidade });
      const result = await livro.save();

      response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (request, response, next) => {
    try {
      const { id } = request.params;
      const { nome, nacionalidade } = request.body;

      if (!id) {
        return response.status(400).json({ message: `${id} id not found!!` });
      }

      if (!nome || !nacionalidade) {
        return response.status(400).send({
          message: 'Nome and Nacionalidade are required!',
        });
      }

      const existingAuthor = await authors.findOne({ nome });

      if (existingAuthor) {
        return response
          .status(409)
          .send({ message: 'Este autor já está cadastrado' });
      }

      await authors.findByIdAndUpdate(id, {
        $set: { nome, nacionalidade },
      });

      response.status(200).send({ message: 'Autor atualizado com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (request, response, next) => {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      await authors.findByIdAndDelete(id);
      response.status(200).send({ message: 'Autor removido com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
