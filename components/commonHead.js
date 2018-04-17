/* 网站通用head */
import React, { Component, Fragment } from 'react';

class CommonHead extends Component{
  render(){
    return (
      <Fragment>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/static/style/public.css?t=201804171539" />
      </Fragment>
    );
  }
}

export default CommonHead;