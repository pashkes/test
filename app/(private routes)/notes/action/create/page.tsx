import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create by go It",
  metadataBase: new URL("http://localhost:3000/notes/action/create"),
  openGraph: {
    title: "Create Note",
    description: "Create by go It",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
