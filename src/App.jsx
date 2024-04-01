import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import './App.css';

import { firestore } from './firebase';

import Header from './components/Header';
import Menubar from './components/MenuBar';
import MenuPage from './components/MenuPage';
import Home from './components/Home';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log(firestore);
  });

  return (
    <BrowserRouter>
      <Header />
      <Menubar className="Menubar" />
      <div className="App">
        <Routes>
          <Route className="Home" path="/" element={<Home />} />
          <Route path="/menu/:id" element={<MenuPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
