import { useUser } from "@/api/hooks/use-user";
import { Title } from "@/common/components/title";
import { TracksList } from "@/features/tracks-list";

export const MyTracksPage = () => {
  const { data } = useUser();

  const favoriteIds = data?.favorites || [];

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        Мои треки
      </Title>

      {favoriteIds.length > 0 ? (
        <TracksList ids={favoriteIds} />
      ) : (
        <Title tag="h2" size="xl">
          Вы еще не добавили ни одного трека в избранное
        </Title>
      )}
    </div>
  );
};
