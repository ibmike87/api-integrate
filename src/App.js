import React from 'react';
import Users from './Users';
import NewUsers from "./NewUsers";

function App() {
  //직접 만든 커스텀 Hook 으로 동작하는 경우
  // return <Users />;

  //react-async 로 동작하는 경우
  return <NewUsers />;
}

export default App;
