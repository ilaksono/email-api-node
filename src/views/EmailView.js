import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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

  const [control, setControl] = useState(initControl);
  const [err, setErr] = useState(initErr);

  const handleInput = (event) => {
    setControl(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = () => {
    console.log('hello');

    if (!control.name) return setErr({ type: 'name', msg: 'Please tell me your name' });
    if (!control.text) return setErr({ type: 'text', msg: 'Please add a message body' });

    axios
      .post('/email', { ...control })
      .then((data) => {

        console.log(data.data);
      })
      .catch(er => console.log(er));
  };

  return <div >
    <Form className='email-container' onSubmit={event => {
      event.preventDefault();
      // handleSubmit();
    }}>
      <Form.Group controlId="emailForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleInput}
          value={control.name}
          type="text"
          placeholder="Beautiful Person"
          name='name'
        />
      </Form.Group>
      <Form.Group controlId="emailForm.ControlInput2">
        <Form.Label>Email (optional)</Form.Label>
        <Form.Control
          onChange={handleInput}
          value={control.email}
          type='text'
          name='email'
        >
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Email Body</Form.Label>
        <Form.Control
          onChange={handleInput}
          value={control.text}
          as="textarea"
          rows={3}
          name='text'
        />
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
    <button onClick={() => console.log('hi')}>click</button>
    <div>{err.msg}</div>
  </div>;
};

export default EmailView;