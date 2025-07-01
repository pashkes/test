"use client";
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import { Category } from "@/types/note";

type TagsMenuProps = {
  categories: Category[];
};

const TagsMenu = ({ categories }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              className={css.menuLink}
              href={`/notes/filter/All`}
              onClick={toggle}
            >
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={css.menuItem}>
              <Link
                className={css.menuLink}
                href={`/notes/filter/${category.name}`}
                onClick={toggle}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TagsMenu;
