const form = document.querySelector("form");
const successBox = document.querySelector(".success p");

const saveUserData = (user)  => {
  localStorage.setItem('token', user.token)
  localStorage.setItem('user', JSON.stringify(user.user))

}


const responseHendler = (res) => {
    if (res.error) {
      successBox.innerText = res.error
    }
    saveUserData(res)
    window.location.href = "index.html"
 }



form.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const user = {

    email,
    password
  };
  

  fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(res =>{ 
    responseHendler(res)
      console.log(res)})
    .catch(err =>  {
      console.log('errrrooorrr')
      console.log(err)
    });
});
