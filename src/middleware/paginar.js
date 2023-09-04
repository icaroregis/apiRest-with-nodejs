export default async function paginar(request, response, next) {
  try {
    let {
      limite = 5,
      pagina = 1,
      campoOrdenacao = '_id',
      ordem = -1,
    } = request.query;

    limite = Number(limite);
    pagina = Number(pagina);
    ordem = Number(ordem);

    const resultado = request.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      response.status(200).send(resultadoPaginado);
    }
  } catch (error) {
    next(error);
  }
}
