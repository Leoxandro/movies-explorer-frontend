import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import currentUserContext from '../../context/currentUserProvider';


const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
        </Routes>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
