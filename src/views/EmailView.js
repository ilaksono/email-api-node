import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import CheckAnimation from './CheckAnimation';

let schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  text: yup.string().required()
});


const initControl = {
  name: '',
  email: '',
  text: ''
};
const initErr = {
  type: '',
  msg: ''
};
const EmailView = () => {
  const [anim, setAnim] = useState(false);
  // const [control, setControl] = useState(initControl);
  // const [err, setErr] = useState(initErr);

  // const handleInput = (event) => {
  //   setControl(prev => ({ ...prev, [event.target.name]: event.target.value }));
  // };

  const submitForm = (data, a) => {

    // if (!control.name) return setErr({ type: 'name', msg: 'Please tell me your name' });
    // if (!control.text) return setErr({ type: 'text', msg: 'Please add a message body' });
    setAnim(true);
    axios
      .post('/email', { ...data })
      .then((data) => {

        console.log(data.data);
      })
      .catch(er => console.log(er));
    setTimeout(() => {
      setAnim(false);
    }, 750)
    a.resetForm();

  };

  return <div className='email-container'>
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        name: '',
        email: '',
        text: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) =>
        (<Form
          noValidate
          className='email-form' onSubmit={handleSubmit}>
          <Form.Group controlId="emailForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={values.name}
              type="text"
              placeholder="Sender's Name"
              name='name'
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
            />
          </Form.Group>
          <Form.Group controlId="emailForm.ControlInput2">
            <Form.Label>Email (optional)</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={values.email}
              type='text'
              name='email'
              isValid={touched.email}
              placeholder='me@gmail.com'
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email Body</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={values.text}
              as="textarea"
              rows={3}
              name='text'
              placeholder='Write a message'
              isValid={touched.text && !errors.text}
              isInvalid={!!errors.text}
            />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>)
      }
    </Formik>
    <CheckAnimation anim={anim} setAnim={setAnim} color='green'/>
  </div>;
};

export default EmailView;