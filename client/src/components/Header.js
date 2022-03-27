import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery"
import Web3Context from '../store/web3-context'

import logo_title from '../assets/img/logo-title.png'
import mobile_logo from '../assets/img/s_logo.png'
import discord_icon from '../assets/img/discord-icon.png'

const Header = ({ children }) => {
  const web3Ctx = useContext(Web3Context);
  const [is_mbmenu_opened, set_is_mbmenu_opened] = useState(false);

  function btn_clicked_mbmenu_close(new_state_opened) {
    console.log('btn_clicked_mbmenu_close')
    set_is_mbmenu_opened(new_state_opened);
    web3Ctx.set_is_mbmenu_opened(new_state_opened)
  }

  const mbmenu_clicked = (section_id) => {
    console.log('mbmenu_clicked')
    btn_clicked_mbmenu_close(!is_mbmenu_opened)
    if (section_id != null) {
      $('html, body').animate({ scrollTop: $(`#${section_id}`).offset().top }, 500)
    }
  }

  const menu_clicked = (section_id) => {
    console.log('menu_clicked', section_id)
    $('html, body').animate({ scrollTop: $(`#${section_id}`).offset().top }, 500)
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to="/">
          <img alt='' src={logo_title} height="52" className="pc_logo" />
          <img alt='' src={mobile_logo} height="52" className="mobile_logo" />
        </Link>
      </div>
      <div className='menu pc-menu'>
        <ul>
          <li>
            <Link to="/">Benefits & Utilities</Link>
          </li>
          <li>
            <Link to="/" onClick={() => menu_clicked('roadmap')}>Roadmap</Link>
          </li>
          <li>
            <Link to="/" onClick={() => menu_clicked('team_introduce')}>The Team</Link>
          </li>
          <li>
            <Link to="/" onClick={() => menu_clicked('faqs')}>FAQ’s</Link>
          </li>
          <li>
            <Link to="/mint">Mint</Link>
          </li>
          <li>
            <a className='flex_center' target="_blank" href="https://discord.gg/r8bhrgQ7ZN">Discord
              <img alt='' className='menu_discord_icon' src={discord_icon} />
            </a>
            {/* <Link className='flex_center' target="_blank" to={{ pathname: "https://discord.gg/r8bhrgQ7ZN" }}>Discord
              <img alt='' className='menu_discord_icon' src={discord_icon} />
            </Link> */}
          </li>
        </ul>
      </div>
      <div className="mobile-menu">
        <div className="mobile_menu_button">
          <button className={`sfw-header-menu-icon sfw-header-mobile__tab ${is_mbmenu_opened ? ` is-active is-selected ` : ''}`} onClick={() => btn_clicked_mbmenu_close(!is_mbmenu_opened)}>
            <span className="sfw-header-menu-icon__line"></span>
          </button>
        </div>
        <div className={`mobile_menu_wrapper ${is_mbmenu_opened ? ` is_opened ` : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => mbmenu_clicked(null)}>Benefits & Utilities</Link>
            </li>
            <li>
              <Link to="/" onClick={() => mbmenu_clicked('roadmap')}>Roadmap</Link>
            </li>
            <li>
              <Link to="/" onClick={() => mbmenu_clicked('team_introduce')}>The Team</Link>
            </li>
            <li>
              <Link to="/" onClick={() => mbmenu_clicked('faqs')}>FAQ’s</Link>
            </li>
            <li>
              <Link to="/mint" onClick={() => mbmenu_clicked(null)}>Mint</Link>
            </li>
            <li>
              <Link className='flex_center' target="_blank" to="/" onClick={() => mbmenu_clicked(null)}>Discord
                <img alt='' className='menu_discord_icon' src={discord_icon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header