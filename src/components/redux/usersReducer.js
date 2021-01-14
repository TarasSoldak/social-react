import { usersAPI } from "../api/api";

const SET_USERS = "users/SET_USERS";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOW = "users/FOLLOW";
const UN_FOLLOW = "users/UN_FOLLOW";
const TOGGLE_FOLLOWING_PROGRESS = "users/TOGGLE_FOLLOWING_PROGRESS";

const initialState = {
  users: [],
  pageSize: 90,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UN_FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingProgress: action.payload.isFetching
          ? [...state.followingProgress, action.payload.userId]
          : [
              state.followingProgress.filter(
                (id) => id !== action.payload.userId
              ),
            ],
      };
    default:
      return state;
  }
};

const setUsers = (users) => ({ type: SET_USERS, payload: users });
const follow = (userId) => ({ type: FOLLOW, payload: userId });
const unFollow = (userId) => ({ type: UN_FOLLOW, payload: userId });
const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  payload: totalUsersCount,
});
const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  payload: { isFetching, userId },
});
const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});
const togleIsfetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  payload: isFetching,
});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(togleIsfetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(togleIsfetching(false));
  dispatch(setCurrentPage(currentPage));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(setUsers(data.items));
};

export const followSuccess = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await usersAPI.following(userId);
  if (data.resultCode === 0) {
    dispatch(follow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};
export const unFollowSuccess = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await usersAPI.unFollowing(userId);
  if (data.resultCode === 0) {
    dispatch(unFollow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};
export default usersReducer;
