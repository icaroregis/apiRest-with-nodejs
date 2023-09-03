import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(error, request, response, next) {
  if (error instanceof mongoose.Error.CastError) {
    response
      .status(400)
      .send({ message: 'Um ou mais dados fornecidos estão incorretos!' });
  }

  response.status(500).send({
    message: `${error.message}   
    An error occurred on the server.`,
  });
}
