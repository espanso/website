import React from "react";
import styles from "./HomeFeatures.module.css";
import TypeIt from "typeit-react";
import Fade from "react-reveal/Fade";
import {
  LightBulbIcon,
  SearchIcon,
  CalendarIcon,
  ShareIcon,
  ChipIcon,
  TerminalIcon,
  TemplateIcon,
  DesktopComputerIcon,
  DocumentDuplicateIcon,
  CodeIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import Link from "@docusaurus/Link";
import { useOS } from "../hooks/useOS";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useScreenSize } from "../hooks/useScreenSize";

export default function HomeFeatures() {
  const today = new Date().toLocaleDateString();
  const twoHours = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 2,
  ).toLocaleTimeString(undefined, { timeStyle: "short" });

  return (
    <div className={styles.container}>
      <Feature
        main={
          <div className={styles["feature-card"]}>
            <TypeIt
              options={{ loop: true, waitUntilVisible: true, startDelay: 900 }}
              getBeforeInit={(instance) => {
                instance
                  .options({
                    speed: 50,
                  })
                  .type("<b>email</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(5)
                  .options({
                    speed: 1,
                  })
                  .type("Hey ,<br/><br/><br/><br/>Best regards,<br/>Federico")
                  .options({
                    speed: 1,
                  })
                  .move(-27)
                  .pause(1000)
                  .options({
                    speed: 50,
                  })
                  .type("John")
                  .pause(400)
                  .move(3)
                  .type("<b>ty</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(2)
                  .options({
                    speed: 5,
                  })
                  .type("Thank you for reaching out!<br/>")
                  .pause(1000)
                  .type("<b>tom</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(3)
                  .options({
                    speed: 5,
                  })
                  .type("Are you available tomorrow?")
                  .pause(3000);

                return instance;
              }}
            />
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
        main={<div className={styles["search-bar-image"]} />}
        description={
          <FeatureDescription
            title="Every sentence, one search away"
            icon={<SearchIcon className={styles.icon} />}
          >
            <p>
              Don’t remember a shortcut? No worries.
              <br />
              <br /> Just press{" "}
              <BrowserOnly fallback={<>ALT+Space</>}>
                {() => <SearchShortcut />}
              </BrowserOnly>{" "}
              and Espanso’s <span className={styles.highlight}>search bar</span>{" "}
              will open, letting you search for the perfect snippet.
            </p>
          </FeatureDescription>
        }
      />
      <Feature
        main={
          <div className={styles["feature-card"]}>
            <TypeIt
              options={{ loop: true, waitUntilVisible: true, startDelay: 900 }}
              getBeforeInit={(instance) => {
                instance
                  .type("Today is ")
                  .options({
                    speed: 50,
                  })
                  .type("<b>tod</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(3)
                  .options({
                    speed: 5,
                  })
                  .type(today)
                  .pause(2000)
                  .type("<br/><br/><b>meet2h</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(6)
                  .options({
                    speed: 5,
                  })
                  .type(`Are you available at ${twoHours}?`)
                  .pause(2000)
                  .type("<br/><br/>This is so funny <b>:joy</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(4)
                  .options({
                    speed: 5,
                  })
                  .type("😂")
                  .pause(2000)
                  .type(
                    "<br/><br/>The big launch is happening tomorrow <b>:rocket</b>",
                  )
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(7)
                  .options({
                    speed: 5,
                  })
                  .type("🚀")
                  .pause(3000);

                return instance;
              }}
            />
          </div>
        }
        description={
          <FeatureDescription
            title="Dates, Emojis 🚀, and more... "
            icon={<CalendarIcon className={styles.icon} />}
          >
            <p>
              Don’t wrap your head around{" "}
              <span className={styles.highlight}>dates</span>. Espanso makes it
              easy to use them, both past and future ones.
              <br />
              <br />
              Bring <span className={styles.highlight}>emojis</span> 🤠 in all
              your favorite apps, one shortcut away.
            </p>
          </FeatureDescription>
        }
      />
      <Feature
        reversed
        main={<div className={styles["packages-image"]} />}
        description={
          <FeatureDescription
            title="Endless extensibility"
            icon={<ShareIcon className={styles.icon} />}
          >
            <p>
              Extend Espanso’s capabilities with{" "}
              <span className={styles.highlight}>packages</span>, or create your
              owns and share them with the community on the{" "}
              <Link to="https://hub.espanso.org">Espanso Hub</Link>.
              <br />
              <br />
              Need to insert mathematical notation? Or perhaps german accents?
              We got a package for them.
              <br />
              <br /> We even got the shrug ¯\_(ツ)_/¯
            </p>
          </FeatureDescription>
        }
      />
      <div className={styles.heading}>
        <ChipIcon className={styles.icon} />
        <h2>Advanced features</h2>
      </div>
      <Feature
        main={
          <div className={styles["feature-card"]}>
            <TypeIt
              options={{ loop: true, waitUntilVisible: true, startDelay: 900 }}
              getBeforeInit={(instance) => {
                instance
                  .type("My IP is ")
                  .options({
                    speed: 50,
                  })
                  .type("<b>:ip</b>")
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(3)
                  .options({
                    speed: 5,
                  })
                  .type("192.168.1.123")
                  .pause(2000)
                  .type(
                    "<br/><br/>Or you can execute a script: <br/><b>pyscript</b>",
                  )
                  .pause(400)
                  .options({
                    deleteSpeed: 5,
                  })
                  .delete(8)
                  .options({
                    speed: 5,
                  })
                  .type("Hello from Python")
                  .pause(3000);

                return instance;
              }}
            />
          </div>
        }
        description={
          <FeatureDescription
            title="Shell and Script support"
            icon={<TerminalIcon className={styles.icon} />}
          >
            <p>
              For advanced use-cases, you can extend Espanso’s snippets with{" "}
              <span className={styles.highlight}>shell</span> commands or{" "}
              <span className={styles.highlight}>custom scripts</span>.
              <br />
              <br />
              No more copy-pasting from the terminal, inject the output into
              applications directly.
            </p>
          </FeatureDescription>
        }
      />
      <Feature
        reversed
        main={<div className={styles["form-image"]} />}
        description={
          <FeatureDescription
            title="Form support"
            icon={<TemplateIcon className={styles.icon} />}
          >
            <p>
              Use <span className={styles.highlight}>forms</span> to handle
              complex workflows, creating templates that can be reused with
              ease.
              <br />
              <br />
              You can even forward form values into custom scripts, opening up
              endless possibilities.
            </p>
          </FeatureDescription>
        }
      />
      <h3>And also</h3>

      <div className={styles["more-features-container"]}>
        <SmallFeature
          title="System-wide integration"
          icon={
            <DesktopComputerIcon className={styles["small-feature-icon"]} />
          }
        >
          <p>
            Espanso works with most applications, so you can boost your
            productivity everywhere.
          </p>
        </SmallFeature>
        <SmallFeature
          title="File-based configuration"
          icon={
            <DocumentDuplicateIcon className={styles["small-feature-icon"]} />
          }
          delay={100}
        >
          <p>
            Espanso follows a Unix-like configuration philosophy, using simple
            files. Though a GUI is planned in the future.
          </p>
        </SmallFeature>
        <SmallFeature
          title="Open-source license"
          icon={<CodeIcon className={styles["small-feature-icon"]} />}
          delay={200}
        >
          <p>Espanso is open-source, licensed under the GPL-3 license.</p>
        </SmallFeature>
        <SmallFeature
          title="Cross-platform support"
          icon={<ViewGridIcon className={styles["small-feature-icon"]} />}
          delay={300}
        >
          <p>Espanso supports Windows, Linux and macOS.</p>
        </SmallFeature>
      </div>
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

const SmallFeature = ({ title, icon, children, delay }) => {
  return (
    <Fade bottom delay={delay ?? 0}>
      <div className={styles["small-feature"]}>
        {icon}
        <h4>{title}</h4>
        {children}
      </div>
    </Fade>
  );
};

const SearchShortcut = () => {
  const { os } = useOS();

  return <> {os === "mac" ? "⌥" : "ALT"}+Space </>;
};
