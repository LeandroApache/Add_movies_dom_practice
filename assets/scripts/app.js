// const startAddMovieButton = document.querySelector("header").lastElementChild;
const startAddMovieButton = document.querySelector("header button");
// const addMovieModal = document.querySelector("#add-modal");
// const addMovieModal = document.getElementById("add-modal");
const addMovieModal = document.body.children[1];
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const backdrop = document.querySelector("#backdrop");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
// const movieModalBackdrop = document.body.firstElementChild;
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const hideMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = function () {
  hideMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id == movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  let movieList = document.getElementById("movie-list");
  movieList.children[movieIndex].remove();
  //   movieList.removeChild(movieList.children[movieIndex]);
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
  //   deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imgUrl, rating) => {
  let newMovie = document.createElement("li");
  let movieList = document.getElementById("movie-list");
  newMovie.className = "movie-element";
  newMovie.innerHTML = `
		<div class='movie-element__image'>
			<img src ='${imgUrl}' alt='${title}'>
		</div>
		<div class='movie-element__info'>
		<h2>${title}</h2>
		<p>${rating}/5 stars</p>
		</div>
	`;
  newMovie.addEventListener("click", startDeleteMovieHandler.bind(null, id));
  movieList.appendChild(newMovie);
};

const addMovieHandler = function () {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() == "" ||
    imageUrlValue.trim() == "" ||
    ratingValue.trim() == "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values. Rating between 1 to 5.");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  hideMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieDeletionModal();
  hideMovieModal();
  clearMovieInputs();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
