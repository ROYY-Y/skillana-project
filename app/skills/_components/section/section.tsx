'use client'

import style from './section.module.css'
import { useState, useEffect } from 'react'

export interface Category {
    categoryId: string;
    name: string;
}

export interface BadgeData {
    _id: string;
    badgeName: string;
    imgUrl: string;
    category: Category;
}
export interface UserBadge {
    badgeId: string;
    badgeName: string;
    imgUrl: string;
    earnedAt: string;
}
export interface User {
    _id?: string;
    badges: UserBadge[];
}

type Prop = {
    category: string;
    categories: Category[];
    badges: BadgeData[];
    user: User | null;
}

type BadgeOwned = BadgeData & { owned: boolean }

type GroupedBadges = Record<
    string,
    {
        categoryName: string;
        order: number;
        badge: BadgeOwned[];
    }
>;
export const categoryOrderMap: Record<string, number> = {
        "Website Development": 1,
        "Programming Language": 2,
        "Data Science": 3,
        "Database": 4,
        "Cloud & DevOps": 5
};
export default function Section({ category, categories, badges, user }: Prop) {
    const [group, setGroup] = useState<GroupedBadges>({});
    
    useEffect(() => {
    
    if (!user || !badges.length) {
    setGroup({});
    return;
}

    

   const userBadgeSet = new Set(
    user.badges.map(b => b.badgeId)
);

    const mergeBadge: BadgeOwned[] = badges.map((badge) => ({
        ...badge,
        owned: userBadgeSet.has(badge._id)
    }));

    const groupBadge = mergeBadge.reduce((acc, badge) => {
        if (!badge.category) return acc;
        const id = badge.category.categoryId.toString();
        const name = badge.category.name;
        const normalized = name.trim();
        if (!acc[id]) {
            acc[id] = {
                categoryName: name,
                order: categoryOrderMap[normalized] ?? 999,
                badge: []
            };
        }
        acc[id].badge.push(badge);
        return acc;
    }, {} as GroupedBadges);

    setGroup(groupBadge);
}, [badges, user]);


if (!user) return <div>Loading...</div>;
if (badges.length === 0 && Object.keys(group).length === 0) {
    return <div>No badges found.</div>;
}

   

    const filteredGroup = Object.entries(group).filter(([id]) => {
        if (category === 'all') return true;
        return id === category;
    });

    return (
        <>
            {filteredGroup
                .sort((a, b) => a[1].order - b[1].order)
                .map(([id, groupItem]) => (
                    <div key={id}>
                        <h1 style={{ fontSize: "45px" }}>{groupItem.categoryName}</h1>
                        <div className={style.container}>
                            <div className={style.grid}>
                                {groupItem.badge.map((b) => (
                                    <div key={b._id} className={style.badge}>
                                        <img src={b.imgUrl} alt={b.badgeName} />
                                        <h3 className={style.badgeName}>{b.badgeName}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}