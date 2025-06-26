"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";
import css from "./CreateNotePage.module.css";

export default function CreateNotePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/notes/filter/all"); // Redirect to the main notes list page
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Create New Note</h1>
      <NoteForm onClose={handleClose} />
    </div>
  );
}
