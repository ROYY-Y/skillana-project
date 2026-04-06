
import style from "./login_page.module.css"
import Form from "./_components/login_form"
import LeftBox from "../_global_components/authen_pages/left_box"

export default function Login(){
    return(<>
       <main className={style.mainBox}>
            
            <LeftBox></LeftBox>
            
            <div style={{width : ".1em", backgroundColor : "black"}}></div>
            
            <section className={`${style.rightBox}`}>
                
                <div style={{display : "flex", flexDirection : "column" , justifyContent : "center", alignItems : "center"}}>
                    <h3>Welcome Back!</h3>
                    <h6>Login to your account to connect with features</h6>
                </div>

                <Form></Form>

                <div className={style.logBox}></div>
            </section>
        </main> 
    </>)
}