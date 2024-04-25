import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';

class SamplePage extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <p>
                <h1>404</h1>
                <h3>Page not found!</h3>
              </p>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default SamplePage;
