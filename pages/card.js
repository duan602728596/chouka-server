/* 卡牌图鉴 */
import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import CARD from '../components/CARD';
import CommonHead from '../components/commonHead';
import Header from '../components/header';

const Style = (props)=>{
  return (
    <style jsx={ true }>
      {`
@media (max-width: 575px) {
  .main-group { -webkit-box-flex: 0; -ms-flex: 0 0 50%; flex: 0 0 50%; width: 50%; }
}
.main-card, .main-card-image { width: 150px; }
.main-card { margin: 0 auto; width: 152px; }
.main-card-image { height: 200px; }
.main-group { margin-bottom: 20px; }
.main-card-body { padding-top: 10px; padding-bottom: 10px; }
.main-card-title { margin: 0; font-size: 14px; }
`}
    </style>
  );
};

class Card extends Component{
  cardView(level){
    return CARD[level].map((item, index)=>{
      return (
        <div key={ item.id } className="col-sm-6 col-md-4 col-lg-3 main-group">
          <div className="card main-card">
            <img className="card-img-top main-card-image" src={ item.src } />
            <div className="card-body main-card-body">
              <h5 className="card-title main-card-title">{ item.name }</h5>
            </div>
          </div>
        </div>
      );
    });
  }
  render(){
    return (
      <Fragment>
        <Head>
          <CommonHead />
          <title>卡牌图鉴 - 黄彤扬应援会抽卡查询系统</title>
          <Style />
        </Head>
        <Header />
        {/* main */}
        <div className="container main">
          <h4 className="text-center text-warning">SSR</h4>
          <div className="row">{ this.cardView('SSR') }</div>
          <h4 className="text-center text-danger">SR</h4>
          <div className="row">{ this.cardView('SR') }</div>
          <h4 className="text-center text-success">R</h4>
          <div className="row">{ this.cardView('R') }</div>
          <h4 className="text-center text-primary">N</h4>
          <div className="row">{ this.cardView('N') }</div>
        </div>
      </Fragment>
    );
  }
}

export default Card;