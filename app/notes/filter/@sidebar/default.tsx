import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shoping"];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link className={css.menuLink} href={`/notes/filter/all`}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={tag} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
