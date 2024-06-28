//고양이 모델 지정
//1. 인터페이스
interface CatModel {
    catID : string;
    userID : string;
    catName : string;
    color : string;
    sex : string;
    catStatus:CatStatus;
    catEvent : CatEvent;
    catChapter : CatChapter;
    catChat : CatChat[];

}
//Cat Status : hunger, health, affection
type CatStatus = {
    hunger : number;
    health : number;
    affection : number;
}
//Cat Event : num of Friends, Neutered or not, disease
type CatEvent = {
    Friends : number;
    NTR : boolean;
    disease : number;
}
type CatChapter = "firstMeeting" | "baby" | "adolescence" | "adult" | "oldCat"

type CatChat = {
    uid : string;
    userPrompt : string;
    catResponse: string;
}