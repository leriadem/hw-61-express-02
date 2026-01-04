import express from 'express';

import { validateUser, validateArticle } from './middlewares/validate.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import { logRequests } from './middlewares/logger.mjs';
import { basicAuth } from './middlewares/auth.mjs';
import { checkArticlePermission } from './middlewares/permissions.mjs';

// Ініціалізація app
const app = express();
app.use(express.json());

// Тимчасові "дані"
const users = new Set(['123']);
const articles = new Set(['456']);

// Root
app.get('/', logRequests, (req, res) => {
  res.status(200).send('Get root route');
});

// Users routes
app.get('/users', basicAuth, (req, res) => {
  res.send('Get users route');
});

app.post('/users', basicAuth, validateUser, (req, res) => {
  res.status(201).send('Post users route');
});

app.get('/users/:userId', basicAuth, (req, res) => {
  const { userId } = req.params;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  res.send(`Get user by Id route: ${userId}`);
});

app.put('/users/:userId', basicAuth, validateUser, (req, res) => {
  const { userId } = req.params;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  res.send(`Put user by Id route: ${userId}`);
});

app.delete('/users/:userId', basicAuth, (req, res) => {
  const { userId } = req.params;

  if (!users.has(userId)) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
});

// Articles routes
app.get('/articles', checkArticlePermission, (req, res) => {
  res.send('Get articles route');
});

app.post('/articles', checkArticlePermission, validateArticle, (req, res) => {
  res.status(201).send('Post articles route');
});

app.get('/articles/:articleId', checkArticlePermission, (req, res) => {
  const { articleId } = req.params;

  if (!articles.has(articleId)) {
    return res.status(404).send('Not Found');
  }

  res.send(`Get article by Id route: ${articleId}`);
});

app.put('/articles/:articleId', checkArticlePermission, validateArticle, (req, res) => {
  const { articleId } = req.params;

  if (!articles.has(articleId)) {
    return res.status(404).send('Not Found');
  }

  res.send(`Put article by Id route: ${articleId}`);
});

app.delete('/articles/:articleId', checkArticlePermission, (req, res) => {
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

// Error handler
app.use(errorHandler);

// Server start
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export { server, app };