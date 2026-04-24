import Image from "next/image";
import styles from "@/app/my-resume/_components/hero.module.css";

export function Hero(){
    return(
        <div className={styles.containner}>
            <div className={styles.text}>
                <h1>Instant resume, powered by your skills</h1>
                <div>Choose a template below to generate your professional resume.</div>
            </div>
            <div className={styles.show}>
                <Image
                    src="/resumes/hero_show.png"
                    alt="example resume show"
                    width={280}
                    height={390}
                />

            </div>
        </div>
    );
}