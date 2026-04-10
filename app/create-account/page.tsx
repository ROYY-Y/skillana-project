
import style from "./create_account.module.css"
import LeftBox from "../_global_components/authen_pages/left_box"
import CreateAccountForm from "./_components/create_form"
export default function Login(){

    return(<>
       <main className={style.mainBox}>
            
            <LeftBox></LeftBox>
            
            <section className={`${style.rightBox}`}>
                <CreateAccountForm></CreateAccountForm>
            </section>
        </main> 
    </>)
}