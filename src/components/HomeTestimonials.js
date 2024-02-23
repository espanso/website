import React from "react";
import styles from "./HomeTestimonials.module.css";
import Fade from "react-reveal/Fade";
import { ThumbUpIcon } from "@heroicons/react/outline";

export default function HomeTestimonials() {
    return (
        <div className={styles.container}>
            <Fade bottom>
                <h3>
                    <ThumbUpIcon className={styles.icon} />
                    What people say about Espanso
                </h3>
            </Fade>
            <div className={styles.testimonials}>
                <Testimonial
                    person={"Sébastien Dubois"}
                    subtitle={"Author, Crafter for 15+y, CTO, Indie Hacker"}
                >
                    I'd like to give a shout out to @terzi_federico for creating
                    Espanso: https://espanso.org, an Open Source text expander.{" "}
                    <br />
                    <br />
                    Gotta love tools like these. I've just installed it and
                    already know that it'll save me hours and hours! :)
                </Testimonial>
                <Testimonial
                    person={"Luke Stephens"}
                    subtitle={"Founder @haksecio"}
                >
                    One of my favourite free productivity tools is espanso
                    https://espanso.org It's a text expander. I mostly use it to
                    write out quick text snippets such as:
                    <br />
                    <br />
                    My current IP, Today's date, Generic XSS payloads, Code
                    snippets, Email templates
                    <br />
                    <br />
                    It's so good!
                </Testimonial>
                <Testimonial
                    person={"Rheinard Korf"}
                    subtitle={"Software Architect/Engineer"}
                >
                    Discovered https://espanso.org today. Fantastic tool for
                    snippet expansion: Cross Platform and Open Source. Converted
                    50% of my TextExpander snippets so far. Still many to go.
                    Will it become my goto? I don't know ¯\_(ツ)_/¯ Trial
                    commences!
                </Testimonial>
                <Testimonial person={"Kevin Swiber"}>
                    I have been using @terzi_federico's espanso for replacing
                    text with emojis (e.g., :cowboy hat face: =&gt; 🤠), and
                    it's fantastic. As a text expander, it can do a lot more
                    than just that. Check it out!
                </Testimonial>
            </div>
        </div>
    );
}

const Testimonial = ({ person, children, subtitle }) => {
    return (
        <Fade bottom>
            <div className={styles.testimonial}>
                <p>{children}</p>
                <h4>{person}</h4>
                <span>{subtitle}</span>
            </div>
        </Fade>
    );
};
