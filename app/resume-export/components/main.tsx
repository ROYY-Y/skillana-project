"use client"
import styles from "./main.module.css"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { ResumeData } from "./templates/type/resume"
import Template4 from "./templates/template4"
export interface IUserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;
    contact: {
        phoneNumber: string;
        address: string;
    };
    education: {
        level: string;
        major: string;
        university: string;
    };
    experience: {
        _id: string;
        title: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    badges: {
        badgeId: string;
        badgeName: string;
        imgUrl: string;
        earnedAt: string;
        _id: string;
    }[];
    aboutMe: string;
}

interface ICategory {
    categoryId: string;
    name: string;
}

interface ICriteria {
    questionNum: number;
    timeLimit: string;
    passingScore: number;
}

interface IQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
}

interface ITest {
    questions: IQuestion[];
}

interface IBadgeDetail {
    _id: string;
    badgeName: string;
    category: ICategory;
    imgUrl: string;
    description: string;
    criteria: ICriteria;
    test: ITest;
}

interface IBadgeWithCat {
    _id: string;
    badgeName: string;
    category: string;
    imgUrl: string;
}

export default function ResumeExport() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [badgeInfo, setBadgeInfo] = useState<IBadgeDetail[] | null>(null);
    const [currCat, setCurrCat] = useState("All");
    const [badgeWithCat, setBadgeWithCat] = useState<IBadgeWithCat[]>([]);
    const [numSelectedBadge, setNumSelectedBadge] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean[]>([]); 
    const [mounted, setMounted] = useState(false); // แก้ Hydration
    const [myResumeData , setMyResumeData] = useState<ResumeData | null>(null)
    const router = useRouter();

    const categories = [
        { name: "All", icon: "/icon/grid.png" },
        { name: "Website Development", icon: "/icon/web.png" },
        { name: "Programming Language", icon: "/icon/programming.png" },
        { name: "Data Science", icon: "/icon/data.png" },
        { name: "Database", icon: "/icon/database.png" },
        { name: "Cloud & DevOps", icon: "/icon/cloud.png" }
    ];

    useEffect(() => {
        setMounted(true); 
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) { router.push("/login"); return; }
                const decodeToken = jwtDecode(token) as any;
                const userId = decodeToken.id || decodeToken.sub || decodeToken._id;

                const [userRes, badgesRes] = await Promise.all([
                    fetch(`/api/users/${userId}`),
                    fetch(`/api/badges`)
                ]);

                if (!userRes.ok || !badgesRes.ok) throw new Error("Failed to fetch data");
                const userData = await userRes.json();
                const allBadgesData = await badgesRes.json();

                setUser(userData);
                setBadgeInfo(allBadgesData);

                const tmpUser : IUserProfile = userData

                const toResume :ResumeData = {
                    firstName : tmpUser.firstName,
                    lastName : tmpUser.lastName,
                    email : tmpUser.email,
                    aboutMe : tmpUser.aboutMe,
                    contact : {
                        phoneNumber : tmpUser.contact.phoneNumber,
                        address : tmpUser.contact.address,
                    },
                    education :{
                        level : tmpUser.education.level,
                        major :tmpUser.education.major,
                        university : tmpUser.education.university
                    },
                    profileImg : tmpUser.profileImg
                    ,
                    experience : tmpUser.experience,
                    badges : []
                }
                setMyResumeData(toResume)
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [router]);

    useEffect(() => {
        if (user && badgeInfo) {
            const merged = user.badges.map((userBadge) => {
                const masterDetail = badgeInfo.find(b => b.badgeName === userBadge.badgeName);
                return {
                    _id: userBadge._id,
                    badgeName: userBadge.badgeName,
                    category: masterDetail?.category.name || "Other",
                    imgUrl: userBadge.imgUrl
                };
            });
            setBadgeWithCat(merged);
            setIsSelected(new Array(merged.length).fill(false));
        }
    }, [user, badgeInfo]);


    useEffect(() => {
        if (myResumeData && badgeWithCat.length > 0) {
 
            const selectedBadges = badgeWithCat
                .filter((_, idx) => isSelected[idx])
                .map(badge => ({
                    badgeName: badge.badgeName,
                    imgUrl: badge.imgUrl
                }));

            setMyResumeData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    badges: selectedBadges
                };
            });
        }
    }, [isSelected, badgeWithCat]);

    const handleClickBadge = (idx: number) => {
        const currentlySelected = isSelected[idx];
        if (!currentlySelected && numSelectedBadge >= 6) return;

        const nextSelected = [...isSelected];
        nextSelected[idx] = !currentlySelected;
        
        setIsSelected(nextSelected);
        setNumSelectedBadge(prev => currentlySelected ? prev - 1 : prev + 1);
    };


    if (!mounted) return null;
    console.log(user)
    return (
        <>
            <section className={styles.AddSkillBox}>
                <div className={styles.titleContainer}>
                    <h3>Add your skills</h3>
                    <p>Select badges to display {`(${numSelectedBadge}/6)`}</p>
                    <hr />
                </div>

                <div className={styles.categoryContainer}>
                    <ul className={styles.categoryList}>
                        {categories.map((cat) => (
                            <li
                                key={cat.name}
                                onClick={() => setCurrCat(cat.name)}
                                className={currCat === cat.name ? styles.active : ""}
                            >
                                <img src={cat.icon} alt={cat.name} />
                                <h5>{cat.name}</h5>
                            </li>
                        ))}
                    </ul>
                </div>

                <h3 className={styles.currentTitle}>{currCat}</h3>

                <div className={styles.badgesDisplay}>
                   
                    {badgeWithCat.map((badge, idx) => {
              
                        if (currCat !== "All" && badge.category !== currCat) return null;

                        return (
                            <div
                                key={badge._id}
                                className={`${styles.badgeItem} ${isSelected[idx] ? styles.boxCheck : ""}`}
                                onClick={() => handleClickBadge(idx)}
                            >
                                {isSelected[idx] && <img src="/check.png" className={styles.check} alt="checked" />}
                                <img src={`/${badge.imgUrl}`} alt={badge.badgeName} />
                                <p>{badge.badgeName}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className={styles.resumeBox}>
                   {myResumeData ? (
                    <Template4 data={myResumeData} size={"small"} />
                    ) : (
                        <p>Loading resume...</p> 
                    )}
            </section>
        </>
    );
}