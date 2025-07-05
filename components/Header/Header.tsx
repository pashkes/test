// components/Header/Header.tsx

import css from './Header.module.css';
import Link from 'next/link';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  // Прибираємо запит
  // const categories = await getCategories()

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        Note HUB
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <CategoriesMenu />
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
