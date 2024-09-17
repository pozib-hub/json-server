export interface IAddress {
    street: string
    city: string
    zip: string
}

export interface IProfile {
    id: string,
    firstname: string
    lastname: string
    age: string
    address: IAddress
    hobbies: string[]
    avatar: null
}

export interface IUser {
    id: string
    username: string
    password: string
    avatar?: string
    roles: string[]
}

export interface IComment {
    id: string
    text: string
    articleId: string
    userId: string
}

interface IBaseBlock {
    id: string
    type: "CODE" | "IMAGE" | "TEXT"
}

export interface ICodeBlock extends IBaseBlock {
    code: string
    type: "CODE"
}

export interface IImageBlock extends IBaseBlock {
    src: string
    type: "IMAGE"
    title: string
}

export interface ITextBlock extends IBaseBlock {
    paragraphs: string[]
    type: "TEXT"
    title?: string
}

export enum ArticleType {
    SCIENCE = "Science",
    FRONTEND = "Frontend",
    TECH = "Tech",
    IT = "IT",
    BACKEND = "Backend",
    DEVELOPMENT = "Development",
}

export type ArticleBlock = ICodeBlock | IImageBlock | ITextBlock

export interface IArticle {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticleType[]
    blocks: ArticleBlock[]
    userId: string
}

export type DB = {
    profiles: IProfile[]
    users: IUser[]
    articles: IArticle[]
    comments: IComment[]
}



