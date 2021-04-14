import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
// import useAsync from "./useAsync";


/*
* react-async 사용법
*
import { useAsync } from "react-async"

const loadCustomer = async ({ customerId }, { signal }) => {
  const res = await fetch(`/api/customers/${customerId}`, { signal })
  if (!res.ok) throw new Error(res)
  return res.json()
}

const MyComponent = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadCustomer, customerId: 1 })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)
    return (
      <div>
        <strong>Loaded some data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  return null
}
*/



async function getUser({ id }) {
// async function getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

function User({ id }) {
    const { data: user, error, isLoading } = useAsync({
        promiseFn: getUser,
        id,
        watch: id
    });

    // const [state] = useAsync(() => getUser(id), [id]);  //id 가 바뀔 때 마다 재호출
    // const { loading, data: user, error } = state;

    if (isLoading)
    // if (loading)
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