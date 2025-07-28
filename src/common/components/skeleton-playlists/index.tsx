export const SkeletonPlaylists = ({ count }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="w-full h-[150px] bg-[#313131] mb-[30px] animate-pulse"
    ></div>
  ));
