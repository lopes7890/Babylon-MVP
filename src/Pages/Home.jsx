import React from 'react';
import Header from '../Components/Header/Header';
import SiderbarMenu from '../Components/SiderbarMenu/SiderbarMenu';
// import SearchBar from '../Components/SearchBar/SearchBar';
import Recommendations from '../Components/Recommendations/Recommendations';
import BookSearch from '../Components/BookSearch/BookSearch';
import FooterNav from '../Components/FooterNav/FooterNav';
import RandomBooks from '../Components/RandomBooks/RandomBooks';

function Home() {
  return (
    <div>
      {/* <Header /> */}

      {/* <SiderbarMenu /> */}
      {/* <SearchBar /> */}
      {/* <BookSearch />  */}
      {/* <Recommendations /> */}
      <RandomBooks />
      {/* <FooterNav /> */}
    </div>
  );
}

export default Home;
