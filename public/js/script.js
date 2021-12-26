
 const form = document.querySelector('#formAsk')

function sendAsk(e) {
  e.preventDefault();
  console.log(e.target);
}

  form.addEventListener('submit', sendAsk)
