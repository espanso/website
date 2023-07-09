import React from "react";
import Head from "@docusaurus/Head";

export default function MetaDefinitions({ name, path }) {
  const meta = {
    title: "Espanso - A Privacy-first, Cross-platform Text Expander",
    description:
      "Tired of typing the same sentences over and over? Discover the incredible power of a full-blown text expander.",
    url: "https://espanso.org",
    image: "/img/logo.png",
    icon: "/img/favicon.ico",
  };

  if (name) {
    meta.title = `${name} - ${meta.title}`;
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <link rel="shortcut icon" type="image/x-icon" href={meta.icon} />

      <meta name="title" content={meta.title} />
      <meta key="description" name="description" content={meta.description} />
      <link rel="canonical" href={meta.url + path} />

      <meta key="robots" name="robots" content="INDEX, FOLLOW" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url + path} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.url + path} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />
    </Head>
  );
}
