import { getSingleNote } from "@/lib/api";

import NoteClient from "./Note.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteModalPage = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(Number(id));

  return <NoteClient note={note} />;
};

export default NoteModalPage;
