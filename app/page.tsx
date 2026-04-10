import styles from "./page.module.css";
import { Hero_section, ResumeSection } from "@/app/_global_components/home_page/home";
import { LandingPageNavbar, SkillSection } from "./_components/landingPage";
import Footer from "@/app/_global_components/footer/footer"
export default function LandingPage() {
    return(
        <div>
            <main className={styles.main}>
                <LandingPageNavbar />

                <Hero_section />
                <SkillSection />
                <ResumeSection />
                
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}