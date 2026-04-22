
'use client'
import { Navbar } from "@/app/_global_components/navbar/navbar"
import Footer from "@/app/_global_components/footer/footer"
import Sidebar from "./sidebar/sidebar"
import Section from "./section/section"
import { useState } from "react"
export default function Main() {
    const [category, setCategory] = useState<string>('all');
    return (
        <>
        <nav>
          <Navbar />
        </nav>

        
        <Sidebar onSelect={setCategory}/>
        <Section />

        <footer>
            <Footer />
        </footer>
       </> 
    )
}