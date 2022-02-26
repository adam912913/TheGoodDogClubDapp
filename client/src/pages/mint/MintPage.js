import React, { useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import logo_title from '../../assets/img/logo-title.png'
import mobile_logo from '../../assets/img/s_logo.png'
import MainLayout from '../../layouts/MainLayouts'
import Banner from "../../components/Banner";
import MintForm from "../../components/MintForm";
import Faqs from "../../components/Faqs";
import Footer from "../../components/Footer";
import Web3Context from '../../store/web3-context'

const MintingPage = () => {
  const web3Ctx = useContext(Web3Context)

  useEffect(() => {
    console.log('is_mbmenu_opened', web3Ctx.is_mbmenu_opened)
  })

  return (
    <MainLayout className={`${web3Ctx.is_mbmenu_opened ? ' mainlayout_mobile_menu_opened ' : ''}`}>
      <div className="container-fluid">
        <header className='header'>
          <div className='logo'>
            <Link to="/">
              <img src={logo_title} height="52" className="pc_logo" alt='pc logo' />
              <img src={mobile_logo} height="52" className="mobile_logo" alt='mobile logo' />
            </Link>
          </div>
          <div className='menu'>
            <Link to="/" className='btn_go_home'><LogoutOutlined style={{ marginRight: '0.5em' }} /> Go Home</Link>
          </div>
        </header>
        <Banner></Banner>
        <MintForm />
        <Faqs></Faqs>
        <Footer></Footer>
      </div>
    </MainLayout>
  )
}

export default MintingPage
