import Navbar from "../_global_components/login_nav"
import style from "./login_page.module.css"
import Form from "./_components/login_form"
export default function Login(){
    return(<>
       <main className={style.mainBox}>
            
            <section className={`${style.leftBox}`}>
                <img src={"/login-logo2-final.png"}></img>
                <div style={{marginLeft : "50px"}}>
                    <h3>Learn and grow</h3>
                    <h3>your skills with SkillANA</h3>
                    <br></br>
                    <h6>Collecting your skill with skill wallet website</h6>
                </div>
            </section>
            
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