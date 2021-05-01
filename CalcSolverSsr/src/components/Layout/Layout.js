import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <div class="wrapper" style={{ 'min-height': '80vh' }}>
          <NavMenu />
          <Container>
            {this.props.children}
          </Container>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
