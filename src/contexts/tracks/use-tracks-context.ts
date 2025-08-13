import { useContext } from "react";

import { TracksContext } from "./context";

export const useTracksContext = () => {
  const tracksCtx = useContext(TracksContext);

  if (!tracksCtx) {
    throw new Error("[useTracksContext] Hook should be used inside Provider");
  }

  return tracksCtx;
};
