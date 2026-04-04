import style  from "./login_nav.module.css"

export default function Navbar(){
    return (<>
        <nav className={style.logNav}>
            <div style={{display : "flex", alignItems : "center", gap : "1em", cursor : "pointer"}}>
                <img src={"/logo.png"} className ={style.logoImg}></img>
                <h2>SkillANA</h2>
            </div>
        </nav>
    </>)   
}