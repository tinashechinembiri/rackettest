import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class Register extends Component {

  constructor(props) {
    super(props);
      this.state = {
          'email': '',
          'password': '',
          'passwordConfirm': '',
          'name': '',
          'secondName': '',
          validate: {
            passwordState: '',
            passwordConfirmState: '',
            emailState: '',
            registration: '',
          },
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

    validatePassword(e)
    {
        const passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
        const { validate } = this.state
            if (passwordRex.test(e.target.value)) {
            validate.passwordState = 'has-success'
            } else {
            validate.passwordState = 'has-danger'
            }
            this.setState({ validate })
    }

       validatePasswordConfirm(e)
    {
        const { validate } = this.state
            if (this.state.password === e.target.value && validate.passwordState == 'has-success') {
            validate.passwordConfirmState = 'has-success'
            } else {
            validate.passwordConfirmState = 'has-danger'
            }
            this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
        [ name ]: value,
        });
    }

  onSubmit = (e) => {
    e.preventDefault();
    const details = Object.create(null, {
            userName: {value:this.state.email, enumerable: true},
            password: { value: this.state.password, enumerable: true },
            name: {value:this.state.name},
            secondName : { value: this.state.secondName},
        })
    console.log(JSON.stringify(details));
    //return
    fetch('/api/user', {   
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
        body: JSON.stringify(details)
    }).then(res => console.log(res.data))
        .then(this.props.history.push("/"));

    return true;
  }


  // this is unused atm
  submitForm = (e) => {
    if(this.onSubmit(e))
      {
        this.state.validate.registration = 'has-success'
        this.props.history.push("/")
      }
      else
      {
        this.state.validate.registration = 'has-success'
      }
  }

  render() {
      const { email, password, passwordConfirm, name, secondName } = this.state;
    return (
        <Container> 
            <h3 class="panel-title">
              REGISTRATION PAGE
            </h3>


            <Form className="form" onSubmit={(event) => this.onSubmit(event)}>

                <FormGroup row>
                    <Label for="email" sm={2} md={{ size: 6, offset: 3 }}>Email</Label>
                    <Col sm={12} md={{ size: 6, offset: 3 }}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="first name"
                            value={name}
                            onChange={(event) => {
                                this.handleChange(event)
                            }}
                        />
                    </Col>
                </FormGroup>


                <FormGroup row>
                    <Label for="email" sm={2} md={{ size: 6, offset: 3 }}>Email</Label>
                    <Col sm={12} md={{ size: 6, offset: 3 }}>
                        <Input
                            type="text"
                            name="secondName"
                            id="secondName"
                            placeholder="Second name"
                            value={secondName}
                            onChange={(event) => {
                                this.handleChange(event)
                            }}
                        />
                    </Col>
                </FormGroup>

            <FormGroup row>
                <Label for="email" sm={2} md={{ size: 6, offset: 3 }}>Email</Label>
                <Col sm={12} md={{ size: 6, offset: 3 }}>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="trainee@qa.com"
                    value = { email }
                    valid={ this.state.validate.emailState === 'has-success' }
                    invalid={ this.state.validate.emailState === 'has-danger' }
                    onChange={ (event) => {
                            this.validateEmail(event)
                            this.handleChange(event) } }
                />
                </Col>
                <FormFeedback invalid>
                    You must use your QA email
                </FormFeedback>
            </FormGroup>
            

            <FormGroup row>
              <Label for="password" sm={2} md={{ size: 6, offset: 3 }}>Password</Label>
              <Col sm={12} md={{ size: 6, offset: 3 }}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={ password }
                valid={ this.state.validate.passwordState === 'has-success' }
                invalid={ this.state.validate.passwordState === 'has-danger' }
                onChange={ (event) => {
                    this.validatePassword(event)
                    this.handleChange(event) } }
              />
              <FormFeedback invalid>
                Password requires 1 uppercase, 1 lowercase, and at least 5 characters
            </FormFeedback>
              </Col>
            </FormGroup>



            <FormGroup row>
              <Label for="passwordConfirm" sm={2} md={{ size: 6, offset: 3 }}>Confirm Password</Label>
              <Col sm={12} md={{ size: 6, offset: 3 }}>
              <Input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="********"
                value={ passwordConfirm }
                valid={ this.state.validate.passwordConfirmState === 'has-success' }
                invalid={ this.state.validate.passwordConfirmState === 'has-danger' }
                onChange={ (event) => {
                    this.validatePasswordConfirm(event)
                    this.handleChange(event) } }
              />
               <FormFeedback invalid>
                Password's do not match
            </FormFeedback>
              </Col>
            </FormGroup>
          
            <center>
          <Button type="submit" outline color="primary" size ="lg">Create account</Button>
          </center>
        </Form>
        <center>
            <br></br>
            <Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Go back</Link>
        </center>
        </Container>
    );
  }
}

export default Register;