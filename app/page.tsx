import styles from "./page.module.css";
import {Hero_section, ResumeSection} from "@/app/_global_components/home_page/home";
import {SkillSection} from "./_components/landingPage"

export default function LandingPage() {
    return(
        <div>
            <main className={styles.main}>
                <Hero_section />
                <SkillSection />
                <ResumeSection />
            </main>
        </div>
    )
}