import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./install.module.css";
import Navigation from "../components/Navigation";
import DonateSection from "../components/DonateSection";
import Contributing from "../components/Contributing";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";

export default function Install() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Installation - Espanso - A Privacy-first, Cross-platform Text Expander
        </title>
      </Head>
      <Navigation />

      <div className={styles["install-section"]}>
        <h1>Installation (Stable)</h1>
        <p>Select your operating system:</p>
        <div className={styles.targets}>
          <div className={styles.target}>
            <div className={styles.windows} />
            <a className={styles.button}>Install on Windows</a>
            <span>Version 0.7.3</span>
          </div>
          <div className={styles.target}>
            <div className={styles.macos} />
            <a className={styles.button}>Install on macOS</a>
            <span>Version 0.7.3</span>
          </div>
          <div className={styles.target}>
            <div className={styles.linux} />
            <a className={styles.button}>Install on Linux</a>
            <span>Version 0.7.3</span>
          </div>
        </div>
      </div>

      <div className={styles["install-section"]}>
        <h1>Installation (Alpha)</h1>
        <p>
          The new espanso release brings several new features and improvements,
          but might not be as stable as the previous version. Therefore, this
          release is only recommended to early adopters and power users.
        </p>
        <div className={styles.targets}>
          <div className={styles.target}>
            <div className={styles.windows} />
            <h3>Windows</h3>
            <a className={styles.button}>Installer (64-bit)</a>
            <a className={styles.button}>Portable zip (64-bit)</a>
            <span>Version 2.0.*</span>
          </div>
          <div className={styles.target}>
            <div className={styles.macos} />
            <h3>macOS</h3>
            <a className={styles.button}>Intel</a>
            <a className={styles.button}>M1 (Apple Silicon)</a>
            <span>Version 2.0.*</span>
          </div>
          <div className={styles.target}>
            <div className={styles.linux} />
            <h3>Linux</h3>
            <a className={styles.button}>X11</a>
            <a className={styles.button}>Wayland</a>
            <Link to="/docs/next/install/linux/#choose-the-right-version">
              Which version should you choose?
            </Link>
            <span>Version 2.0.*</span>
          </div>
        </div>
      </div>

      <p className={styles.attribution}>
        Images attribution:
        <br />
        Windows:{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Windows_logo_-_2012.svg">
          Original work: MicrosoftFile:Windows 8 logo and wordmark.svg: Multiple
          editors; see image description pageThis work: Fry1989
        </a>
        , Public domain, via Wikimedia Commons
        <br />
        macOS:{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Apple_logo_black.svg">
          Original: Rob Janoff
        </a>
        , Public domain, via Wikimedia Commons
        <br />
        Linux:{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Linux_Logo_in_Linux_Libertine_Font.svg">
          Havarhen
        </a>
        ,{" "}
        <a href="http://creativecommons.org/licenses/by-sa/3.0/">
          CC BY-SA 3.0
        </a>
        , via Wikimedia Commons
      </p>

      <DonateSection />
      <Contributing />
    </div>
  );
}
