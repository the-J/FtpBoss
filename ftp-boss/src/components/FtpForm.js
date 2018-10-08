/**
 * Created by juliusz.jakubowski@gmail.com on 08.10.18.
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Container, Form, Header } from 'semantic-ui-react';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';

import { colors } from '../settings';

import { serverSettingsAction } from '../store/actions/serverSettingsAction';

class FtpForm extends Component {
    constructor() {
        super();

        this.state = {
            serverParams: {
                host: '',
                user: '',
                password: '',
                port: 21
            },
            valid: false
        };
    }

    clearServerParams = () => this.setState({
        serverParams: {
            host: '',
            user: '',
            password: '',
            port: 21
        },
        valid: false
    });

    handleChange = ( e, param ) => {
        const { serverParams } = this.state;
        serverParams[ param ] = e.target.value;
        this.setState({ serverParams });
    };

    validateData = () => {
        const { serverParams } = this.state;
        const valid = Object.values(serverParams).some(el => el === '');
        this.setState({ valid });
        return valid;
    };

    handleSubmit = () => {
        if (!this.validateData()) {
            this.props.changePage();
            this.props.serverSettingsAction(this.state.serverParams);
        }
    };

    render() {
        const { serverParams, valid } = this.state;

        return (
            <FtpFormStyles>
                <Container>
                    <Header as='h1'>
                        Server credentials
                    </Header>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field inline required>
                                <label>user: </label>
                                <Form.Input
                                    type='text'
                                    placeholder='user'
                                    error={valid && !serverParams.user}
                                    value={serverParams.user}
                                    onChange={e => this.handleChange(e, 'user')}
                                />
                            </Form.Field>

                            <Form.Field inline required>
                                <label>pass: </label>
                                <Form.Input
                                    type='password'
                                    placeholder='password'
                                    error={valid && !serverParams.password}
                                    value={serverParams.password}
                                    onChange={e => this.handleChange(e, 'password')}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Field inline required>
                                <label>host: </label>
                                <Form.Input
                                    type='text'
                                    placeholder='ex: ftp.yourdomain.com'
                                    error={valid && !serverParams.host}
                                    value={serverParams.host}
                                    onChange={e => this.handleChange(e, 'host')}
                                />
                            </Form.Field>


                            <Form.Field inline>
                                <label>port: </label>
                                <Form.Input
                                    type='number'
                                    placeholder='default 21'
                                    error={valid && !serverParams.port}
                                    value={serverParams.port}
                                    onChange={e => this.handleChange(e, 'port')}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Button
                            basic
                            type='default'
                            floated='left'
                            color='black'
                            onClick={() => this.clearServerParams()}
                        >
                            Clear
                        </Button>

                        <Button
                            basic
                            floated='right'
                            color='red'
                            onClick={() => {
                                this.clearServerParams();
                                this.props.changePage();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            floated='right'
                            basic
                            color='green'
                            onClick={() => this.handleSubmit()}
                        >
                            Save
                        </Button>
                    </Form>
                </Container>
            </FtpFormStyles>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/'),
    serverSettingsAction: ( serverParams ) => serverSettingsAction(serverParams)
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(FtpForm);

const FtpFormStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background}
`;