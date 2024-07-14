export interface User {
    id?: string;
    email: string;
    name: string;
    cats: string[];
}

export default class UserModel implements User {
    id?: string;
    email: string;
    name: string;
    cats: string[];

    constructor(user: User) {
        const missingProperties: string[] = [];

        if (!user.email) missingProperties.push('email');
        if (!user.name) missingProperties.push('name');
        if (!user.cats) missingProperties.push('cats');

        if (missingProperties.length > 0) {
            throw new Error(`Missing required properties: ${missingProperties.join(', ')}`);
        }

        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.cats = user.cats;
    }

    toObject() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            cats: this.cats
        };
    }
}