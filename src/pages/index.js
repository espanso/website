import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Navigation from "../components/Navigation";
import HomeJumbo from "../components/HomeJumbo";
import HomeHowItWorks from "../components/HomeHowItWorks";
import Fade from "react-reveal/Fade";
import HomeTestimonials from "../components/HomeTestimonials";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.home}>
      <Navigation />
      <HomeJumbo />
      <div className={styles["dark-area"]}>
        <Fade bottom>
          <HomeHowItWorks />
        </Fade>
        <HomeTestimonials />
      </div>
    </div>
  );
}
