//고양이 모델 지정
//1. 인터페이스
interface CatModel {
    id?: string;
    userID : string;
    catName : string;
    color : string;
    sex : "수컷" | "암컷";
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

type CatChapter = "첫 만남" | "아기 고양이" | "청소년 고양이" | "성인 고양이" | "나이든 고양이"

type CatChat = { 
    side: string , message: string
}