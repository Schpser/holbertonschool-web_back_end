// Test with provided datas
const { readDatabase } = require('utils.js');

readDatabase('../database.csv')
  .then(data => {
    console.log('CS étudiants:', data.CS);
    console.log('SWE étudiants:', data.SWE);
    console.log('Total CS:', data.CS.length);
    console.log('Total SWE:', data.SWE.length);
  })
  .catch(error => {
    console.error('Erreur:', error.message);
  });
