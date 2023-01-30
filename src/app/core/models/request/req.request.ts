export interface Request {
    [key: string]: any;
    page?: string;
    limit?: string;
    sortBy?: string;
    createdAt?: string;
    order?: string;
}