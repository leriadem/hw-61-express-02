export function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad Request');
  }

  next();
}

export function validateArticle(req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Bad Request');
  }

  next();
}