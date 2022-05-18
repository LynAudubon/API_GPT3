// let responseList = [];
// const text = '';
// const ul = document.getElementById('response-list');
// console.log(ul);


const addPrompt = async function() {
  const newPrompt = document.getElementById('desc').value;

  let data = {
    prompt: newPrompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  ///if data.prompt is null?????
  // console.log('pr',data.prompt);
  if(data.prompt !== ''){
    data = JSON.stringify(data);
    const api_url = `/request/${data}`;
    const response = await fetch(api_url);
    console.log('index',response.json());

    document.getElementById('desc').value  = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send');
  sendBtn.addEventListener('click', addPrompt);
  // const poll = setInterval(() => displayMessages(), 2000);
});
