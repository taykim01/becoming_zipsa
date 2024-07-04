interface CatModel {
    id?: string;
    userID: string;
    catName: string;
    color: CatType;
    sex: Sex;
    catStatus: CatStatus;
    catChapter: CatChapter;
    catChat: CatChat[];
    neutered: boolean;
    birthday: Date;
    badges: string[];
}

type Badges = "깨끗한 고양이" | "건강한 고양이" | "씩씩한 고양이"

type CatStatus = {
    hunger: number;
    health: number;
    affection: number;
}

type Sex = "수컷" | "암컷"

type CatType = "치즈냥이" | "깜냥이" | "흰냥이"

type CatChapter = "첫 만남" | "아기 고양이" | "청소년 고양이" | "성인 고양이" | "나이든 고양이"

type CatChat = {
    side: string, message: string
}