require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let shortUrl;
let url;

app.post("/api/shorturl", (req,res)=>{
  url = req.body.url;
  try {
  new URL(url);
}
  catch (err) {
    return res.json({ "error": 'invalid url' })
  }
  shortUrl = Math.floor(Math.random() * 10);
  res.json({"original_url":url,"short_url":shortUrl})
})

app.get("/api/shorturl/:shortUrlId",(req,res)=>{
  const shortUrlId = parseInt(req.params.shortUrlId);
  if(shortUrl === shortUrlId ) res.redirect(url)
    res.json({"error": 'invalid url'})
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
