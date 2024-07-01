import React, { useState } from 'react';
import styles from './Navigation.module.css';
import Link from '@docusaurus/Link';
import { HeartIcon, MenuIcon } from '@heroicons/react/solid';
import { useScreenSize } from '../hooks/useScreenSize';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className={styles['navigation-container']}>
        <Link className={styles.logo} to="/" />

        <Buttons />
      </div>
      <div className={styles['navigation-container-mobile']}>
        <div className={styles['mobile-top-bar']}>
          <Link className={styles.logo} to="/" />
          <Link
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <MenuIcon className={styles['menu-icon']} />
          </Link>
        </div>

        {mobileMenuOpen && <Buttons mobile={true} />}
      </div>
    </>
  );
}

const Buttons = ({ mobile }) => {
  return (
    <div
      className={
        mobile ? styles['button-section-mobile'] : styles['button-section']
      }
    >
      <NavbarLink to="/install" text="Installation" />
      <NavbarLink to="/docs/get-started" text="Documentation" />
      <NavbarLink to="https://hub.espanso.org" text="Packages" />
      <NavbarLink to="https://www.reddit.com/r/espanso/" text="Community" />
      <NavbarLink
        to="https://github.com/federico-terzi/espanso"
        text="GitHub"
      />
      <ButtonLink
        to="/donate"
        text="Donate"
        icon={<HeartIcon className={styles['button-icon']} />}
      />
    </div>
  );
};

const NavbarLink = ({ to, text }) => {
  return (
    <Link className={styles.link} to={to}>
      {text}
    </Link>
  );
};

const ButtonLink = ({ to, text, icon }) => {
  return (
    <Link className={`${styles['button-link']} ${styles.link}`} to={to}>
      {icon}
      {text}
    </Link>
  );
};
