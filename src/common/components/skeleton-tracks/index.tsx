export const SkeletonTracks = ({ count }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <li
      key={index}
      className="grid grid-cols-[6fr_4fr_3fr_70px] animate-pulse items-center mb-[12px]"
    >
      <div className="flex items-center">
        <div className="min-w-[51px] h-[51px] mr-[17px] bg-secondary-foreground" />
        <div className="w-full h-[19px] mr-[17px] bg-secondary-foreground" />
      </div>
      <div className="h-[19px] mr-[17px] bg-secondary-foreground" />
      <div className="h-[19px] mr-[17px] bg-secondary-foreground" />
      <div className="h-[19px] bg-secondary-foreground" />
    </li>
  ));
