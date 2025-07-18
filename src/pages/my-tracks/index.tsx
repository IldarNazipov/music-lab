import { getTracks } from "@/api/tracks/get-tracks";
import { getUser } from "@/api/user/get-user";
import { Spinner } from "@/common/components/spinner";
import { Title } from "@/common/components/title";
import { TracksTable } from "@/common/components/tracks-table";
import { useAuth } from "@/contexts/auth/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const MyTracksPage = () => {
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const updateUser = async () => {
      const user = await getUser();
      setCurrentUser(user);
    };

    updateUser();
  }, [setCurrentUser]);

  const { data: tracks, isLoading: tracksLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  const favoriteTracks =
    tracks?.filter((track) => currentUser?.favorites?.includes(track._id)) ||
    [];

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        Мои треки
      </Title>

      {tracksLoading ? (
        <Spinner className="flex items-center justify-center" />
      ) : favoriteTracks.length > 0 ? (
        <TracksTable tracks={favoriteTracks} isLoading={tracksLoading} />
      ) : (
        <Title tag="h2" size="xl">
          Вы еще не добавили ни одного трека в избранное
        </Title>
      )}
    </div>
  );
};
