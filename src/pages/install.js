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
        <title>Espanso - A Privacy-first, Cross-platform Text Expander</title>
        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
        <meta name="title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
        <meta name="description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://espanso.org/"/>
        <meta property="og:title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
        <meta property="og:description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
        <meta property="og:image" content="/assets/logo.png"/>
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://espanso.org/"/>
        <meta property="twitter:title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
        <meta property="twitter:description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
        <meta property="twitter:image" content="/assets/logo.png"/>
      </Head>
      <Navigation />
      <div className={styles["install-section"]}>
        <h1>Installation (Stable)</h1>
        <p>Select your operating system:</p>
        <div className={styles.targets}>
          <div className={styles.target}>
            <div className={styles.windows} />
            <a className={styles.button} href="/docs/install/win">
              Install on Windows
            </a>
            <span>Version 0.7.3</span>
          </div>
          <div className={styles.target}>
            <div className={styles.macos} />
            <a className={styles.button} href="/docs/install/mac">
              Install on macOS
            </a>
            <span>Version 0.7.3</span>
          </div>
          <div className={styles.target}>
            <div className={styles.linux} />
            <a className={styles.button} href="/docs/install/linux">
              Install on Linux
            </a>
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
            <a
              className={styles.button}
              href={siteConfig.customFields.WIN_INSTALLER_DOWNLOAD_URL}
              onClick={(e) => {
                e.preventDefault();
                window.open(siteConfig.customFields.WIN_INSTALLER_DOWNLOAD_URL);
                window.location =
                  "/docs/next/install/win#problems-you-may-experience";
                window.focus();
              }}
            >
              Installer (64-bit)
            </a>
            <a
              className={styles.button}
              href={siteConfig.customFields.WIN_PORTABLE_DOWNLOAD_URL}
              onClick={(e) => {
                e.preventDefault();
                window.open(siteConfig.customFields.WIN_PORTABLE_DOWNLOAD_URL);
                window.location = "";
                window.focus();
              }}
            >
              Portable zip (64-bit)
            </a>
            <span>Version 2.0.*</span>
          </div>
          <div className={styles.target}>
            <div className={styles.macos} />
            <h3>macOS</h3>
            <a
              className={styles.button}
              href={siteConfig.customFields.MAC_INTEL_DOWNLOAD_URL}
              onClick={(e) => {
                e.preventDefault();
                window.open(siteConfig.customFields.MAC_INTEL_DOWNLOAD_URL);
                window.location =
                  "/docs/next/install/mac/#problems-you-may-experience";
                window.focus();
              }}
            >
              Intel
            </a>
            <a
              className={styles.button}
              href={siteConfig.customFields.MAC_M1_DOWNLOAD_URL}
              onClick={(e) => {
                e.preventDefault();
                window.open(siteConfig.customFields.MAC_M1_DOWNLOAD_URL);
                window.location =
                  "/docs/next/install/mac/#problems-you-may-experience";
                window.focus();
              }}
            >
              M1 (Apple Silicon)
            </a>
            <span>Version 2.0.*</span>
          </div>
          <div className={styles.target}>
            <div className={styles.linux} />
            <h3>Linux</h3>
            <a
              className={styles.button}
              href="/docs/next/install/linux/#install-on-x11"
            >
              X11
            </a>
            <a
              className={styles.button}
              href="/docs/next/install/linux/#install-on-wayland"
            >
              Wayland
            </a>
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
