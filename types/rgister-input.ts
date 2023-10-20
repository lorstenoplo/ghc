export type RegisterInput = {
    username: string;
    password: string;
};

export interface User extends RegisterInput {
    createdAt: string;
}