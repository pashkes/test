import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

const Header = async () => {
  const tags = [
    { id: 1, name: "Todo" },
    { id: 2, name: "Work" },
    { id: 3, name: "Personal" },
    { id: 4, name: "Meeting" },
    { id: 5, name: "Shopping" },
  ];

  return (
    <header className={css.header}>
      <Link className={css.navigationLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu categories={tags} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
