import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Navigation from "../components/Navigation";
import DonateSection from "../components/DonateSection";
import Contributing from "../components/Contributing";
import MetaDefinitions from "../components/MetaDefinitions";

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
      <MetaDefinitions name="Donate" path="/donate" />
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
