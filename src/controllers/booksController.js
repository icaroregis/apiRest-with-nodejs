import { authors, livros } from '../models/index.js';

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

      //Verifica a existência do id
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

      //Verifica se os campos obrigatórios foram passados.
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

      //verifica se o livro já esta cadastrado no banco
      const existingLivro = await livros.findOne({ titulo });
      if (existingLivro) {
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

      //Verifica a existência do id
      const result = await livros.findById(id).populate('autor').exec();
      if (!result) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      //Verifica se os campos obrigatórios foram passados.
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

      //verifica se o livro já esta cadastrado no banco
      const existingLivro = await livros.findOne({ titulo });
      if (existingLivro) {
        return response
          .status(409)
          .send({ message: 'Este Livro já está cadastrado' });
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

      //Verifica a existência do id
      const result = await livros.findById(id).populate('autor').exec();
      if (!result) {
        return response.status(404).send({ message: `${id} id not found!!` });
      }

      await livros.findByIdAndDelete(id);
      response.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  static searchBookByFilter = async (request, response, next) => {
    try {
      const busca = await processaBusca(request.query);
      const result = await livros.find(busca).populate('autor');
      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  //Fazendo busca pelo titulo ou editora ou os dois.
  //const regexTitulo = new RegExp(titulo, 'i');
  //const regexEditora = new RegExp(editora, "i");
  const busca = {};
  editora ? (busca.editora = { $regex: editora, $options: 'i' }) : '';
  titulo ? (busca.titulo = { $regex: titulo, $options: 'i' }) : '';

  //inicializando uma nova propriedade numeroPaginas ao objeto busca como objeto vazio.
  minPaginas || maxPaginas ? (busca.numeroPaginas = {}) : '';

  //gte = Greater Than or Equal = Maior ou igual que.
  minPaginas ? (busca.numeroPaginas.$gte = minPaginas) : '';
  //lte = Less Than or Equal = Menor ou igual que.
  maxPaginas ? (busca.numeroPaginas.$lte = maxPaginas) : '';

  if (nomeAutor) {
    const autor = await authors.findOne({ nome: nomeAutor });
    const autorId = autor._id;

    busca.autor = autorId;
  }

  return busca;
}

export default BookController;
