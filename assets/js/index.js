/** @jest-environment jsdom */
let responseList = [];
const text = '';
const ul = document.getElementById('response-list');
// console.log(ul);

const addPrompt = async function() {
  const newPrompt = document.getElementById('desc').value;

  const data = {
    prompt: newPrompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  if(data.prompt !== ''){
    const data2 = JSON.stringify(data);
    const api_url = `/request/${data2}`;

    await fetch(api_url)
      .then(async response  => response.json())
      .then(async info => {
        await fetch('/responses', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            prompt: data.prompt,
            response: info,
          })
        })
          .catch(error =>{
            console.log('Error', error);
          });
      });
 
    document.getElementById('desc').value  = '';
  }else{
    const err = document.getElementById('error').children[0];
    err.innerText = ('No response available OR enter more suitable prompt');
    err.style.backgroundColor = '#ff726f';
    err.style.color = 'white';
    setTimeout(() =>  err.innerText = '', 5000);
  } 
};

//get list of responses from database
const displayResponses = async function(){
  await fetch('/responses', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      for( const result of data){
        responseList.push(result);
      }
    })
    .then(function(){
      //clear previous rendered list
      ul.innerHTML = '';

      //build and render updated list
      responseList.forEach((result, i) => {
        let info = result.response;
        info = info.replace(/(^\r\n|^\n|^\r)/gm, '');
        console.log(info)
        const div = document.createElement('div');
        const header1 = document.createElement('h4');
        header1.appendChild(document.createTextNode('Prompt: '));
      
        const header2 = document.createElement('h4');
        header2.appendChild(document.createTextNode('Response: '));

        const p1 = document.createElement('p');
        p1.innerText = result.prompt;
        const p2 = document.createElement('p');
        p2.innerText = info;

        const br = document.createElement('br');

        div.appendChild(header1);
        div.appendChild(p1);
        div.appendChild(br);
        div.appendChild(header2);
        div.appendChild(p2);

        const li = document.createElement('li');
        li.setAttribute('id', result._id);

        //add delete functionality to each item in list
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.setAttribute('id', result._id);
        deleteBtn.classList.add('del');
        deleteBtn.onclick = async function(event) {
          console.log(event);
          await fetch('/responses', {
            method: 'DELETE',
            body: JSON.stringify({
              id: event.target.id
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
          const parent = event.target.parentNode;
          parent.parentNode.removeChild(parent);
        };

        // console.log(div);
        li.appendChild(div);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
      }); 
    });
  responseList = [];
};


document.addEventListener('DOMContentLoaded', async () => {
  const sendBtn = document.getElementById('send');
  sendBtn.addEventListener('click', addPrompt);
  await displayResponses();
  const poll = setInterval(() => displayResponses(), 2000);
});

export default {
  addPrompt,
  displayResponses
};