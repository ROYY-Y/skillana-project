'use client'

import style from './section.module.css'
import { useMemo } from 'react'
import Image from 'next/image'
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
    badges: BadgeData[];
    user: User | null;
    mode: "all" | "collections"; 
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

export default function Section({ category, badges, user, mode }: Prop) {


    const group = useMemo(() => {
    if (!user) return {};

    const userBadgeSet = new Set(
        user.badges.map(b => b.badgeId)
    );

    const mergeBadge: BadgeOwned[] = badges.map((badge) => ({
        ...badge,
        owned: userBadgeSet.has(badge._id)
    }));

    return mergeBadge.reduce((acc, badge) => {
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

}, [badges, user]);

    //if (!user) return <div>Loading...</div>;

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
                .map(([id, groupItem]) => {

                    
                    const displayBadges =
                        mode === "collections"
                            ? groupItem.badge.filter(b => b.owned)
                            : groupItem.badge;

                    return (
                        <div key={id}>
                            <h1 style={{ fontSize: "45px" }}>
                                {groupItem.categoryName}
                            </h1>

                            <div className={style.container}>

                               
                                {mode === "collections" && displayBadges.length === 0 ? (
                                    <h2 className={style.empty}>
                                        You don't have any badges in this category yet
                                    </h2>
                                ) : (

                                    <div className={style.grid}>
                                        {displayBadges.map((b) => (
                                            <div
                                                key={b._id}
                                                className={`${style.badge} ${b.owned ? style.owned : ''}`}
                                            >
                                                <div className={style.imageWrapper}>
                                                    <Image
                                                        src={`/${b.imgUrl}`}
                                                        alt={b.badgeName}
                                                        width={100}
                                                        height={100}
                                                        className={b.owned ? style.faded : ''}
                                                    />

                                                    {b.owned && (
                                                        <img
                                                            src="/check.png"
                                                            alt="owned"
                                                            className={style.check}
                                                        />
                                                    )}
                                                </div>

                                                <h3 className={style.badgeName}>
                                                    {b.badgeName}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>

                                )}
                            </div>
                        </div>
                    );
                })}
        </>
    );
}