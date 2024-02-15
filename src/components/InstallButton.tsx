import React, { useMemo } from "react";
import styles from "./InstallButton.module.css";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useOS } from "../hooks/useOS";

function InstallButton() {
  const { os } = useOS();

  const { link, text, subtitle } = useMemo(() => {
    switch (os) {
      case "linux":
        return {
          link: "/docs/install/linux",
          text: "Get Started on Linux",
          subtitle: "Also available on macOS and Windows",
        };
      case "mac":
        return {
          link: "/docs/install/mac",
          text: "Get Started on macOS",
          subtitle: "Also available on Windows and Linux",
        };
      case "win":
        return {
          link: "/docs/install/win",
          text: "Get Started on Windows",
          subtitle: "Also available on macOS and Linux",
        };
      default:
        return {
          link: "/install",
          text: "Get Started",
          subtitle: "Available on macOS, Windows and Linux",
        };
    }
  }, [os]);

  return (
    <div className={styles.container}>
      <Link to={link}>
        <div className={styles.button}>
          <span>{text}</span>
        </div>
      </Link>
      <Link className={styles.subtitle} to="/install">
        {subtitle}
      </Link>
    </div>
  );
}

const Wrapper = () => {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => InstallButton()}
    </BrowserOnly>
  );
};

export default Wrapper;
