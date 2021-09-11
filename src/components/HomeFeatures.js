import React from "react";
import styles from "./HomeFeatures.module.css";
import TypeIt from "typeit-react";
import Fade from "react-reveal/Fade";
import { LightBulbIcon, SearchIcon } from "@heroicons/react/outline";
import { useOS } from "../hooks/useOS";
import { useScreenSize } from "../hooks/useScreenSize";

export default function HomeFeatures() {
  const { os } = useOS();

  return (
    <div className={styles.container}>
      <Feature
        main={
          <div className={styles["feature-card"]}>
            <p>testss </p>
          </div>
        }
        description={
          <FeatureDescription
            title="Smarter typing"
            icon={<LightBulbIcon className={styles.icon} />}
          >
            <p>
              No more copy and pasting, create{" "}
              <span className={styles.highlight}>templates</span> once and let
              Espanso do the rest for you.
              <br />
              <br />
              Customer support replies, sales pitches, medical reports, you name
              it. Espanso got you covered.
            </p>
          </FeatureDescription>
        }
      />
      <Feature
        reversed
        main={
          <div className={styles["feature-card"]}>
            <p>testss </p>
          </div>
        }
        description={
          <FeatureDescription
            title="Every sentence, one search away"
            icon={<SearchIcon className={styles.icon} />}
          >
            <p>
              Don’t remember a shortcut? No worries.
              <br />
              <br /> Just press {os === "mac" ? "⌥" : "ALT"}+Space and Espanso’s{" "}
              <span className={styles.highlight}>search bar</span> will open,
              letting you search for the perfect snippet.
            </p>
          </FeatureDescription>
        }
      />
    </div>
  );
}

const FeatureDescription = ({ title, icon, children }) => {
  return (
    <div className={styles.description}>
      <div className={styles.heading}>
        {icon}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

const Feature = ({ main, description, reversed }) => {
  const { isLargeScreen } = useScreenSize();
  const shouldReverse = isLargeScreen && reversed;

  return (
    <div
      className={`${styles.feature} ${shouldReverse ? styles.reversed : ""}`}
    >
      <Fade left={!shouldReverse} right={shouldReverse}>
        <div className={styles.entry}>{main}</div>
      </Fade>
      <Fade right={!shouldReverse} left={shouldReverse}>
        <div className={styles.entry}>{description}</div>
      </Fade>
    </div>
  );
};
