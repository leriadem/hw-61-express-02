# Express 02 — Middleware Extension

## 📌 Опис проєкту

Цей проєкт є розширенням Express-сервера, створеного в рамках попереднього завдання (HW01).  
У даній роботі реалізовано підключення та використання middleware для логування, базової автентифікації, валідації даних, перевірки прав доступу та глобальної обробки помилок.

Проєкт реалізовано з використанням **Node.js** та **Express.js**, з дотриманням принципів **MVC-архітектури** у спрощеному вигляді (без бази даних).

---

## 🛠 Технології

- Node.js
- Express.js
- ES Modules (`.mjs`)
- npm

## 📁 Структура проєкту

src/
├── _test_/
│ └── task1.test.js
├── middlewares/
│ ├── logger.mjs
│ ├── auth.mjs
│ ├── validate.mjs
│ ├── permissions.mjs
│ └── errorHandler.mjs
└── server.mjs

## 🚀 Запуск проєкту

1. Встановити залежності:
   npm install

Запустити сервер:
node src/server.mjs

http://localhost:3000

🔌 Реалізовані middleware

🔹 Логування

Відстежує HTTP-метод та URL запиту
Використовується для маршруту /

🔹 Базова автентифікація

Перевіряє наявність заголовка Authorization
Використовується для маршрутів /users та /users/:userId

🔹 Валідація даних

Перевіряє наявність обовʼязкових полів у тілі запиту
Для користувачів: name
Для статей: title

🔹 Перевірка прав доступу

Перевіряє заголовок x-role
Доступ до статей дозволено лише з роллю admin

🔹 Глобальна обробка помилок

Повертає статус 500 Internal Server Error
Запобігає падінню сервера при помилках

📌 Маршрути API
Root
GET / — повертає текст Get root route

Users
GET /users
POST /users
GET /users/:userId
PUT /users/:userId
DELETE /users/:userId

Articles
GET /articles
POST /articles
GET /articles/:articleId
PUT /articles/:articleId
DELETE /articles/:articleId
