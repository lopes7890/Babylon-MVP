import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import FooterNav from './Components/FooterNav/FooterNav';
import Header from './Components/Header/Header';
import BookDetail from './Pages/BookDetail';
import Profile from './Pages/Profile';
import LoginSignup from './Pages/LoginSinup';
import IaStoryTeller from './Pages/IaStoryTeller';
import Lives from './Pages/Lives';
import WorkShop from './Pages/WorkShop';
import Library from './Pages/Library';
import Feed from './Pages/Feed';
import BookClub from './Pages/BookClub';
import Layout from './template/layout';
import { LoggedProvider } from './contexts/loggedContext';

// import Login from './Pages/Login';

const App = () => {
  const rotasSemTemplate = ['/login'];
  const paginaAtual = useLocation();
  const usarTemplate = !rotasSemTemplate.includes(paginaAtual.pathname);

  return (
    <>
      <LoggedProvider>
        <div>
          <Layout condicao={usarTemplate}>
            <Routes>
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/iastory" element={<IaStoryTeller />} />
              <Route path="/lives" element={<Lives />} />
              <Route path="/workshop" element={<WorkShop />} />
              <Route path="/library" element={<Library />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/bookclub" element={<BookClub />} />
            </Routes>
          </Layout>
          {/* <FooterNav /> */}
        </div>
      </LoggedProvider>
    </>
  );
};

export default App;
