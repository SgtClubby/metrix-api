const app = require('./app');

const port = 4242;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
