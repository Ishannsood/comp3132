const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USER_FILE = path.join(__dirname, '..', 'user.json');

// Read and parse user.json (rejects if the file is missing or invalid)
const readUser = async () => {
  const data = await fs.promises.readFile(USER_FILE, 'utf8');
  return JSON.parse(data);
};

// Escape user input before putting it into an HTML response
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', async (req, res, next) => {
  try {
    const user = await readUser();
    res.json(user);
  } catch (err) {
    next(err); // handled by the error middleware in index.js
  }
});



/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = await readUser();

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }

    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }

    res.json({ status: true, message: 'User Is valid' });
  } catch (err) {
    next(err);
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// Works as /logout/bret (path parameter) and also /logout?username=bret
router.get('/logout/:username?', (req, res) => {
  const username = req.params.username || req.query.username;

  if (!username) {
    return res.status(400).send('<b>username is required.</b>');
  }

  res.send(`<b>${escapeHtml(username)} successfully logged out.</b>`);
});

module.exports = router;
