/**
 * Copyright 2015-present, Zippy Technologies.
 * All rights reserved.
 */

import React from 'react';
import { render } from 'react-dom';
import Component from 'react-class';

import notifyResize, { NotifyResize } from './src';

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 100,
      height: 100
    };
  }
  render() {
    return (
      <div
        ref="target"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'red'
        }}
      >
        {this.props.resizeTool}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.state.width,
            height: this.state.height,
            background: 'blue'
          }}
        />
      </div>
    );
  }

  onResize(size) {
    this.setState(size);
  }
}

const NotifiedBox = notifyResize(Box);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      height: 200,
      resizeWidth: 200,
      resizeHeight: 200
    };
  }

  render() {
    return <div style={{height: '100%', width: '100%', position: 'relative'}}>
      <div style={{position: 'relative', height: 25}}>
        <NotifyResize onResize={size => console.log('resized to ', size)} />
      </div>
      <p>
        Resize parent
        <button onClick={() => {
          this.setState({
            width: this.state.width + 20,
            height: this.state.height + 20,
          })
        }}>More</button>
        <button onClick={() => {
          this.setState({
            width: this.state.width - 20,
            height: this.state.height - 20,
          })
        }}>Less</button>
      </p>

        <div style={{ marginTop: 20 }}>
          <div
            style={{
              position: 'relative',
              width: this.state.width,
              height: this.state.height,
              background: 'magenta'
            }}
          >
            <NotifyResize onResize={this.onSecondResize} />
            <div
              style={{
                position: 'absolute',
                width: this.state.resizeWidth - 20,
                height: this.state.resizeHeight - 20,
                top: 10,
                left: 10,
                background: 'blue',
                color: 'white'
              }}
            >
              This is an absolute box, <br />
              with FIXED (px) size <br />
              inside a relative parent
            </div>

          </div>
        </div>
      </div>
    );
  }

  onSecondResize(size) {
    console.log(size);
    this.setState({
      resizeHeight: size.height,
      resizeWidth: size.width
    });
  }
}

render(<App />, document.getElementById('content'));
