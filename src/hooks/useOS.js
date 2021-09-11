import { useMemo } from "react";

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "mac";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "win";
  } else if (!os && /Linux/.test(platform)) {
    os = "linux";
  }

  return os;
}

export const useOS = () => {
  const os = useMemo(() => getOS(), []);

  return {
    os,
  };
};
