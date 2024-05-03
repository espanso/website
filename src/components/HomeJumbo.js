import React from "react";
import styles from "./HomeJumbo.module.css";
import TypeIt from "typeit-react";
import Fade from "react-reveal/Fade";
import InstallButton from "./InstallButton";
import Particles from "react-particles-js";
import { useScreenSize } from "../hooks/useScreenSize";

export default function HomeJumbo() {
  const { isLargeScreen } = useScreenSize();

  return (
    <div className={styles.container}>
      <Particles
        className={styles.particles}
        params={{
          particles: {
            number: {
              value: isLargeScreen ? 50 : 30,
            },
            size: {
              value: 4,
            },
            color: {
              value: "#00a595",
            },
            links: {
              color: {
                value: "#00a595",
              },
              opacity: 0.3,
            },
            move: {
              speed: 1,
            },
            opacity: {
              value: {
                min: 0.1,
                max: 0.3,
              },
            },
          },
        }}
      />
      <div className={styles["content"]}>
        <div className={styles.headline}>
          <TypeIt
            getBeforeInit={(instance) => {
              instance
                .options({ speed: 100 })
                .type("espanso")
                .pause(500)
                .options({ speed: 2, lifeLike: false })
                .delete(7)
                .options({ speed: 2, lifeLike: false })
                .type(
                  `Supercharge your <br><span class="${styles.highlight}">typing</span> experience.`
                )
                .pause(1000)
                .move(-12)
                .pause(500)
                .delete(6)
                .type(`<span class="${styles.highlight}">messaging</span>`)
                .pause(2000)
                .delete(9)
                .type(`<span class="${styles.highlight}">scripting</span>`)
                .pause(2000)
                .delete(9)
                .type(`<span class="${styles.highlight}">coding</span>`)
                .pause(2000)
                .delete(6)
                .type(`<span class="${styles.highlight}">emojis</span>`)
                .pause(2000)
                .delete(6)
                .type(`<span class="${styles.highlight}">typing</span>`);

              return instance;
            }}
          />
        </div>
        <Fade bottom delay={2500}>
          <p className={styles.subtitle}>
            <b>Tired of typing the same sentences</b> over and over? <br />
            Discover the incredible power of a full-blown text expander.
          </p>
        </Fade>
        <Fade bottom delay={3500}>
          <div className={styles["get-started-button"]}>
            <InstallButton />
          </div>
        </Fade>
      </div>
    </div>
  );
}
