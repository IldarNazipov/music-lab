import { getUser } from "@/api/user/get-user";
import { Title } from "@/common/components/title";
import { useAuth } from "@/contexts/auth/use-auth";
import { TracksList } from "@/features/tracks-list";
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

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        Мои треки
      </Title>

      {<TracksList ids={currentUser?.favorites} />}
    </div>
  );
};
