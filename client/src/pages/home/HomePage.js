import React, { useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'

import MainLayout from '../../layouts/MainLayouts';
import Header from '../../components/Header';
import Banner from "../../components/Banner";
import LiveAuctions from "../../components/LiveAuctions";
import TopSellers from '../../components/TopSellers';
import TodaysPick from "../../components/TodaysPick";
import TeamIntroduce from "../../components/TeamIntroduce";
import Roadmap from "../../components/Roadmap";
import Faqs from "../../components/Faqs";
import Footer from "../../components/Footer";
import Partnerships from "../../components/Partnerships";
import Web3Context from '../../store/web3-context';

import 'react-multi-carousel/lib/styles.css';
import about_logo from '../../assets/img/about_logo.png'

const HomePage = (props) => {
  const web3Ctx = useContext(Web3Context)

  useEffect(() => {
    console.log('is_mbmenu_opened', web3Ctx.is_mbmenu_opened)
  })

  return (
    <MainLayout className={`${web3Ctx.is_mbmenu_opened ? ' mainlayout_mobile_menu_opened ' : ''}`}>
      <div className="container-fluid">
        <Header></Header>
        <Banner></Banner>

        <div className='container'>
          <section className='about'>
            <Row>
              <Col md={6} sm={12} className="image_col">
                <img src={about_logo} alt="About Logo" />
              </Col>
              <Col md={6} sm={12} className="content_col">
                <h2 className='txt_stroke'>What is</h2>
                <h2 className="title">The Good Dog Club LLC</h2>
                <p className="text">Founded by a mutual love and respect for Dogs, the Good Dog Club LLC is a bootstrap project with its main focus on community and utility. The Good Dog Club LLC is a pack of Dog NFTs released on the Ethereum blockchain for an epic adventure into the Metaverse.</p>
              </Col>
            </Row>
          </section>

          <LiveAuctions />
          <TopSellers />
          <TodaysPick />
        </div>

        <TeamIntroduce />
        <Partnerships />
        <Roadmap />
        <Faqs />
        <Footer />
      </div>
    </MainLayout>
  )
}

export default HomePage
