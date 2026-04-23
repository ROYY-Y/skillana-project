'use client'

import style from './sidebar.module.css'
import { useState } from 'react'
import { Category } from '../section/section'
import { categoryOrderMap } from '../section/section'
type Prop = {
    onSelect: (category: string) => void;
    categories: Category[];
}

export default function Sidebar({ onSelect, categories }: Prop) {
    const [select, setSelect] = useState<string>("all");

    const handler = (categoryId: string) => {
        setSelect(categoryId);
        onSelect(categoryId);
    }

    return (
        <div className={style.container}>
            <div className={style.menu}>
                <ul>
                    <li
                        className={select === 'all' ? style.active : ''}
                        onClick={() => handler('all')}
                    >
                        All Skills
                    </li>

                    {[...categories]
                    .sort((a,b) => (categoryOrderMap[a.name] ?? 999) - (categoryOrderMap[b.name] ?? 999))
                    .map((cate) => (
                        <li  key={cate.categoryId} className={select === cate.categoryId ? style.active : ""}
                            onClick={() => handler(cate.categoryId)}
                        >
                           {cate.name}
                        </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}