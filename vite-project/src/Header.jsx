import React from 'react';
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
    <div className={styles.logo}>
      <a href="/">MyLogo</a>
    </div>
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li><a href="#about">О нас</a></li>
        <li><a href="#services">Услуги</a></li>
        <li><a href="#contact">Контакты</a></li>
      </ul>
    </nav>
  </header>
  );
}

export default Header;
