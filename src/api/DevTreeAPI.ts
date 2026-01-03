import { isAxiosError } from "axios";
import api from "../config/axios";
import type { handleUser, LoginForm, RegisterForm, User } from "../types";

export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file)
    try {
        const { data } = await api.post('/user/image', formData)
        return (data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const { data } = await api<handleUser>(`/${handle}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function searchByhandle(handle: string) {
    try {
        const { data } = await api.post<string>(`/search`, { handle })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function handleRegister(formData: RegisterForm) {
    try {
        const { data } = await api.post<string>(`/auth/register`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function handleLogin(formData: LoginForm) {
    try {
        const { data } = await api.post<string>(`/auth/login`, formData)
        localStorage.setItem('AuthToken', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}