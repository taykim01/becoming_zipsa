export type CatSex = "수컷" | "암컷"

export type CatType = "치즈냥이" | "깜냥이" | "흰냥이"

export type CatChapter = "첫 만남" | "아기 고양이" | "청소년 고양이" | "어른 고양이" | "나이든 고양이" | "고양이 별"

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
    medicated: boolean;
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
    medicated: boolean;

    constructor(cat: Cat) {
        const missingProperties: string[] = [];

        if (!cat.user_id) missingProperties.push('user_id');
        if (!cat.name) missingProperties.push('name');
        if (!cat.color) missingProperties.push('color');
        if (!cat.sex) missingProperties.push('sex');
        if (cat.neutered === undefined) missingProperties.push('neutered');
        if (!cat.chapter) missingProperties.push('chapter');
        if (!cat.chats) missingProperties.push('chats');
        if (cat.hunger === undefined) missingProperties.push('hunger');
        if (cat.affection === undefined) missingProperties.push('affection');
        if (cat.health === undefined) missingProperties.push('health');
        if (cat.age === undefined) missingProperties.push('age');
        if (!cat.birthday) missingProperties.push('birthday');

        if (missingProperties.length > 0) {
            throw new Error(`Missing required properties: ${missingProperties.join(', ')}`);
        }

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
        this.medicated = cat.medicated;
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
            birthday: this.birthday,
            medicated: this.medicated
        };
    }
}