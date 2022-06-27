import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/users-api";
import { InferActionsType, RootState } from "./store";


export type UsersItemType = {
  name: string
  id: number
  photos: {
    small: string
    large: string
  }
  status: string
  followed: boolean
}

const initialState = {
  users: [] as Array<UsersItemType>,
  pageSize: 90,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>,
  filter:{
    term:'',
    friend:''
  }
};
type InitialState = typeof initialState
export type FilterType = typeof initialState.filter



const usersReducer = (state = initialState, action: ActionsUsersTypes): InitialState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case 'UN_FOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.payload };
    case 'TOGGLE_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };
    case 'SET_TERM':
      return {...state, filter:action.payload}

    default:
      return state;
  }
};
type ActionsUsersTypes = InferActionsType<typeof actions>

const actions = {

  setUsers: (users: Array<UsersItemType>) => ({ type: 'SET_USERS', payload: users } as const),
  follow: (userId: number) => ({ type: 'FOLLOW', payload: userId } as const),
  unFollow: (userId: number) => ({ type: 'UN_FOLLOW', payload: userId } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', payload: totalUsersCount, } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', payload: currentPage } as const),
  togleIsfetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', payload: isFetching } as const),
  setFilter: (filter: FilterType ) => ({ type: 'SET_TERM', payload: filter} as const),

}



type ThunkUsersType = ThunkAction<Promise<void>, RootState, unknown, ActionsUsersTypes>
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkUsersType => async (dispatch) => {
  dispatch(actions.togleIsfetching(true));
  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setFilter(filter))

  const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
  dispatch(actions.togleIsfetching(false));
  dispatch(actions.setTotalUsersCount(data.totalCount));
  dispatch(actions.setUsers(data.items));
};

export const followSuccess = (userId: number): ThunkUsersType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await usersAPI.following(userId);
  if (data.resultCode === 0) {
    dispatch(actions.follow(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};
export const unFollowSuccess = (userId: number): ThunkUsersType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await usersAPI.unFollowing(userId);
  if (data.resultCode === 0) {
    dispatch(actions.unFollow(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};
export default usersReducer;
