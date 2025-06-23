import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const tags = await params;
  const tag = tags.slug?.[0] === "all" ? undefined : tags.slug?.[0];

  try {
    const initialData = await fetchNotes(1, "", tag);

    return <Notes initialData={initialData} tag={tag} />;
  } catch {
    return notFound();
  }
}
