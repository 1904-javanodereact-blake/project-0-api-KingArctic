export default class Request {
    requestId: number; // primary key
    author: number;  // foreign key -> User, not null
    datesubmitted: number; // not null
    dateresolved: number;
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign key -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType
    imageurl: string;

    constructor(requestid: number, author: number, datesubmitted: number, dateresolved: number, description: string, resolver: number, status: number, type: number, imageurl: string) {
        this.requestId = requestid;
        this.author = author;
        this.datesubmitted = datesubmitted;
        this.dateresolved = dateresolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
        this.imageurl = imageurl;
    }
}