import { useState } from "react";

const useSkeleton = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);

  const handleImageLoaded = () => {
    setIsSkeleton(false);
  };

  return [isSkeleton, handleImageLoaded];
};

export default useSkeleton;
