import express from 'express';

// Ініціалізація app
const app = express();
app.use(express.json());

// Тимчасові "дані"
const users = new Set(['123']);
const articles = new Set(['456']);

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Get root route');
});

// Users routes
app.get('/users', (req, res) => {
  res.status(200).send('Get users route');
});

app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad Request');
  }

  res.status(201).send('Post users route');
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(`Get user by Id route: ${userId}`);
});

app.put('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  if (!name) {
    return res.status(400).send('Bad Request');
  }

  res.status(200).send(`Put user by Id route: ${userId}`);
});

app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
});

// Articles routes
app.get('/articles', (req, res) => {
  res.status(200).send('Get articles route');
});

app.post('/articles', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Bad Request');
  }

  res.status(201).send('Post articles route');
});

app.get('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;

  if (!articles.has(articleId)) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(`Get article by Id route: ${articleId}`);
});

app.put('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;
  const { title } = req.body;

  if (!articles.has(articleId)) {
    return res.status(404).send('Not Found');
  }

  if (!title) {
    return res.status(400).send('Bad Request');
  }

  res.status(200).send(`Put article by Id route: ${articleId}`);
});

app.delete('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;

  if (!articles.has(articleId)) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Server start
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export { server, app };