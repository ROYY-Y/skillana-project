'use client'

import pstyle from "../profile.module.css"
import estyle from "./experience.module.css"
import { useEditContext } from "./edit";

const getExpId = (exp : any) => String(exp._id ?? exp.id);

export default function Exp() {
    const { 
        isEdit, 
        setEditing,
        liveData, 
        tempData, 
        updateExperience, 
        addExperience, 
        removeExperience 
    } = useEditContext();

    const rawList = isEdit ? (tempData.experience || []) : (liveData.experience || []);
    const expList = rawList;
    const limitExp = expList.length >= 5;
    function addNewExp() {
        if (!limitExp) {
            addExperience();
            setEditing(true)
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

            {expList.map((exp, index) => {
                
                const currentId = getExpId(exp);

                return (
                    <div key={currentId} className={estyle.expBox}>
                        
                        
                        { expList.length > 1 && (
                            <div className={estyle.removeBtnContainer}>
                                <img 
                                    src="close.png" 
                                    alt="remove"
                                    className={estyle.removeBtn} 
                                    onClick={() => removeExperience(currentId)} 
                                />
                            </div>
                        )}

                        <div id={`experience-content-${index}`} className={estyle.topContainer}>
                            <div className={pstyle.profileSection}>
                                <h2>Title</h2>
                                <div className={pstyle.Wrapper}>
                                    <input 
                                        type="text" 
                                        className={pstyle.profileContent} 
                                        placeholder="Software Engineer" 
                                        readOnly={!isEdit}
                                        value={exp.title || ""} // 🔥 FIX: Fallback to empty string
                                        onChange={(e) => updateExperience(currentId, "title", e.target.value)}
                                    />
                                    
                                </div>  
                            </div>

                            <div className={pstyle.profileSection}>
                                <h2>Start Date</h2>
                                <div className={pstyle.Wrapper}>
                                    <input 
                                        type="text" 
                                        className={estyle.dateContent} 
                                        placeholder="Jan 2023" 
                                        readOnly={!isEdit}
                                        value={exp.startDate || ""}
                                        onChange={(e) => updateExperience(currentId, "startDate", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={pstyle.profileSection}>
                                <h2>End Date</h2>
                                <div className={pstyle.Wrapper}>
                                    <input 
                                        type="text" 
                                        className={estyle.dateContent} 
                                        placeholder="Present" 
                                        readOnly={!isEdit}
                                        value={exp.endDate || ""}
                                        onChange={(e) => updateExperience(currentId, "endDate", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={estyle.description}>
                            <h2>Description</h2>
                            <div className={pstyle.Wrapper}>
                                <textarea 
                                    className={estyle.profileContent} 
                                    placeholder="Describe your responsibilities..." 
                                    readOnly={!isEdit}
                                    value={exp.description || ""}
                                    onChange={(e) => updateExperience(currentId, "description", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

   
    
}