
import style from "./verify.module.css"
import LeftBox from "../_global_components/authen_pages/left_box"

export default function Login(){
    return(<>
       <main className={style.mainBox}>
            
            <LeftBox></LeftBox>
            
            <div style={{width : ".1em", backgroundColor : "black"}}></div>
            
            <section className={`${style.rightBox}`}>
            
            </section>
        </main> 
    </>)
}