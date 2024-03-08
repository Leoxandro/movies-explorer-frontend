export const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];
export const filmsURL = 'https://api.nomoreparties.co';
export const apiURL = 'https://api.karpov.nomoredomainswork.ru';
export const portfolio = [
    {
      path: "https://leoxandro.github.io/how-to-learn/",
      title: "Статичный сайт",
    },
    {
      path: "https://leoxandro.github.io/russian-travel/",
      title: "Адаптивный сайт",
    },
    {
      path: "https://github.com/Leoxandro/react-mesto-api-full-gha",
      title: "Одностраничная соц-сеть",
    },
  ];
export const navigationRoutes = [
    { path: "/", title: "Главная", smallScreenOnly: true },
    { path: "/movies", title: "Фильмы" },
    { path: "/saved-movies", title: "Сохраненные фильмы" },
  ];
export const settings = [ //eslint-disable-line
{ width: 1280, moviesPerPage: 16, addMovies: 4 },
{ width: 990, moviesPerPage: 9, addMovies: 3 },
{ width: 768, moviesPerPage: 8, addMovies: 2 },
{ width: 320, moviesPerPage: 5, addMovies: 2 }
];
export const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]*$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;