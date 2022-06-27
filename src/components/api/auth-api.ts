import { instance, ResponseDataType } from "./api";


export type GetAuthDataType = {
    id: number
    email: string
    login: string
}
export type LoginType = {
    userId: number
}

export const authAPI = {
    getAuthData() {
        return instance.get<ResponseDataType<GetAuthDataType>>(`auth/me`).then((response) => {
            return response.data;
        });
    },

    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance
            .post<ResponseDataType<LoginType>>(`auth/login`, { email, password, rememberMe, captcha })
            .then((response) => {
                return response.data;
            });
    },
    logOut() {
        return instance.delete(`auth/login`).then((response) => {
            return response.data;
        });
    },
};