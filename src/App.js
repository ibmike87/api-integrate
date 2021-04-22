import React from 'react';
//import Users from './Users';
import NewUsers from "./NewUsers";
import {UsersProvider} from "./UsersContext";

function App() {
  //직접 만든 커스텀 Hook 으로 동작하는 경우
  // return <Users />;

  //react-async 로 동작하는 경우
  // return <NewUsers />;

  //Context 와 함께 사용하기
  return (
      <UsersProvider>
        <NewUsers />
      </UsersProvider>
  );
}

export default App;
