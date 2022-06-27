import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader/Preloader';
import { RootState } from '../redux/store';
import { FilterType, getUsers } from '../redux/usersReducer';
import Pagination from './Pagination';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
// const queryString = require('query-string');

const UsersHook: FC = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector((state: RootState) => state.usersPage.isFetching)
    const users = useSelector((state: RootState) => state.usersPage.users)
    const currentPage = useSelector((state: RootState) => state.usersPage.currentPage)
    const pageSize = useSelector((state: RootState) => state.usersPage.pageSize)
    const filter = useSelector((state: RootState) => state.usersPage.filter)
    const totalUsersCount = useSelector((state: RootState) => state.usersPage.totalUsersCount)
    const followingProgress = useSelector((state: RootState) => state.usersPage.followingProgress)

    const history = useHistory()
    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        history.push({
            pathname:'/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage, history]);



    const onPageChange = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    };

    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))

    }
    return <div>
        {isFetching ? <Preloader /> : null}
        <UsersSearchForm onFilterChange={onFilterChange} />

        <div>

            <div className="pagination">
                <Pagination
                    onPageChange={onPageChange}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                />
            </div>

            {users.map((u) => <User
                key={u.id}
                user={u}
                followingProgress={followingProgress}
            />)}
        </div>
    </div>
};

export default UsersHook;
