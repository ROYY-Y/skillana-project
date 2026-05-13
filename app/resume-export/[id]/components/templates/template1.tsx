"use client"
import {ResumeData} from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template1.module.css"
import { useEffect,useState } from "react"
type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template4({ data , size} : Props ) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    console.log(data)
  const containerClass = isMounted 
    ? (size === "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall)
    : mainstyles.Resume; 

  if (!data) {
    return <div>Loading...</div>; 
  }
  return (
    <>
        <div className ={size == "full" ? mainstyles.ResumeFull :mainstyles.ResumeSmall } >
            
        </div>
    </>
  );
}