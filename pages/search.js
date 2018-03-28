/* 查卡 */
import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import CARD from '../components/CARD';
import CommonHead from '../components/commonHead';
import Header from '../components/header';
import Footer from '../components/Footer';

const Style = (props)=>{
  return (
    <style jsx={ true }>
      {`
.main-box { max-width: 800px; margin: 0 auto 20px; }
.main-result-progress { margin-top: 5px; width: 300px; }
.main-value-now { margin-left: 5px; font-size: 12px; }
.main-table { margin-top: 20px; }
.main-table th, .main-table td { vertical-align: middle; }
.main-table-title { color: #fff; }
.main-img { margin-right: 20px; width: 106px; }
.main-table-td1 { width: 55%; }
.main-table-td2 { width: 45%; }
      `}
    </style>
  );
};

class Search extends Component{
  static getInitialProps({ req, res, query, err }){
    if(query.action !== 'search' || /^\s*$/.test(query.nickname)){
      return {
        err: '输入摩点昵称，查询卡牌数量。'
      };
    }

    if(!query.infor){
      return {
        err: '账号未打卡。',
        nickname: query.nickname
      };
    }

    return {
      nickname: query.nickname,
      infor: query.infor
    };
  }
  // 显示卡组数量
  cardNumberView(level, record){
    const record2 = JSON.parse(record);
    const view = [];
    let all = 0;
    CARD[level].map((item, index)=>{
      const len = item.id in record2 ? record2[item.id] : 0;
      all += len > 0 ? 1 : 0;
      view.push(
        <tr key={ `${ level }_${ item.id }` }>
          <td>
            <img className="main-img" src={ item.src } />
            { item.name }
          </td>
          <td>{ len }</td>
        </tr>
      );
    });
    return {
      view,
      all
    };
  }
  render(){
    let ssr, sr, r, n, valuenow;
    if('infor' in this.props){
      ssr = this.cardNumberView('SSR', this.props.infor.record);
      sr = this.cardNumberView('SR', this.props.infor.record);
      r = this.cardNumberView('R', this.props.infor.record);
      n = this.cardNumberView('N', this.props.infor.record);
      // 计算百分比
      valuenow = (ssr.all + sr.all + r.all + n.all) / (CARD.SSR.length + CARD.SR.length + CARD.R.length + CARD.N.length);
      valuenow = (valuenow * 100).toFixed(2);
    }

    return (
      <Fragment>
        <Head>
          <CommonHead />
          <title>查询 - 黄彤扬应援网</title>
          <Style />
        </Head>
        <div className="body">
          <Header />
          <div className="container main">
            <form className="main-box" action="/search" method="POST">
              <div className="form-group">
                <label htmlFor="nickname">输入摩点昵称：</label>
                <input className="form-control" id="nickname" name="nickname" type="text" defaultValue={ this.props.nickname } />
              </div>
              <button className="btn btn-primary" type="submit">查询</button>
            </form>
            {/* 卡牌结果 */}
            {
              this.props.err ? <p className="main-box">{ this.props.err }</p> : (
                <div className="main-box">
                  <div>摩点昵称：{ this.props.nickname }（{ this.props.infor.userid }）</div>
                  <div className="clearfix">
                    <span className="float-left">抽卡进度：</span>
                    <div className="float-left progress main-result-progress">
                      <div className="progress-bar bg-dark"
                        role="progressbar"
                        style={{ width: `${ valuenow }%` }}
                        aria-valuenow={ valuenow }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <span className="main-value-now">{ valuenow }%</span>
                  </div>
                  <table className="table table-sm table-bordered main-table">
                    {/* SSR */}
                    <thead>
                      <tr className="bg-warning main-table-title">
                        <th colSpan={ 2 }>SSR</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th className="main-table-td1">卡牌名称</th>
                        <th className="main-table-td2">卡牌数量</th>
                      </tr>
                    </thead>
                    <tbody>{ ssr.view }</tbody>
                    {/* SR */}
                    <thead>
                      <tr className="bg-danger main-table-title">
                        <th colSpan={ 2 }>SR</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>卡牌名称</th>
                        <th>卡牌数量</th>
                      </tr>
                    </thead>
                    <tbody>{ sr.view }</tbody>
                    {/* R */}
                    <thead>
                      <tr className="bg-success main-table-title">
                        <th colSpan={ 2 }>R</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>卡牌名称</th>
                        <th>卡牌数量</th>
                      </tr>
                    </thead>
                    <tbody>{ r.view }</tbody>
                    {/* N */}
                    <thead>
                      <tr className="bg-primary main-table-title">
                        <th colSpan={ 2 }>N</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>卡牌名称</th>
                        <th>卡牌数量</th>
                      </tr>
                    </thead>
                    <tbody>{ n.view }</tbody>
                  </table>
                </div>
              )
            }
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default Search;