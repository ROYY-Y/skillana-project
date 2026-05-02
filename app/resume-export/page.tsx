import styles from "./page.module.css"
import {Navbar} from "@/app/_global_components/navbar/navbar";
import Main from "./components/main";
export default function Resume(){
    return (<>
        <div className={styles.layoutWrapper}>
            <Navbar></Navbar>
            <main className = {styles.mainSection}>
            <Main></Main>
        </main>
        </div>
    </>)
}