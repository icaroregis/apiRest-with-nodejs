// eslint-disable-next-line no-unused-vars
export default function manipulador404(request, response, next) {
  response.status(404).send({ message: 'Page not found' });
}
