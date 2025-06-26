import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { // Modified to be synchronous as generateMetadata expects it
    slug?: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const tag = slug?.[0] === "all" || !slug?.[0] ? undefined : slug[0];
  const pageTitle = `Filtered Notes: ${tag || "All"} - Note Hub`;
  const description = `View notes filtered by ${tag || "all categories"}.`;
  const currentPath = `/notes/filter/${slug?.join("/") || "all"}`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      url: currentPath, // Assuming base URL is handled by Next.js or set in layout
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tag || "All"}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  // The params for the page component are resolved by Next.js before calling the component
  const slug = params.slug;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  try {
    const initialData = await fetchNotes(1, "", tag);

    return <Notes initialData={initialData} tag={tag} />;
  } catch {
    return notFound();
  }
}
