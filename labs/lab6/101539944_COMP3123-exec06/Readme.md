# Week06 Exercise - Notes Application

Build a Restful CRUD API for a simple Note-Taking application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```
2. Fix error and write Note API code

3. Run Server

```bash
node server.js
```

4. Optionally implement Docker OR vercel Hosting

5. Test all API on Postman and take screenshots at  URL <http://localhost:8081>

## Sample Note Payload

```json
{
    "content" : {
        "noteTitle": "Sample Note Title",
        "noteDescription": "Sample Note Description",
        "priority": "HIGH",
        "dateAdded": "06/Oct/2025",
        "dateUpdated": "06/Oct/2025"
    }
}
```
---

## Setup notes (MongoDB Atlas)

1. In MongoDB Atlas create a free cluster, then **Database Access** -> add a database user (username + password).
2. **Network Access** -> add your IP (or `0.0.0.0/0` for testing), otherwise the connection times out.
3. **Connect -> Drivers** -> copy the connection string and add a database name (`/notesdb`) before the `?`.
4. Copy `.env.example` to `.env` and paste the string as `DB_URL=` (`.env` is git-ignored, so the password is not pushed to GitHub).
5. `npm install`, then `npm run dev` (or `node server.js`). Server: <http://localhost:8081>

## API

| Method | URL | Description |
|---|---|---|
| POST | `/notes` | Create a note (body: sample payload above) |
| GET | `/notes` | Get all notes |
| GET | `/notes/:noteId` | Get one note |
| PUT | `/notes/:noteId` | Update a note (same body shape as POST) |
| DELETE | `/notes/:noteId` | Delete a note |

## Errors found in the starter code and fixed
1. `routes/NoteRoutes.js` required `../models/Notes.js`, but the file is `models/NotesModel.js`.
2. `models/NotesModel.js` had no schema/export, and `server.js` never mounted the note routes.
3. GET and DELETE routes checked `req.body.content`, which a GET/DELETE does not send (and in Express 5 `req.body` is `undefined` without a body, so it crashed) - check removed there, kept on POST and PUT.
4. `findByIdAndRemove` no longer exists in Mongoose 8 -> `findByIdAndDelete`.
5. `useNewUrlParser` / `useUnifiedTopology` are no-ops in Mongoose 8 -> removed.
6. `server.js` logged "listening on port 3000" while listening on `PORT` (8081) -> fixed.
