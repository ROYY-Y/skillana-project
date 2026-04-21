
'use client'

import style from './sidebar.module.css'
import { useState } from 'react'

type Prop = {
    onSelect : (category : string) => void;
}
export default function Sidebar({onSelect } : Prop){
    const [select, setSelect] = useState<string>("all");
    const handler = (category : string) => {
        setSelect(category);
        onSelect(category);
    }
   
    return (
        <>
        <div className={style.container}>
            <div className={style.menu}>
                <ul>
                    <li 
                        className={select === 'all' ? style.active : ''} 
                        onClick={() => handler('all')}
                                      
                    >
                        All Skills
                    </li>

                    <li 
                        className={select === 'web' ? style.active : ''}
                        onClick={() => handler('web')}
                    >  
                        Website Development
                    </li>

                    <li   
                        className={select === 'programming' ? style.active : ''}
                        onClick={() => handler('programming')}
                    >
                        Programming Language
                    </li>

                    <li 
                        className={select === 'data' ? style.active : ''}
                        onClick={() => handler('data')}
                    >
                        Data Science
                    </li>
 
                    <li 
                        className={select === 'database' ? style.active : ''}
                        onClick={() => handler('database')}
                    >
                        Database
                    </li>

                    <li 
                        className={select === 'devops' ? style.active : ''}
                        onClick={() => handler('devops')}
                    >
                        Cloud & DevOps
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}