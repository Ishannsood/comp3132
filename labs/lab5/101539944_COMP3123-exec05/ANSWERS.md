# COMP3123 exec05 - Answers

## Run
```
npm install
npm run dev     # nodemon (auto-restart)   |   npm start  -> plain node
```
Server: http://localhost:8081

| Method | URL | Result |
|---|---|---|
| GET | `/home` | serves `home.html` (`<h1>Welcome to ExpressJs Tutorial</h1>`) |
| GET | `/api/v1/user/profile` | all details from `user.json` as JSON |
| POST | `/api/v1/user/login` | JSON body `{ "username": "bret", "password": "bret@123" }` -> validity message |
| GET | `/api/v1/user/logout/:username` | `<b>{username} successfully logged out.</b>` (also accepts `?username=`) |

## Errors found in the starter code and fixed
1. `index.js` used `router.get('/home', ...)` but `router` does not exist there -> changed to `app.get`.
2. `app.use('api/v1/user', ...)` was missing the leading slash -> `'/api/v1/user'`.
3. `routes/users.js` never imported `express`, and declared `routerUser` but used `router` -> imported express and used one consistent `router` variable.
4. No JSON body parser, so `req.body` could not be read in `/login` -> added `app.use(express.json())`.
5. The error middleware replied with a plain message and status 200 -> now `res.status(500).send('Server Error')`.
6. `process.env.port` -> `process.env.PORT` (see the Bonus answer).

---

## Section B

### 6. Purpose of `express.Router()`
`express.Router()` creates a small, self-contained "mini application" that holds its own routes (and optionally its own middleware). In this project all user-related routes (`/profile`, `/login`, `/logout`) live in `routes/users.js`, and `index.js` plugs them in with `app.use('/api/v1/user', userRouter)`, so every route in that file automatically gets the `/api/v1/user` prefix.

Benefits for code structure:
- **Separation of concerns** - `index.js` stays small and only wires the app together; each feature gets its own file.
- **Reusability / prefixes** - the same router can be mounted at different paths, and versioning (`/api/v1`) is easy.
- **Scoped middleware** - middleware such as authentication can be applied to just one router.
- **Maintainability** - easier to read, test and extend as the number of routes grows.

### 7. Error handling in Express routes
Express has a special kind of middleware with four parameters, `(err, req, res, next)`. It must be registered **after** all routes, and it acts as a central place to deal with errors.

- Errors thrown synchronously inside a route are caught by Express automatically.
- Errors in asynchronous code (callbacks, promises, `async/await` in Express 4) must be passed on with `next(err)`, usually from a `try/catch`.
- Expected problems (e.g. a wrong password) are handled directly in the route with a suitable response.

Example (file not found / server errors when reading `user.json`):

```js
// route
router.get('/profile', async (req, res, next) => {
  try {
    const data = await fs.promises.readFile(USER_FILE, 'utf8'); // throws if the file is missing
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);            // forward to the error middleware
  }
});

// error-handling middleware (after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});
```

If `user.json` is missing or contains invalid JSON, the client receives `500 - Server Error` instead of the server crashing or hanging.

---

## Section C - Bonus

### Dynamic port binding: `app.listen(process.env.PORT || 8081)`
`process.env` holds the environment variables of the running Node process. `process.env.PORT` is the port the environment wants the app to use; if it is not set, the `||` (logical OR) falls back to `8081`.

- **Production / cloud hosting** (Heroku, Render, Azure, etc.) assigns a port dynamically and passes it in the `PORT` variable. The app must listen on that port or the platform cannot route traffic to it.
- **Local development** - `PORT` is normally not set, so the app uses `8081`.
- The same code therefore runs everywhere with no edits, and the port can be changed without touching the source (configuration lives in the environment).
- Note: environment variable names are case-sensitive on Linux/macOS (the convention is upper-case `PORT`); the starter's lowercase `process.env.port` only works on Windows, which is case-insensitive.
