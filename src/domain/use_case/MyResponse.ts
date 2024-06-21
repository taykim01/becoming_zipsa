export default class MyResponse {
    success: boolean;
    message: string;
    data: any;

    constructor(
        success: boolean,
        message: string,
        data: any,
    ) {
        if (success === undefined || !message) {
            if(success === undefined) throw new Error("Success is undefined.")
            if(!message) throw new Error("Message is undefined.")
        }
        this.success = success;
        this.message = message;
        this.data = data;
    }
}