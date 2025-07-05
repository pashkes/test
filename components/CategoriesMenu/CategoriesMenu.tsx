'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category, getCategories } from '@/lib/api/clientApi';
// import css from './CategoriesMenu.module.css';

const CategoriesMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const toggle = () => setIsOpenMenu(!isOpenMenu);

  // Додаємо стан
  const [categories, setCategories] = useState<Category[]>([]);

  // Додаємо ефект для запиту
  useEffect(() => {
    // Змінюємо стан
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <button onClick={toggle}>Notes</button>
      {isOpenMenu && (
        <ul>
          <li>
            <Link href={`/notes/filter/all`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
