const express = require('express')
const app = express()
const path = require('node:path');
const msgRouter = require('./routes/msgRoute')

const port = 3000

function formatDate(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear() % 100;
  const hour = d.getHours();
  const minute = d.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 || 12;
  return `${month}/${day}/${year} ${hour12}:${minute.toString().padStart(2, '0')}${ampm}`;
}

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.use('/msg', msgRouter)

// Set routing
app.get('/', (req, res) => {
  res.render('index', {title: 'Mini Messageboard', messages: messages, formatDate: formatDate})
})

app.get('/new', (req, res) => {
  res.render('form')
})

app.get('/message/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= messages.length) {
    return res.status(404).send('Message not found');
  }
  const message = messages[id];
  res.render('message-detail', { message: message, formatDate: formatDate });
})

// Set views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Set styling
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

app.use(express.urlencoded({ extended: true }))

app.post('/new', (req, res) => {
  const { msgText, msgUser } = req.body
  messages.push({ text: msgText, user: msgUser, added: new Date()})
  res.redirect('/')
})

// Set port
app.listen(port, (error) => {
  if (error) {
    throw error
  }
  console.log(`Open on port localhost:${port}`)
})