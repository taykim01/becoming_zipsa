//고양이 모델 지정
//1. 인터페이스
interface CatModel {
    id?: string;
    userID : string;
    catName : string;
    color : string;
    sex : string;
    catStatus:CatStatus;
    catChapter : CatChapter;
    catChat : CatChat[];
    neutered : boolean;

}
//Cat Status : hunger, health, affection
type CatStatus = {
    hunger : number;
    health : number;
    affection : number;
}

type CatChapter = "firstMeeting" | "baby" | "adolescence" | "adult" | "oldCat"

type CatChat = { 
    side: string , message: string
}