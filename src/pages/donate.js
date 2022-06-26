import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Navigation from "../components/Navigation";
import DonateSection from "../components/DonateSection";
import Contributing from "../components/Contributing";
import Head from "@docusaurus/Head";

export default function Donate() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const listener = (e) => {
      // Override the theme only if the user didn't specify a preference
      if (getStoredTheme() === null) {
        const darkModeOn = e.matches;
        document.documentElement.setAttribute(
          "data-theme",
          darkModeOn ? "dark" : "light"
        );
      }
    };
    darkModeMediaQuery.addEventListener("change", listener);
    return () => {
      darkModeMediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div className={styles.home}>
      <Head>
        <title>Espanso - A Privacy-first, Cross-platform Text Expander</title>
        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
	<meta name="title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
	<meta name="description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="https://espanso.org/"/>
	<meta property="og:title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
	<meta property="og:description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
	<meta property="og:image" content="/img/logo.png"/>
	<meta property="twitter:card" content="summary_large_image"/>
	<meta property="twitter:url" content="https://espanso.org/"/>
	<meta property="twitter:title" content="Espanso - A Privacy-first, Cross-platform Text Expander"/>
	<meta property="twitter:description" content="Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander."/>
	<meta property="twitter:image" content="/img/logo.png"/>
      </Head>
      <Navigation />
      <DonateSection />
      <Contributing />
    </div>
  );
}

function getStoredTheme() {
  var theme = null;
  try {
    theme = localStorage.getItem("theme");
  } catch (err) {}
  return theme;
}
