import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToFavorites } from "../tracks/add-favorite";
import { deleteFromFavorites } from "../tracks/delete-favorite";
import { useUser } from "./use-user";

export const useFavoriteTrack = (trackId: string | null) => {
  const { data } = useUser();
  const queryClient = useQueryClient();

  const isFavorite = trackId ? data?.favorites?.includes(trackId) : false;

  const addMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFromFavorites,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const toggleFavorite = () => {
    if (!trackId) {
      return;
    }

    if (isFavorite) {
      deleteMutation.mutate(trackId);
    } else {
      addMutation.mutate(trackId);
    }
  };

  return { isFavorite, toggleFavorite };
};
