export function checkArticlePermission(req, res, next) {
  const role = req.headers['x-role'];

  if (role !== 'admin') {
    return res.status(403).send('Forbidden');
  }

  next();
}