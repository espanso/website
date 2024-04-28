import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Navigation from "../components/Navigation";
import HomeJumbo from "../components/HomeJumbo";
import HomeHowItWorks from "../components/HomeHowItWorks";
import Fade from "react-awesome-reveal";
import HomeTestimonials from "../components/HomeTestimonials";
import HomeFeatures from "../components/HomeFeatures";
import HomeKnowMore from "../components/HomeKnowMore";
import DonateSection from "../components/DonateSection";
import Contributing from "../components/Contributing";
import Head from "@docusaurus/Head";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)",
        );
        const listener = (e) => {
            // Override the theme only if the user didn't specify a preference
            if (getStoredTheme() === null) {
                const darkModeOn = e.matches;
                document.documentElement.setAttribute(
                    "data-theme",
                    darkModeOn ? "dark" : "light",
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
                <title>
                    Espanso - A Privacy-first, Cross-platform Text Expander
                </title>
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/img/favicon.ico"
                />
            </Head>
            <Navigation />
            <HomeJumbo />
            <div className={styles["dark-area"]}>
                <Fade bottom>
                    <HomeHowItWorks />
                </Fade>
                <HomeTestimonials />
            </div>
            <HomeFeatures />
            <HomeKnowMore />
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
