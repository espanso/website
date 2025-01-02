import React from "react";
import styles from "./install.module.css";
import Navigation from "../components/Navigation";
import DonateSection from "../components/DonateSection";
import Contributing from "../components/Contributing";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { getStableVersion, getStableDownloadLink } from "../utils/versionUtils";

export default function Install() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Installation - Espanso - A Privacy-first, Cross-platform Text Expander
        </title>
        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
      </Head>
      <Navigation />

      <div className={styles["install-section"]}>
        <h1>Installation (Beta)</h1>
        <p>Select your operating system:</p>
        <div className={styles.targets}>
          <div className={styles.target}>
            <div className={styles.windows} />
            <h3>Windows</h3>
            <a
              className={styles.button}
              href={getStableDownloadLink("WIN_INSTALLER_DOWNLOAD_URL")}
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  getStableDownloadLink("WIN_INSTALLER_DOWNLOAD_URL"),
                );
                window.location =
                  "/docs/install/win#problems-you-may-experience";
                window.focus();
              }}
            >
              Installer (64-bit)
            </a>
            <a
              className={styles.button}
              href={getStableDownloadLink("WIN_PORTABLE_DOWNLOAD_URL")}
              onClick={(e) => {
                e.preventDefault();
                window.open(getStableDownloadLink("WIN_PORTABLE_DOWNLOAD_URL"));
                window.location = "";
                window.focus();
              }}
            >
              Portable zip (64-bit)
            </a>
            <span>Version {getStableVersion()}</span>
          </div>
          <div className={styles.target}>
            <div className={styles.macos} />
            <h3>macOS</h3>
            <a
              className={styles.button}
              href={getStableDownloadLink("MAC_INTEL_DOWNLOAD_URL")}
              onClick={(e) => {
                e.preventDefault();
                window.open(getStableDownloadLink("MAC_INTEL_DOWNLOAD_URL"));
                window.location =
                  "/docs/install/mac/#problems-you-may-experience";
                window.focus();
              }}
            >
              Intel
            </a>
            <a
              className={styles.button}
              href={getStableDownloadLink("MAC_M1_DOWNLOAD_URL")}
              onClick={(e) => {
                e.preventDefault();
                window.open(getStableDownloadLink("MAC_M1_DOWNLOAD_URL"));
                window.location =
                  "/docs/install/mac/#problems-you-may-experience";
                window.focus();
              }}
            >
              M1 (Apple Silicon)
            </a>
            <span>Version {getStableVersion()}</span>
          </div>
          <div className={styles.target}>
            <div className={styles.linux} />
            <h3>Linux</h3>
            <Link
              className={styles.button}
              to="/docs/install/linux/#choosing-the-right-install-method"
            >
              X11
            </Link>
            <Link
              className={styles.button}
              to="/docs/install/linux/#choosing-the-right-install-method"
            >
              Wayland
            </Link>
            <Link to="/docs/install/linux/#find-the-right-version">
              Which version should you choose?
            </Link>
            <span>Version {getStableVersion()}</span>
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
