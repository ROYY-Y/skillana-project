'use client'

import pstyle from "../profile.module.css"
import estyle from "./experience.module.css"
import { useState } from "react";
export default function Exp() {

    
    const [expList, setExpList] = useState<object[]>([
        {
            id : Date.now(),
            title: "",
            startDate: "",
            endDate: "",
            description: ""
        }
    ]);
    const limitExp : boolean = expList.length >= 5;
    function addNewExp() {
        if (!limitExp) {
            setExpList([...expList, {
                id : Date.now(),
                title: "",
                startDate: "",
                endDate: "",
                description: ""
            }]);
        }
    }
    
  return (
    <>
    <div id = "experience-container" className={pstyle.head} style={{ fontSize: '32px', fontWeight: 'bold' }}  >    
        <div id ="exp-header" className={estyle.expHeader}>
            <h1 >Experience</h1> 
            <h1 id="exp-count">{expList.length}/5</h1>
            <div className={estyle.addIcon}>
                <h1 id="exp-add" onClick={addNewExp} className = {limitExp ? estyle.disabled : ""}>+</h1>
            </div>
        </div>
            

        {expList.map((exp, index) => (

        
        <div id = "experience-content" className={estyle.expBox} >
            <div key = {exp.id} id = {`experience-content-${index}`} className={estyle.topContainer} >

                    <div id = "Title" className={pstyle.profileSection} >
                        <h2>Title</h2>
                            <div className={pstyle.Wrapper}>
                                <input type="email" id="email" className={pstyle.profileContent} placeholder="killAna@gmail.com" />
                                <img src ="edit.png" alt="edit" className={estyle.editIcon} />
                            </div>  
                    </div>
                        

                    <div id = "Start-Date" className={pstyle.profileSection} >
                        <h2>Start Date</h2>
                        <div className={pstyle.Wrapper}>
                            <input type="tel" id="phone" className={estyle.dateContent} placeholder="08x-xxx-xxxx" />
                            <img src ="edit.png" alt="edit" className={estyle.editIcon} />
                        </div>
                    </div>


                    <div id = "End-Date" className={pstyle.profileSection} >
                        <h2>End Date</h2>
                        <div className={pstyle.Wrapper}>
                            <input type="text" id="address" className={estyle.dateContent} placeholder="123 Main St, City, State 12345" />
                            <img src ="edit.png" alt="edit" className={estyle.editIcon} />
                        </div>
                    </div>
            </div>

            <div id = "Text" className={estyle.description} >
                <div className={pstyle.Wrapper}>
                    <textarea id="address" className={estyle.profileContent} placeholder="123 Main St, City, State 12345" />
                    <img src ="edit.png" alt="edit" className={estyle.descriptionEdit} />
                </div>
            </div>

        </div>
        ))}


    </div>
    </>
  );
}


        
            