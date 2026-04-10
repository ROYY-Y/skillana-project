
import style from "./verify.module.css"
import LeftBox from "../_global_components/authen_pages/left_box"
import OtpForm from "./_components/otp_form"


export default function Login(){

    const userEmail = "example1234@gmail.com"
    return(<>
       <main className={style.mainBox}>
            
            <LeftBox></LeftBox>
            
            <section className={`${style.rightBox}`}>
                <img className= {style.otpLogo} src={"./otp-logo.png"}></img>
            
                <h3 style={{fontSize : "1.6em", fontWeight : "700"}}>OTP Verification</h3>
            
                <div>
                    <p style={{textAlign : "center"}}>
                        Enter the 6 digits code we sent to<br></br>
                        {userEmail} to verify
                    </p>
                </div>
            
                <OtpForm></OtpForm>
            
            </section>
        </main> 
    </>)
}