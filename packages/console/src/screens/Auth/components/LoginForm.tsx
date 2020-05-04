import { useFormik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'relay-hooks';
import { useRelayEnvironment } from 'react-relay/hooks';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Card, CardHeader, TextInput, Checkbox, RoundedButton } from '@sancathon/ui';

import { login } from '../../../utils/security';
import { UserLoginMutationResponse } from './mutations/__generated__/UserLoginMutation.graphql';
import { UserLoginMutation } from './mutations/UserLoginMutation';

const Wrapper = styled.div`
  margin: auto;
`;

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Preencha o campo de usuário'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
});

type Values = {
  username: string;
  password: string;
};

const initialValues = {
  username: '',
  password: '',
  remember: false,
};

const LoginInnerForm = () => {
  const history = useHistory();
  const relayEnvironment = useRelayEnvironment();
  const { getFieldProps, getFieldMeta, values, setFieldValue, handleSubmit, isSubmitting, isValid } = useFormik<Values>(
    {
      initialValues,
      validationSchema: LoginSchema,
      validateOnMount: true,
      onSubmit: () => mutate({ variables: { input: { username: values.username, password: values.password } } }),
    },
  );

  const onCompleted = ({ UserLogin }: UserLoginMutationResponse) => {
    if (!UserLogin || !UserLogin.token)
      return toast.error('Ocorreu um erro ao tentar entrar. Verique usuário e senha!');
    login(UserLogin.token, values.remember);
    toast.info('Login feito com sucesso!');
    return history.push('/dashboard');
  };

  const onError = () => {
    toast.error('Usuário ou senha inválidos!');
  };

  const [mutate] = useMutation(
    UserLoginMutation,
    {
      onCompleted,
      onError,
    },
    relayEnvironment,
  );

  return (
    <Wrapper>
      <Card width="25rem">
        <CardHeader>Faça login para continuar</CardHeader>
        <TextInput label="Usuário" name="username" {...getFieldProps('username')} {...getFieldMeta('username')} color="accent" />
        <TextInput
          label="Senha"
          name="password"
          {...getFieldProps('password')}
          {...getFieldMeta('password')}
          type="password"
          color="accent"
        />
        <Checkbox
          {...getFieldProps('remember')}
          onChange={e => setFieldValue('remember', e.target.checked)}
          name="remember"
          color="secondary"
          label="Lembrar de mim"
        />
        <RoundedButton
          color="secondary"
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
        >
          Entrar
        </RoundedButton>
      </Card>
    </Wrapper>
  );
};

export default LoginInnerForm;
