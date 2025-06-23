"use client";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";

export default function NoteClient({ note }: { note: Note }) {
  const router = useRouter();

  const closeModal = () => router.back();

  return (
    <Modal closeModal={closeModal}>
      <NotePreview note={note} />
    </Modal>
  );
}
