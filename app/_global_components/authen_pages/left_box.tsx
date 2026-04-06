import style from "./left_box.module.css";

export default function LeftBox(){
    return (<>
       <section className={`${style.leftBox}`}>
            <img src={"/login-logo2-final.png"}></img>
            <div style={{marginLeft : "50px"}}>
                <h3>Learn and grow</h3>
                <h3>your skills with SkillANA</h3>
                <br></br>
                <h6>Collecting your skill with skill wallet website</h6>
            </div>
        </section>
    </>)
}