# COMP3123 - exec04 Express JS Project

## Setup
```
npm install
npm run dev     # starts with nodemon (auto-restart)
# or
npm start       # plain node
```
Server runs on http://localhost:3000 by default.

## Summary of Changes
- Built an Express.js app (`index.js`) using the `express` framework.
- Added `express` and `nodemon` to `package.json`.
- Implemented the required routes:
  - `GET /hello` → returns `Hello Express JS` as plain text.
  - `GET /user` → reads `firstname`/`lastname` from the query string, defaulting to `Pritesh`/`Patel` if not provided.
  - `POST /user/:firstname/:lastname` → reads `firstname`/`lastname` from the URL path.
  - `POST /users` → reads a JSON array of `{ firstname, lastname }` objects from the request body and echoes it back.
- Added `express.static()` middleware serving the `public/` folder, so `instruction.html` is reachable at `http://localhost:3000/instruction.html`.

## Testing
```
curl http://localhost:3000/hello
curl "http://localhost:3000/user?firstname=John&lastname=Doe"
curl -X POST http://localhost:3000/user/John/Doe
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '[{"firstname":"Pritesh","lastname":"Patel"},{"firstname":"John","lastname":"Doe"},{"firstname":"John","lastname":"Rome"}]'
# Static file:
# http://localhost:3000/instruction.html
```
