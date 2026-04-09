'use client';
import { jwtDecode } from "jwt-decode";
import { useState, useContext, createContext, ReactNode } from "react";

// --- Interfaces ---
export interface Experience {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface ProfileData {
    name: string;
    email: string;
    contact: {
  
        phoneNumber: string;
        address: string;
    },
    education: {
        level: string;
        major: string;
        university: string;
    },
    aboutMe: string;
    experience: Experience[];
}

// 1. Define the Context Type Interface
interface EditContextType {
    isEdit: boolean;
    setEditing: (val: boolean) => void;
    liveData: ProfileData;
    tempData: ProfileData;
    updateTempField: (field: keyof ProfileData, value: any) => void;
    updateNestedField: (section: 'contact' | 'education', field: string, value: string) => void
    updateExperience: (id: number, field: keyof Experience, value: string) => void;
    addExperience: () => void;
    removeExperience: (id: number) => void;
    saveData: () => Promise<void>;
    reset: () => void;
}

// 2. Initialize the Context with the Interface
// We use 'as EditContextType' to provide a dummy initial object
const editContext = createContext<EditContextType>({
    isEdit: false,
    setEditing: () => { },
    liveData: {} as ProfileData,
    tempData: {} as ProfileData,
    updateTempField: () => { },
    updateNestedField: () => { },
    updateExperience: () => { },
    addExperience: () => { },
    removeExperience: () => { },
    saveData: async () => { }, // Correctly defined as an async dummy
    reset: () => { }
});

// --- Provider Component ---
export const EditProvider = ({ children, initialData }: { children: ReactNode, initialData: ProfileData }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [liveData, setLiveData] = useState<ProfileData>(initialData);
    const [tempData, setTempData] = useState<ProfileData>(initialData);

    const updateTempField = (field: keyof ProfileData, value: any) => {
        setTempData(prev => ({ ...prev, [field]: value }));
        setIsEdit(true);
    };

    const updateNestedField = (section: 'contact' | 'education', field: string, value: string) => {
        setTempData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
        setIsEdit(true);
    };

    const updateExperience = (id: number, field: keyof Experience, value: string) => {
        const updatedExp = tempData.experience.map(exp => 
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        setTempData(prev => ({ ...prev, experience: updatedExp }));
        setIsEdit(true);
    };

    const addExperience = () => {
        if (tempData.experience.length >= 5) return;
        
        const newExp: Experience = {
            id: Date.now(),
            title: "",
            startDate: "",
            endDate: "",
            description: ""
        };

        setTempData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
        setIsEdit(true);
    };

    const removeExperience = (id: number) => {
        setTempData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
        setIsEdit(true);
    };

    const saveData = async () => {
    try {
        const token = localStorage.getItem("token");
        
        // 1. Get the ID from the token so we know which user to update
        const decoded = jwtDecode(token!) as { id: string };
        const userId = decoded.id;

        // 2. Send the PUT/POST request to your backend
        const res = await fetch(`/api/users/${userId}`, {
            method: "PUT", // Or PUT, depending on your backend route
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(tempData) // This sends the entire profile object
        });
        
        if (res.ok) {
            const updatedData = await res.json();
            console.log("Database updated successfully!");
            
            // 3. IMPORTANT: Update the 'liveData' so the UI shows the new info
            setLiveData(tempData);
            setIsEdit(false);
        } else {
            console.error("Failed to save to database");
        }
    } catch (error) {
        console.error("Save Error:", error);
    }
};

    const reset = () => {
        setTempData(liveData);
        setIsEdit(false);
    };

    return (
        <editContext.Provider value={{ 
            isEdit, 
            setEditing: setIsEdit, // Map state setter to the name used in Context
            liveData, 
            tempData, 
            updateTempField, 
            updateNestedField, 
            updateExperience,
            addExperience,
            removeExperience,
            saveData, 
            reset 
        }}>
            {children}
        </editContext.Provider>
    );
}

export const useEditContext = () => useContext(editContext);