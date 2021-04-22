import React, { useState } from 'react';
import { useUsersState, useUsersDispatch, getUsers } from "./UsersContext";
import User from './User';

// import axios from 'axios';
// import { useAsync } from 'react-async';

// useAsync 에서는 Promise 의 결과를 바로 data에 담기 때문에
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬.
/*async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}*/

function NewUsers() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const { data: users, loading, error } = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };


    // 렌더링하는 시점이 아닌 사용자의 특정 인터랙션에 따라 API 를 호출하고 싶을 땐 promiseFn 대신 deferFn 을 사용하고, reload 대신 run 함수를 사용
    // const { data: users, error, isLoading, run } = useAsync({
    //     deferFn: getUsers
    // });

    if (loading)
        return <div>로딩중 .... </div>;

    if (error)
        return <div>에러가 발생했습니다.</div>;

    if (!users)
        return <button onClick={fetchData}>불러오기</button>;

    return (
        <>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id} onClick={() => setUserId(user.id)} style={{ cursor: 'pointer' }}>
                            {user.username} ({user.name})
                        </li>
                    ))
                }
            </ul>

            <button onClick={fetchData}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default NewUsers;