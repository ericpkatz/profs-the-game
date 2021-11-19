const express = require('express');
const app = express();
const path = require('path');
const redisClient = require('redis').createClient(process.env.REDIS_URL);


app.use('/client', express.static(path.join(__dirname, 'client')));

app.post('/api/scoreboard/:user', (req, res, next)=> {
  redisClient.zincrby('scoreboard', 1, req.params.user, (err, result)=> {
    if(err){
      next(err);
    }
    else {
      res.send({ result });
    }
  });
});

app.get('/api/scoreboard', (req, res, next)=> {
  redisClient.zrevrange('scoreboard', 0, -1, 'withscores', (err, scores)=> {
    if(err){
      next(err);
    }
    else {
      res.send({ scores });
    }
  });
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
