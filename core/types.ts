export interface IProfile {
    id: string
    firstname: string
    lastname: string
    age: string
    hobbies: string[]
    avatar: string
    subdivision: {
        id: string
        name?: string
    } | null
    address: {
        id: string
        name?: string
    } | null
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
    type: 'CODE' | 'IMAGE' | 'TEXT'
}

export interface ICodeBlock extends IBaseBlock {
    code: string
    type: 'CODE'
}

export interface IImageBlock extends IBaseBlock {
    src: string
    type: 'IMAGE'
    title: string
}

export interface ITextBlock extends IBaseBlock {
    paragraphs: string[]
    type: 'TEXT'
    title?: string
}

export enum ArticleType {
    SCIENCE = 'Science',
    FRONTEND = 'Frontend',
    TECH = 'Tech',
    IT = 'IT',
    BACKEND = 'Backend',
    DEVELOPMENT = 'Development',
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
export interface INotification {
    userId: string
    id: string
    title: string
    description: string
    href?: string
}

interface IRateBase {
    id: string
    userId: string
    rate: number
    feedback: string
}

export interface IRateArticle extends IRateBase {
    articleId: string
}
export interface IRateProfile extends IRateBase {
    profileId: string
}

export interface IUserSettings {
    userId: string
    [key: string]: string
}

export interface IAddress {
    id: string
    name: string
    workSchedule: {
        id: string
        workSchedule: {
            id: string
            days: {
                startWork: string
                finishWork: string
                startBreak: string
                finishBreak: string
            }
        }
    }
}

export interface ISubdivision {
    id: string
    name: string
    defaultAddressId: string
    defaultAddressName: string
    addresses: IAddress[]
}

export type DB = {
    profiles: IProfile[]
    users: IUser[]
    articles: IArticle[]
    comments: IComment[]
    notifications: INotification[]
    rating_articles: IRateArticle[]
    userSettings: IUserSettings[]
    subdivisions: ISubdivision[]
}
