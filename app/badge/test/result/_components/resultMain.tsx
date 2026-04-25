import styles from "./resultMain.module.css"
export default function ResultMain(){
    const size = 30
    const percentage = 80;
    const radius = 70;         /* รัศมีวงกลม (ขนาด container / 2 - ความหนาเส้นนิดหน่อย) */
    const strokeWidth = 10;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (<>
        <div className= {styles.mainBg}>
            <main className = {styles.mainBox}>
                <aside className={styles.imgBox}>
                    <img className = {styles.imgContainer}></img>
                </aside>
                <article className = {styles.contentBox}>
                    <h2 style={{fontSize : "xx-large"}}>Congratulations!</h2>
                    <h3 style={{fontWeight : "500"}}>You have earned a badge!</h3>
                    <div className={styles.descriptionSection}>
                        <p style={{fontSize : "small"}}>Outstanding! You’ve proven your expertise through exceptional performance. This badge of achievement is now officially part of your badges page.</p>
                    </div>

                    <div className = {styles.resultBox}>
                        <div style={{display : "flex", alignItems : "center", paddingLeft : "1em"}}>
                            <p>Result :</p>
                        </div>
                        <div className={styles.resultInfoContainer}>
                            <div className = {styles.diagram}>
                                    
                            </div>
                            <div className = {styles.info}>
                                <p>Score : 8 / 10</p>
                                <p>Time Remain : 01:01</p>
                            </div>
                        </div>
                    </div>

                    <div className = {styles.btn}>Go to home page</div>
                </article>
            </main>
        </div>
    </>)
}