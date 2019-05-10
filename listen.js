const app = require('./app');

const { PORT = 9092 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});