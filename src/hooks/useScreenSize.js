import { useMediaQuery } from "react-responsive";

export const useScreenSize = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return {
    isLargeScreen: isDesktopOrLaptop,
  };
};
