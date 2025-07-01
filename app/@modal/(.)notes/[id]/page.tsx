import { getSingleNote } from "@/lib/api";

import NotePreviewClient from "./NotePreview.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteModalPage = async ({ params }: Props) => {
  const { id } = await params;
  const idNumber = Number(id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", idNumber],
    queryFn: () => getSingleNote(idNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NoteModalPage;
