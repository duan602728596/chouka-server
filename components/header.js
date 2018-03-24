/* header */
import React, { Component } from 'react';

class Header extends Component{
  render(){
    return (
      <header className="header bg-success">
        <div className="container">
          <div className="row">
            <h1 className="col-sm-12 col-md-6 col-lg-4 header-title">黄彤扬应援会抽卡查询系统</h1>
            <nav className="col-sm-12 col-md-6 col-lg-8 nav header-nav">
              <a className="nav-link" href="/">首页</a>
              <a className="nav-link" href="/card">卡牌图鉴</a>
              <a className="nav-link" href="/search">卡牌查询</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;