'use client'

import pstyle from "../profile.module.css"
import estyle from "./experience.module.css"
import { useEditContext } from "./edit";

export default function Exp() {
    // 1. Destructure everything needed from your Context
    const { 
        isEdit, 
        setEditing,
        liveData, 
        tempData, 
        updateExperience, 
        addExperience, 
        removeExperience 
    } = useEditContext();

    // 2. Determine which list to render (Draft or Official)
    const expList = isEdit ? (tempData.experience || []) : (liveData.experience || []);
    const limitExp = expList.length >= 5;
    function addNewExp() {
        if (!limitExp) {
            addExperience();
        }
    }
    return (
        <div id="experience-container" className={pstyle.head}>    
            <div id="exp-header" className={estyle.expHeader}>
                <h1>Experience {expList.length}/5</h1> 
                    <div className={estyle.addIcon}>
                        <h1 
                            id="exp-add" 
                            onClick={() => {addNewExp(); setEditing(true);}} 
                            className={limitExp ? estyle.disabled : ""}
                            style={{ cursor: limitExp ? 'not-allowed' : 'pointer' }}
                        >
                            +
                        </h1>
                    </div>
                
            </div>

            {expList.map((exp, index) => (
                <div key={exp.id} id="experience-content" className={estyle.expBox}>
                    
                        {expList.length > 1 && <div className={estyle.removeBtnContainer}>
                            <img src="close.png" alt="removeButton"
                            className={estyle.removeBtn} 
                            onClick={() => {removeExperience(exp.id); setEditing(true)} } >
                           
                                </img>
                            </div>
                        }
                    

                    <div id={`experience-content-${index}`} className={estyle.topContainer}>
                        {/* Title Section */}
                        <div id="Title" className={pstyle.profileSection}>
                            <h2>Title</h2>
                            <div className={pstyle.Wrapper}>
                                <input 
                                    type="text" 
                                    className={pstyle.profileContent} 
                                    placeholder="Software Engineer" 
                                    readOnly={!isEdit}
                                    value={exp.title}
                                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                />
                                {!isEdit && <img src="edit.png" alt="view" className={estyle.editIcon} />}
                            </div>  
                        </div>

                        {/* Start Date Section */}
                        <div id="Start-Date" className={pstyle.profileSection}>
                            <h2>Start Date</h2>
                            <div className={pstyle.Wrapper}>
                                <input 
                                    type="text" 
                                    className={estyle.dateContent} 
                                    placeholder="Jan 2023" 
                                    readOnly={!isEdit}
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* End Date Section */}
                        <div id="End-Date" className={pstyle.profileSection}>
                            <h2>End Date</h2>
                            <div className={pstyle.Wrapper}>
                                <input 
                                    type="text" 
                                    className={estyle.dateContent} 
                                    placeholder="Present" 
                                    readOnly={!isEdit}
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div id="Text" className={estyle.description}>
                        <h2>Description</h2>
                        <div className={pstyle.Wrapper}>
                            <textarea 
                                className={estyle.profileContent} 
                                placeholder="Describe your responsibilities..." 
                                readOnly={!isEdit}
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

   
    
}