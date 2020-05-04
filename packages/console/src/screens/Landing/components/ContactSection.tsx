import * as React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'relay-hooks';
import { useRelayEnvironment } from 'react-relay/hooks';
import { toast } from 'react-toastify';

import {RoundedButton, TextInput, Card, getLightenDarkenColor} from '@sancathon/ui/src';
import { ContactCreateMutation } from './mutations/ContactCreateMutation';
import media from 'styled-media-query'

const Section = styled(Card)`
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 1rem;
  ${media.lessThan('medium')`
    padding: 0;
  `}
  background-color: ${props => getLightenDarkenColor(props.theme.palette.primary, -30) + 'c4'};
`;

const Form = styled.form`
  margin: 1rem auto;
`;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;

interface Values {
  name: string;
  email: string;
  businessType: string;
  businessRequirement: string;
}

const initialValues = {
  name: '',
  email: '',
  businessType: '',
  businessRequirement: '',
};

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Preencha o campo de nome'),
  email: Yup.string().required('Preencha o campo de email'),
  businessType: Yup.string().required('Preencha o campo de tipo de negócio'),
  businessRequirement: Yup.string().required('Preencha o campo de requisitos do negócio'),
});

const ContactSection = () => {
  const relayEnvironment = useRelayEnvironment();
  const [mutate] = useMutation(
    ContactCreateMutation,
    {
      onCompleted: () => toast.info('Sua solicitação de orçamento foi enviada!'),
      onError: () => toast.error('Ocorreu um erro na sua solicitação, tente novamente mais tarde.'),
    },
    relayEnvironment,
  );

  const { getFieldProps, getFieldMeta, values, handleSubmit, isSubmitting, isValid } = useFormik<Values>({
    initialValues,
    validationSchema: ContactSchema,
    validateOnMount: true,
    onSubmit: () =>
      mutate({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            businessType: values.businessType,
            businessRequirement: values.businessRequirement,
          },
        },
      }),
  });

  return (
    <Section>
      <Form>
        <Title>Solicite seu orçamento</Title>
        <TextInput label="Nome" name="name" {...getFieldProps('name')} {...getFieldMeta('name')} />
        <TextInput label="E-mail" name="email" type="email" {...getFieldProps('email')} {...getFieldMeta('email')} />
        <TextInput
          label="Tipo de negócio"
          name="businessType"
          {...getFieldProps('businessType')}
          {...getFieldMeta('businessType')}
        />
        <TextInput
          label="Requisitos do negócio"
          name="businessRequirement"
          {...getFieldProps('businessRequirement')}
          {...getFieldMeta('businessRequirement')}
        />
        <RoundedButton
          color="secondary"
          fullWidth
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
        >
          Enviar
        </RoundedButton>
      </Form>
    </Section>
  );
};

export default ContactSection;
