import { getSingleNote } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";
import { Note } from "@/types/note"; // Assuming Note type is defined here

interface NoteDetailsProps {
  params: { id: string }; // Changed from Promise<{ id: string }>
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const id = params.id;
  const idNumber = Number(id);

  try {
    const note: Note | null = await getSingleNote(idNumber);

    if (note) {
      const description = note.content.substring(0, 160) + (note.content.length > 160 ? "..." : "");
      const title = `${note.title} - Note Hub`;
      return {
        title: title,
        description: description,
        openGraph: {
          title: title,
          description: description,
          url: `/notes/${id}`,
          images: [
            {
              url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
              width: 1200,
              height: 630,
              alt: note.title,
            },
          ],
          type: "article", // More specific type for a note/article
        },
      };
    } else {
      // Handle case where note is not found
      return {
        title: "Note Not Found - Note Hub",
        description: "The requested note could not be found or does not exist.",
        openGraph: {
          title: "Note Not Found - Note Hub",
          description: "The requested note could not be found or does not exist.",
          url: `/notes/${id}`,
          images: [
            {
              url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
              width: 1200,
              height: 630,
              alt: "Note Not Found",
            },
          ],
          type: "website",
        },
      };
    }
  } catch (error) {
    // Handle errors during fetch (e.g., network issue, API error)
    console.error("Error fetching note for metadata:", error);
    return {
      title: "Error Fetching Note - Note Hub",
      description: "There was an error trying to fetch the note details.",
      openGraph: {
        title: "Error Fetching Note - Note Hub",
        description: "There was an error trying to fetch the note details.",
        url: `/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Error Fetching Note",
          },
        ],
        type: "website",
      },
    };
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const id = params.id; // params is now an object, not a Promise
  const idNumber = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(idNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
