/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import { colors } from '../settings';

import { testAction } from '../store/actions/test';

class App extends Component {
    testAction = () => {
        this.props.testAction();
    };

    render() {
        return (
            <AppStyles>
                <Container>
                    <Header as='h1'>
                        App under construction
                    </Header>
                    {/*<pre>{JSON.stringify(this.props)}</pre>*/}

                    {/*<Button*/}
                    {/*onClick={this.testAction}*/}
                    {/*>*/}
                    {/*button test*/}
                    {/*</Button>*/}

                    <Button
                        basic
                        as={Link}
                        to='/settings'
                    >
                        <Icon name='cog' />Settings
                    </Button>
                </Container>
            </AppStyles>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    testAction: () => dispatch(testAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const AppStyles = styled.div`
  margin-top:  20px;
  background: ${colors.background}
`;