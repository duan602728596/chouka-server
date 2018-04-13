/* header */
import React, { Component } from 'react';

class Footer extends Component{
  render(){
    return (
      <footer className="text-center footer">
        <span>黄彤扬应援网</span>
        <a className="footer-ml30" href="http://www.miitbeian.gov.cn" target="_blank">京ICP备11111111号</a>
        <a className="footer-ml10" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=" target="_blank">
          <img className="footer-beian" src="/static/beian.png" />
          京公网安备 11111111111111
        </a>
      </footer>
    );
  }
}

export default Footer;