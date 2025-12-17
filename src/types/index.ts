export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    password_confirmation : string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type UserProfileForm = Pick<User, 'handle' | 'description'> 

//Social 

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled : boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>