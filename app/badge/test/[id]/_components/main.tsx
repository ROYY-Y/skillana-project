"use client"

import { time } from "console";
import styles from "./main.module.css"
import { useState, useEffect } from "react"
import Choice from "./choice";
import Dot from "./dot";


export default function MainBox(){

    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(()=>{ // fetchTime
        const fetchData = async () => { //mock function
            const initialSeconds = 600; 
            setTimeLeft(initialSeconds);
        };

        fetchData();
    },[]);

    useEffect(()=>{
        if (timeLeft === null || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        if(seconds <= 0) return "Timeout";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (timeLeft === null) return <div>Loading timer...</div>;

    return (
        <>
            <div className={styles.mainBg}>
                <main className={styles.mainBox}>
                        <section className={styles.timerBox}>
                            <h3 className={styles.timer}>{formatTime(timeLeft)}</h3>
                        </section>

                        <section className={styles.questionBox}>
                            <div className={styles.quesiton}>
                                <h3 style={{fontSize : "medium"}}>1.</h3>
                                <h3 style={{fontSize : "medium", fontWeight : "600"}}>What is the primary library used in the Hugging Face ecosystem to work with pre-trained models like BERT or GPT?</h3>
                            </div>
                            <Choice text = "An apple fall from the tree" isSelected = {false}></Choice>
                            <Choice text = "An apple not fall from the tree" isSelected = {true}></Choice>
                            <Choice text = "ABCDEFG HELLO" isSelected = {false}></Choice>
                            <Choice text = "Test 1 2 3 nice bro" isSelected = {false}></Choice>
                            <section className={styles.dotBox}>
                                <Dot focus = {false} done = {true}></Dot>
                                <Dot focus = {false} done = {true}></Dot>
                                <Dot focus = {true} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                                <Dot focus = {false} done = {false}></Dot>
                            </section>
                        </section>

                        <section className = {styles.btnContainer}>

                            <div className={styles.btnNext}>{"< Back"}</div>
                            <div className={styles.btnNext}>{"Next >"}</div>
                        </section>

                </main>

                <div className={styles.submit}>Submit</div>
            </div>
        </>
    )
}