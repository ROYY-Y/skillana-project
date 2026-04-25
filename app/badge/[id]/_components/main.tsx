"use client"
import style from "./main.module.css"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";
interface InputProps{
    id : string
}

interface Badge {
  badgeId: string;
  badgeName: string;
  imgUrl: string;
  earnedAt: Date;
  _id ? : string
}

export default function BadgePage({id} : InputProps) {
    const router = useRouter()
    const [badgeTitle,setBadgeTitle] = useState("");
    const [badgeDescription,setBadgeDescription] = useState("")
    const [tLimit,setTLimit] = useState("");
    const [pScore,setPScore] = useState(0);
    const [imgUrl,setImgUrl] = useState("");
    const [nQuestion, setNQuestion] = useState(0);
    const [isOwn, setIsown] = useState(false)
               
    
    useEffect(()=>{
        try{
            const token = localStorage.getItem("token");
            if(!token){ router.push("/login"); return}
            const decodeToken = jwtDecode(token) as any;

            const userId = decodeToken.id || decodeToken.sub || decodeToken._id;
            if(!id) {router.push("/collections"); return}
            const fetchData = async ()=>{
                const res = await fetch(`/api/badges/${id}`);
                if(!res.ok){
                    router.push("/collections")
                    return;
                }
                const result = await res.json()
                const data = result.badge

                if (data) {
                    setBadgeTitle(data.badgeName);
                    setBadgeDescription(data.description);
                    setImgUrl(data.imgUrl);
                    setTLimit(data.criteria.timeLimit.slice(0, 2));
                    setPScore(data.criteria.passingScore);
                    setNQuestion(data.criteria.questionNum);
                }
            };   
            fetchData();

            const fetchUser = async ()=>{
                const res = await fetch(`/api/users/${userId}`)
                if(!res.ok){
                    router.push("/collections")
                    return;
                }
                const data = await res.json();
                const userBadges = data.badges as any[]

                const badge = userBadges.find(badge => badge.badgeId === id)
                if(badge){
                    setIsown(true)
                }
            }
            fetchUser();
        }
        catch(err){
            console.error(err);
        }
    },[])
    
    

    const handleClick = ()=>{

        if(isOwn || !id) return;

        router.push(`/badge/test/${id}`);

    }
    
    return (
        <section className={style.frame}>
            <div className ={style.mainBox}>
                
                <section className={style.boxLeft}>
                    <div className = {style.imgContainer}>
                        <img className={style.imgFrame} src={`/${imgUrl}`}></img>
                    </div>
                </section>

                <section className={style.boxRight}>
                    
                    <div className = {style.titleSection}>
                        <h1 style={{fontSize: "x-large"}}>{badgeTitle}</h1>
                        <div className = {isOwn ? style.ownBar : style.notOwnBar}>
                            <div className= {isOwn ? style.circleOwn : style.circleNotOwn}></div>
                            <p>{isOwn ? "Own":"Not own"}</p>
                        </div>
                    </div>

                    <div className={style.descriptionSection}>
                        <p style={{fontSize: "smaller"}}>{badgeDescription}</p>
                    </div>

                    <hr style={{color: "white", width : "85%", borderTop: "1px solid"}}></hr>
                    
                    <p style={{fontSize: "smaller", fontWeight : "bold"}}>To earn the badge, you must pass the test based on the following criteria :</p>
                    
                    <div>
                        <p style={{fontSize: "smaller"}}>Number of Questions: {nQuestion} Questions</p>
                        <p style={{fontSize: "smaller"}}>Time Limit: {tLimit} Minutes</p>
                        <p style={{fontSize: "smaller"}}>Passing Score: {pScore} or more correct answers to earn the badge</p>
                    </div>

                    <div className={isOwn ? style.btnAlready : style.btnClaim} onClick={handleClick}>
                        {isOwn ? "Already claimed" : "Claim"}
                    </div>
                </section>
            
            </div>
        </section>
    )
}