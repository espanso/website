import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Navigation from "../components/Navigation";
import HomeJumbo from "../components/HomeJumbo";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.home}>
      <Navigation />
      <HomeJumbo />
    </div>
  );
}
