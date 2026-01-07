class AppController {
  static getHomepage(request, response) {
    response.status(200).type('text/plain').send('Hello Holberton School!');
  }
}

module.exports = AppController;
