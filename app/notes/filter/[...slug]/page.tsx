import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? "All";
  const isAll = tag === "All";

  const pageTitle = isAll ? "All" : tag;

  const pageDescription = isAll
    ? "Create by GoIT"
    : `Notes “${tag}”, Create by GoIT`;

  const canonicalUrl = `/notes/filter/${tag}`;
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
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
}
export default async function FilteredNotesPage({ params }: Props) {
  const tags = await params;
  const tag = tags.slug?.[0] === "All" ? undefined : tags.slug?.[0];

  try {
    const initialData = await fetchNotes(1, "", tag);

    return <Notes initialData={initialData} tag={tag} />;
  } catch(err) {
    console.log(err)
    return notFound();
  }
}
