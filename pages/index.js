/* 网站首页 */
import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import CommonHead from '../components/commonHead';
import Header from '../components/header';

const Style = (props)=>{
  return (
    <style jsx={ true }>
      {`
.main-card-image { width: 286px; }
.main-card { margin: 0 auto; width: 288px; }
.main-card-image { height: 180px; }
.main-group { margin-bottom: 20px; }
`}
    </style>
  );
};

class Index extends Component{
  render(){
    return (
      <Fragment>
        <Head>
          <CommonHead />
          <title>黄彤扬应援会抽卡查询系统</title>
          <Style />
        </Head>
        <Header />
        {/* main */}
        <div className="container main">
          <div className="row">
            {/* 卡牌图鉴 */}
            <div className="col-sm-12 col-md-6 main-group">
              <div className="card main-card">
                <img className="card-img-top main-card-image" src="/static/image/hty1.jpg" alt="卡牌图鉴" />
                <div className="card-body">
                  <a className="btn btn-primary btn-block" href="/card">查看卡牌图鉴</a>
                </div>
              </div>
            </div>
            {/* 卡牌查询 */}
            <div className="col-sm-12 col-md-6 main-group">
              <div className="card main-card">
                <img className="card-img-top main-card-image" src="/static/image/hty2.jpg" alt="卡牌查询" />
                <div className="card-body">
                  <a className="btn btn-primary btn-block" href="/search">卡牌查询</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;