// import React, { useState, useEffect } from 'react';
// import React, { useReducer, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import useAsync from "./useAsync";

// useAsync 에서는 Promise 의 결과를 바로 data에 담기 때문에
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬.
async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

/*
* useAsync 로 이동함...
function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS" :
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR" :
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
*/

function Users() {

    /*
    * useAsync 로 이동함...
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    */
    // const [users, setUsers] = useState(null);
    // const [loading, setLoading] = useState(null);
    // const [error, setError] = useState(null);
/*
    const fetchUsers = async () => {
        dispatch({type: 'LOADING'});

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({type: 'SUCCESS', data: response.data});

            /!*
            // 요청을 시작할 때에는 error 와 users를 초기화하고
            setError(null);
            setUsers(null);

            //loading 상태를 true 로 바꾸고
            setLoading(true);

            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data); // 데이터는 response.data 안에 있습니다.
            *!/
        }
        catch (e) {
            // setError(e);
            dispatch({type: 'ERROR', error: e});
        }

        // setLoading(false);
    };
*/
    //컴포넌트 마운트, 언마운트 할때 작업 설정
/*    useEffect(() => {
        fetchUsers();
    }, []);
*/


    const [state, refetch] = useAsync(getUsers, []);

    const { loading, data: users, error } = state;    //state.data 를 users 키워드로 조회

    if (loading)
        return <div>로딩중 .... </div>;

    if (error)
        return <div>에러가 발생했습니다.</div>;

    if (!users)
        return null;

    return (
        <>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>
                            {user.username} ({user.name})
                        </li>
                    ))
                }
            </ul>

            <button onClick={refetch}>다시 불러오기</button>
        </>
    );
}

export default Users;