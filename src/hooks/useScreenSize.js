import { useMediaQuery } from "react-responsive";

export const useScreenSize = () => {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return {
    isLargeScreen: !isSmallScreen,
  };
};
