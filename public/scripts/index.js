const nav = document.querySelector(".main_nav ul");
let movies = [];
let removeButtons = document.querySelectorAll(".removeMovie");
const confirmChartBtn = document.querySelector('.confirmBtn')

let chart = [];
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  let li = document.createElement("li");
  li.setAttribute('class', "user")
  li.innerText = user.name;
  nav.appendChild(li);
};

const createMowiesList = movies => {
  const action = movies.find(val => val.genre === "action");
  console.log(action);
};

const groupByCategory = movies => {
  let sorted = movies.sort((a, b) => {
    if (a.genre.name > b.genre.name) {
      return 1;
    } else {
      return -1;
    }
  });
  let grupedMovies = [];
  movies.forEach(movie => {
    let p = grupedMovies.find(val => {
      if (val.genre === movie.genre.name) {
        return val;
      }
    });
    if (!p) {
      var q = {
        genre: movie.genre.name,
        movies: [movie]
      };
      grupedMovies.push(q);
    } else {
      p.movies.push(movie);
    }
  });
  return grupedMovies;
};

const getMovies = () => {
  fetch("/api/movies", {
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      createMowiesList(groupByCategory(res));
      movies = res;
      createHero(movies);
      console.log(res);
    })
    .catch(err => console.log(err));
};

const createHero = movies => {
  const container = document.querySelector(".hero");

  movies.forEach(movie => {
    let div = document.createElement("div");
    div.dataset.movieId = movie._id;
    div.innerHTML = `<img src=${movie.images}>
    <span>${movie.title}</span>`;
    container.appendChild(div);
  });

  const slides = [...document.querySelectorAll(".hero > div")];
  slides.forEach(slide => {
    slide.addEventListener("click", createRentalMovie);
  });
  let current = 0;
  slides[current].classList.add("current");

  setInterval(() => {
    slides[current].classList.remove("current");
    current += 1;
    if (slides[current]) {
      slides[current].classList.add("current");
    } else {
      current = 0;
      slides[current].classList.add("current");
    }
  }, 3000);
};

getMovies();
getUser();

const img = movies => {
  const imgBox = document.querySelector(".img");
  let imgs = [];
  movies.forEach(movie => {
    if (movie.images !== undefined) {
      imgs.push(movie.images);
    }
  });
  imgBox.setAttribute("src", imgs[0]);
  console.log(imgs);
};

function createRentalMovie() {
  let movie = movies.find(val => val._id === this.dataset.movieId);
  let isIn = chart.find(val => val.movie.title === movie.title);
  if (isIn) {
    isIn.quantity += 1;
  } else {
    chart.push({
      movie,
      quantity: 1
    });
  }
  
  updateChart();
}

function updateChart() {
  const chartContainer = document.querySelector(".chartTable");
  chartContainer.innerHTML = "";
  let chartHtml = `<tr>
      <th>tytul</th>
      <th>ilosc</th>
      <th>cena</th>
    </tr>
    ${chart
      .map(val => {
        return `<tr>
      <td>${val.movie.title}</td>
      <td>${val.quantity}</td>
      <td>${val.movie.dailyRentalRate}</td>
      <td data-movieid=${val.movie._id} onclick="removeMovieFromChart()" class="removeMovie">X</td>
    </tr>
  
    `;

      })
      .join("")}
    `;
  chartContainer.innerHTML = chartHtml;
}

function removeMovieFromChart() {
  let removeButtons = [...document.querySelectorAll(".removeMovie")];
  removeButtons.forEach(val => {
    val.addEventListener("click", function() {
      console.log(`movie to remove ${val.dataset.movieid}`);
      chart = chart.filter(item => item.movie._id !== val.dataset.movieid);
      console.log(chart);
      updateChart();
    });
  });
}





confirmChartBtn.addEventListener('click', () => {
  console.log(chart)
  if (chart.length > 1) {
    console.log('w koszyku sa dwa filmy')
  }
  const rental = {
    customerId: "5dcd56bba8a0833f2c684a83",
    movieId: chart[0].movie._id || ""
  }
  console.log(rental)
  fetch('/api/rental', {
    method : "POST",
    headers: {
      "Content-Type": "application/json"
    
    },
    body : JSON.stringify(rental)

  }).then(res => res.json())
    .then(res =>  console.log(res))
    .catch(err => console.log(err))
  
})