import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Menubar from './components/MenuBar';
import MenuPage from './components/MenuPage';
import Home from './components/Home';
import Write from './components/Write';
import AllPosts from './components/AllPosts';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Menubar className="Menubar" />
      <div className="App">
        <Routes>
          <Route className="Home" path="/" element={<Home />} />
          <Route className="AllPosts" path="/allposts" element={<AllPosts />} />
          <Route className="MenuPage" path="/menu/:id" element={<MenuPage />} />
          <Route path="/write/:id" element={<Write />} />
          <Route
            className="PostDetail"
            path="/post/:id"
            element={<PostDetail />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
