import FooterNav from '../Components/FooterNav/FooterNav';
import Header from '../Components/Header/Header';
import React from 'react';
import SidebarMenu from '../Components/SiderbarMenu/SiderbarMenu';

export default function Layout({ children, condicao }) {
  return (
    <>
      {condicao ? (
        <>
          <Header />
          <SidebarMenu />
          <main>{children}</main>
          <FooterNav />
        </>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
