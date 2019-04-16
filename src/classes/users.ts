export default class User {
    userid: number; // primary key
    heroname: string; // not null, unique
    password: string; // not null
    firstname: string; // not null
    lastname: string; // not null
    email: string; // not null
    roleid: number; // not null

    constructor(userId: number, heroname: string, password: string,
        firstName: string, lastName: string, email: string, role: number) {
        this.userid = userId;
        this.heroname = heroname;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.roleid = role;
    }
}

