const ul = document.querySelector('ul');
const h2 = document.querySelector('h2');

ul.addEventListener('click', async(ev)=> {
  if(ev.target.tagName === 'BUTTON'){
    const user = ev.target.getAttribute('data-user');
    await axios.post(`/api/scoreboard/${user}`)
  }
});

const start = async()=> {
  try {
    const response = await axios.get('/api/scoreboard');
    const scores = response.data.scores;
    for(let i = 0; i < scores.length; i = i + 2){
      const user = scores[i];
      const button = document.querySelector(`[data-user=${ user }]`);
      button.innerHTML = `${user} (${ scores[i + 1] })`;
    }
    if(scores.length){
      h2.innerHTML = scores[0];
    }
  }
  catch(ex){
    console.log(ex);
  }
};

setInterval(start, 500);

