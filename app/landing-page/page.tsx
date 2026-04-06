import styles from "./page.module.css";
import {Hero_section, ResumeSection} from "../components/home";
import {SkillSection} from "../components/landingPage"

export default function LandingPage() {
    return(
        <div className={styles.page}>
            <main className={styles.main}>
                <Hero_section />
                <SkillSection />
                <ResumeSection />
            </main>
        </div>
    )
}