import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/profile-api";
import { InferActionsType, RootState } from "./store";
export type PhotosType = {
  small: string | null
  large: string | null
}
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type GetProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe:string

}

const initialState = {
  profile: null as GetProfileType | null,
  status: ""
};
type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ProfileActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload } as GetProfileType,
      };
    default:
      return state;
  }
};
type ProfileActionType = InferActionsType<typeof actions>

const actions = {
  setUserProfile: (profile: GetProfileType) => ({ type: 'SET_USER_PROFILE', payload: profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', payload: status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', payload: photos } as const)
}


type ThunkProfileType = ThunkAction<Promise<void>, RootState, unknown, ProfileActionType | FormAction>
export const getUserProfile = (userId: number): ThunkProfileType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};
export const getUserStatus = (userId: number): ThunkProfileType => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(status));
};
export const updateUserStatus = (status: string): ThunkProfileType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
};
export const savePhoto = (file: File): ThunkProfileType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data));
  }
};
export const saveProfile = (profile: GetProfileType): ThunkProfileType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('userId can not be null')
    }
  } else {
    dispatch(stopSubmit("profile-data", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
