import React from 'react';
import axios from 'axios';
import useAsync from "./useAsync";

// useAsync 에서는 Promise 의 결과를 바로 data에 담기 때문에
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬.
async function getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);  //id 가 바뀔 때 마다 재호출
    const { loading, data: user, error } = state;

    if (loading)
        return <div>로딩중 .... </div>;

    if (error)
        return <div>에러가 발생했습니다.</div>;

    if (!user)
        return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;