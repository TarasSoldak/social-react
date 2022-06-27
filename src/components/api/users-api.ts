import { GetUsersType, instance, ResponseDataType } from './api';


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend:string) {
        return instance
            .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === 'null' ? '' : `&friend=${friend}`))
            .then((response) => {
                return response.data
            });
    },
    following(userId: number) {
        return instance.post<ResponseDataType>(`follow/${userId}`).then((response) => {
            return response.data;
        });
    },
    unFollowing(userId: number) {
        return instance.delete<ResponseDataType>(`follow/${userId}`).then((response) => {
            return response.data;
        });
    },
};