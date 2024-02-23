import React from "react";
import styles from "./DonateSection.module.css";
import Fade from "react-reveal/Fade";
import Link from "@docusaurus/Link";
import { HeartIcon } from "@heroicons/react/solid";

export default function DonateSection() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <HeartIcon className={styles.icon} />
                <h2>Donate</h2>
            </div>
            <div className={styles.content}>
                <img src="/img/federico.png" className={styles.picture} />
                <div className={styles.text}>
                    <p>
                        Hi! I'm{" "}
                        <Link to="https://federicoterzi.com">Federico</Link>,
                        the creator of espanso. I develop espanso in my (little)
                        spare time and I decided to make it open source because
                        I thought it could be useful to many people.
                    </p>

                    <p className={styles["call-to-action"]}>
                        If you liked the project, please consider making a small
                        donation, it really helps :)
                    </p>

                    <div className={styles["button-section"]}>
                        <Link to="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FHNLR5DRS267E&source=url">
                            <div
                                className={`${styles.button} ${styles.paypal}`}
                            >
                                <span>Donate with PayPal </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.thanks}>
                <h5>
                    A special thanks goes to all the wonderful people who
                    supported espanso along the way
                </h5>
                <p>
                    Together, we will make espanso the first universal text
                    expander, open to everyone.
                </p>
            </div>
        </div>
    );
}
