import * as React from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useRelayEnvironment } from 'react-relay/hooks';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'relay-hooks';
import { RoundedButton, Card, TextInput } from '@sancathon/ui';
import styled from 'styled-components';

import { UserCreateMutation } from './mutations/UserCreateMutation';

import { UserCreateMutationResponse } from './mutations/__generated__/UserCreateMutation.graphql';
import { UserEditQueryResponse } from '../__generated__/UserEditQuery.graphql';
import { UserEditMutationResponse } from './mutations/__generated__/UserEditMutation.graphql';
import { UserEditMutation } from './mutations/UserEditMutation';

const Wrapper = styled.div`
  margin: auto;
`;

const UserAddSchema = Yup.object().shape({
  username: Yup.string().required('Preencha o campo de usuário'),
  email: Yup.string().required('Preencha o campo de e-mail'),
  name: Yup.string().required('Preencha o campo de nome'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

const UserEditSchema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string(),
  name: Yup.string(),
  password: Yup.string().min(6, 'A senha deve ter no minímo 6 caracteres'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

type Values = {
  username: string;
  password: string;
  email: string;
  name: string;
  confirmPassword: string;
};

const initialValues = {
  username: '',
  password: '',
  email: '',
  name: '',
  confirmPassword: '',
};

interface Props {
  user?: UserEditQueryResponse['node'];
}

const useUserMutation = ({ user }) => {
  const history = useHistory();
  const relayEnvironment = useRelayEnvironment();

  if (user) {
    const onCompleted = ({ UserEdit }: UserEditMutationResponse) => {
      if (!UserEdit) return toast.error('Ocorreu um erro ao tentar editar o usuário');
      toast.info('Usuário editado com sucesso!');
      return history.push('/dashboard/users');
    };

    const onError = () => {
      toast.error('Ocorreu um erro ao tentar editar o usuário');
    };

    const [mutate] = useMutation(
      UserEditMutation,
      {
        onCompleted,
        onError,
      },
      relayEnvironment,
    );

    return values =>
      mutate({
        variables: {
          input: { id: user.id, password: values.password, email: values.email, name: values.name },
        },
      });
  }

  const onCompleted = ({ UserCreate }: UserCreateMutationResponse) => {
    if (!UserCreate) return toast.error('Ocorreu um erro ao tentar cadastrar o usuário');
    toast.info('Usuário criado com sucesso!');
    return history.push('/dashboard/users');
  };

  const onError = () => {
    toast.error('Usuário já existe!');
  };

  const [mutate] = useMutation(
    UserCreateMutation,
    {
      onCompleted,
      onError,
    },
    relayEnvironment,
  );

  return values =>
    mutate({
      variables: {
        input: { username: values.username, password: values.password, email: values.email, name: values.name },
      },
    });
};

const UserForm: React.FC<Props> = ({ user }) => {
  const onSubmit = useUserMutation({ user });
  const { getFieldProps, getFieldMeta, values, handleSubmit, isSubmitting, isValid } = useFormik<Values>({
    initialValues: {
      ...initialValues,
      ...(user as Values),
    },
    validationSchema: !!user ? UserEditSchema : UserAddSchema,
    onSubmit: () => onSubmit(values),
  });

  return (
    <Wrapper>
      <Card width="25rem">
        <TextInput label="Name" name="name" {...getFieldProps('name')} {...getFieldMeta('name')} />
        <TextInput label="Email" name="email" {...getFieldProps('email')} {...getFieldMeta('email')} />
        <TextInput
          label="Usuário"
          name="username"
          {...getFieldProps('username')}
          {...getFieldMeta('username')}
          disabled={!!user}
        />
        <TextInput
          label="Senha"
          name="password"
          {...getFieldProps('password')}
          {...getFieldMeta('password')}
          type="password"
        />
        <TextInput
          label="Confirme a senha"
          name="confirmPassword"
          {...getFieldProps('confirmPassword')}
          {...getFieldMeta('confirmPassword')}
          type="password"
        />
        <RoundedButton
          color="accent"
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
        >
          {!!user ? 'Editar' : 'Cadastrar'}
        </RoundedButton>
      </Card>
    </Wrapper>
  );
};

export default UserForm;
