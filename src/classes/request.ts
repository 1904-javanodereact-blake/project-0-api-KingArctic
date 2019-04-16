export default class Request {
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    dateSubmitted: number; // not null
    dateResolved: number;
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign key -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType
}