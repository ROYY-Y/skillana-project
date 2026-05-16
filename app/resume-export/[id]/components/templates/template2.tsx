"use client"
import {ResumeData} from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template2.module.css"
import { useEffect,useState } from "react"
type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template4({ data, size }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    console.log(data)
  const containerClass = isMounted 
    ? (size === "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall)
    : mainstyles.Resume; 

  if (!data) {
    return <div>Loading...</div>; 
  }
  return (
    <>
        <div className ={size == "full" ? mainstyles.ResumeFull :mainstyles.ResumeSmall } >
            <div className={styles.name}>{data.firstName} {data.lastName}</div>
            <div className={styles.profile}>
             <img src={data.profileImg} alt="Image profile" className={styles.profileImg} />
             <div className={styles.contact}><h3>Contact</h3></div>
              <div className={styles.contactInfo}>
                <ul className={styles.contactList}>
                  <li><img src={"/icon/phone.png"} alt="Phone" /> {data.contact.phoneNumber}</li>
                  <li><img src={"/icon/mail.png"} alt="Email" /> {data.email}</li>
                  <li><img src={"/icon/location.png"} alt="Address" /> {data.contact.address}</li>
                </ul>
              </div>
            </div>
            <div className={styles.aboutMeContainer}>
              <div className={styles.header}>
                <img src={"/icon/user.png"} alt="User" className={styles.userIcon} />
                <h3>About Me</h3>
              </div>
              <p style={{ margin: "1rem 0 0 4.5rem" }}>{data.aboutMe}</p>
            </div>
            <section className={styles.resumeSection}>
  <h2 className={styles.sectionTitle}>◯ EDUCATION</h2>

  <div className={styles.entry}>
    <p className={styles.entryDate}>(2011–2015)</p>
    <h4 className={styles.entryCompany}>WARDIERE UNIVERSITY</h4>
    <p className={styles.entryRole}>Bachelor of Marketing</p>
    <p className={styles.entryGpa}>3.65</p>
  </div>

  <div className={styles.entry}>
    <p className={styles.entryDate}>(2014–2018)</p>
    <h4 className={styles.entryCompany}>WARDIERE UNIVERSITY</h4>
    <p className={styles.entryRole}>BA Sales and Commerce</p>
    <p className={styles.entryGpa}>3.74</p>
  </div>
</section>
        </div>
    </>
  );
}