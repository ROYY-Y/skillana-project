'use client'
import { Navbar } from "@/app/_global_components/navbar/navbar"
import Footer from "@/app/_global_components/footer/footer"
import Sidebar from "./sidebar/sidebar"
import Section from "./section/section"
import style from './main.module.css'
import { useState, useEffect, useMemo } from "react"
import { jwtDecode } from "jwt-decode"
import { BadgeData } from "./section/section"
import { Category } from "./section/section"
import { User } from "./section/section"

export default function Main({ mode = "all" }: { mode?: "all" | "collections" }) {
    const [category, setCategory] = useState<string>('all');
    const [badges, setBadges] = useState<BadgeData[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    
   useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.replace('/login');
                return;
            }

            const decodeToken = jwtDecode(token) as any;
           
            const userId = decodeToken.id || decodeToken.sub || decodeToken._id;

            if (!userId) {
                console.error("No User ID found in token");
                setLoading(false);
                return;
            }

            const [badgeRes, userRes] = await Promise.all([
                fetch('/api/badges', { headers: { "Authorization": `Bearer ${token}` } }),
                fetch(`/api/users/${userId}`, { headers: { "Authorization": `Bearer ${token}` } })
            ]);

            const badgeData = await badgeRes.json();
            const userData = await userRes.json();

            const badgeInfo = Array.isArray(badgeData) ? badgeData : badgeData.data || [];
            const userInfo = userData.user || userData.data || userData;
            


            setUser(userInfo);
        
            setBadges(badgeInfo);

            const uniqueCategories = Array.from(
    new Map(
        badgeInfo
        .filter((b: any) => b?.category?.categoryId)
        .map((b: any) => [
            b.category.categoryId.toString(),
            {
                ...b.category,
                categoryId: b.category.categoryId.toString()
            }
        ])
    ).values()
) as Category[];
            
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
}, []);

const filteredBadges = badges;


    if (loading) return <div>Loading...</div>;
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            <main className={style.main}>
                <aside className={style.aside}>
                    <Sidebar
                        onSelect={setCategory}
                        categories={categories}  
                    />
                </aside>

                <section className={style.section}>
                    <Section
                        category={category}
                        badges={filteredBadges}
                        user={user}  
                        mode={mode}       
                    />
                </section>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}