const express = require('express');
const router = require('./routes/index');

const app = express();
app.use('/', router);

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Test server on port ${port}`);
  
  // Ici tu pourrais faire des requêtes HTTP de test
  console.log('Router chargé ✓');
  console.log('Routes:', router.stack.map(r => r.route?.path));
  
  server.close();
});
