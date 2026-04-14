import { ResumeSection } from "@/app/_global_components/home_page/home";
import { LandingPageNavbar, Hero_section, SkillSection, CloseSection } from "./_components/landingPage";
import Footer from "@/app/_global_components/footer/footer"

export default function LandingPage() {
    return(
        <>
            <LandingPageNavbar />
            
            <main>
                <Hero_section />
                <SkillSection />
                <ResumeSection />
                <CloseSection />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}