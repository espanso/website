import { useMemo } from "react";

function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "mac";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "win";
  } else if (!os && /Linux/.test(platform)) {
    os = "linux";
  }

  return os;
}

export function useOS() {
  const os = useMemo(() => getOS(), []);

  return {
    os,
  };
}
