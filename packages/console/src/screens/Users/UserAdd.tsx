import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ContentHeader } from '@sancathon/ui';

import UserForm from './components/UserForm';

const UserAdd = () => {
  const history = useHistory();
  return (
    <>
      <ContentHeader title="Adicionar Usuário" backAction={() => history.push('/dashboard/users')} />
      <UserForm />
    </>
  );
};

export default UserAdd;
