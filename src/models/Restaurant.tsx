export class Restaurant {
    constructor(name: string, city: string, state: string, telephone: string, genre: string) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.telephone = telephone;
        this.genre = genre;
    }

    name: string;
    city: string;
    state: string;
    telephone: string;
    genre: string;
}