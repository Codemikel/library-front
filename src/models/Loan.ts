import type { Book } from "./Book";
import type { User } from "./User";

export interface Loan {
    id: number;
    book_id?: number;
    user_id: number;
    loan_date: string;
    return_date: string;
    returned: boolean;
    created_at?: string;
    updated_at?: string;
    user?: User;
    book?: Book;
}