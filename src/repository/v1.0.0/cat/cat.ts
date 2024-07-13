export type CatSex = "수컷" | "암컷"

export type CatType = "치즈냥이" | "깜냥이" | "흰냥이"

export type CatChapter = "첫 만남" | "아기 고양이" | "청소년 고양이" | "어른 고양이" | "나이든 고양이" | "무지개 다리"

export type CatChat = {
    role: string, content: string
}

export interface Cat {
    id?: string;
    user_id: string;
    name: string;
    color: CatType;
    sex: CatSex;
    neutered: boolean;
    chapter: CatChapter;
    chats: CatChat[];
    hunger: number;
    affection: number;
    health: number;
    age: number;
    birthday: Date;
}

export default class CatModel implements Cat {
    id?: string;
    user_id: string;
    name: string;
    color: CatType;
    sex: CatSex;
    neutered: boolean;
    chapter: CatChapter;
    chats: CatChat[];
    hunger: number;
    affection: number;
    health: number;
    age: number;
    birthday: Date;

    constructor(cat: Cat) {
        this.id = cat.id;
        this.user_id = cat.user_id;
        this.name = cat.name;
        this.color = cat.color;
        this.sex = cat.sex;
        this.neutered = cat.neutered;
        this.chapter = cat.chapter;
        this.chats = cat.chats;
        this.hunger = cat.hunger;
        this.affection = cat.affection;
        this.health = cat.health;
        this.age = cat.age;
        this.birthday = cat.birthday;
    }

    toObject() {
        return {
            id: this.id,
            user_id: this.user_id,
            name: this.name,
            color: this.color,
            sex: this.sex,
            neutered: this.neutered,
            chapter: this.chapter,
            chats: this.chats,
            hunger: this.hunger,
            affection: this.affection,
            health: this.health,
            age: this.age,
            birthday: this.birthday
        };
    }
}