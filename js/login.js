// let mask = document.querySelector('.mask');

// window.addEventListener('load', () => {
//     mask.classList.add('hide');
//     setTimeout(() => { 
//         mask.remove();
//     },1000)
// });

let token = localStorage.token;

if (token) {
  document.location.replace("index.html");
}

let loginForm = document.querySelector("#login-form");
let login = document.getElementById('email').value;
let password1 = document.getElementById('password').value;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = e.target[0].value;
  let password = e.target[1].value;

  let {
    data: { token },
  } = await axios.post("https://reqres.in/api/login", { email, password });
   
  localStorage.token = token;
  if(login == 'eve.holt@reqres.in'  && password == 'cityslicka')
     document.location.replace("index.html");
     else alert('Prol yoki Email notogri')
});



