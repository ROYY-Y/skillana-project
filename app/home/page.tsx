import Navbar from "@/app/_global_components/navbar/navbar";
import { Hero_section, ResumeSection } from "@/app/_global_components/home_page/home";
import { Show_badge } from "@/app/home/_components/show_badge";
import { Help } from "@/app/home/_components/help";

export default function Home() {
    return(
        <div>
            <main>
                <Navbar />

                <Hero_section />
                <Show_badge />
                <ResumeSection />
                <Help />

            </main>
        </div>
    )
}