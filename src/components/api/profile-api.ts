import { GetProfileType, PhotosType } from "../redux/profileReducer";
import { instance, ResponseDataType } from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileType>(`profile/` + userId).then((response) => {
            return response.data;
        });
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseDataType>(`profile/status`, { status: status }).then(response => response.data)
    },
    saveProfile(profile: GetProfileType) {
        return instance.put<ResponseDataType<GetProfileType>>(`profile`, profile).then(response => response.data)
    },
    savePhoto(filePhoto: File) {
        const formData = new FormData();
        formData.append("image", filePhoto);
        return instance.put<ResponseDataType<PhotosType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => response.data)
    },
};