import style from './footer.module.css'

export default function Footer(){
        return(
            <>
                <div className={style.container}>
                 <div className={style.leftSide}>
                    <h2>SkillANA</h2>
                    <p>
                        Simple, smart, and effective. SkillANA helps you organize your professional growth in one place.
                    </p>
                    <p className={style.readmore}>read more →</p>
                 </div>
                 <div className={style.rightSide}>
                       <div className={style.column}>
              <h3>Product</h3>
              <ul>
                <li>Features</li>
                <li>Skills</li>
                <li>Resume</li>
              </ul>
            </div>
            <div className={style.column}>
              <h3>Resources</h3>
              <ul>
                <li>Guide</li>
                <li>Templates</li>
                <li>Community</li>
              </ul>
            </div>
            <div className={style.column}>
              <h3>Contact</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className={style.column}>
              <h3>Policies</h3>
              <ul>
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
        </div>

            <div className={style.logo}>
                <img src="logo.png" alt ="Logo" className={style.img} ></img>
                <p>©2026 SkillAna. All rights reserved.</p>
            </div>
            </>
        )
}