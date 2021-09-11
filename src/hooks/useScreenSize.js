import { useMediaQuery } from "react-responsive";

export const useScreenSize = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  console.log(isDesktopOrLaptop);

  return {
    isLargeScreen: isDesktopOrLaptop,
  };
};
