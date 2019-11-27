const form = document.querySelector("form");
const successBox = document.querySelector(".success p");

const seveUser = (user) => {
    localStorage.s
};

const responseHendler = res => {
  successBox.innerText = "";
  if (res.error) {
    successBox.innerText = res.error;
  } else {
    successBox.innerText = "user registered";
  }
};

form.addEventListener("submit", e => {
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  e.preventDefault();

  const user = {
    name,
    email,
    password
  };

  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      console.log(res.headers);
      return res.json();
    })
    .then(res => {
      responseHendler(res);

      console.log(res);
    })
    .catch(err => console.log(err));
});
