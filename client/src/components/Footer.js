import { Link } from "react-router-dom";

import s_logo from '../assets/img/s_logo.png';
import icon_insta from '../assets/img/icon_insta.png';
import icon_twitter from '../assets/img/icon_twitter.png';
import icon_fb from '../assets/img/icon_fb.png';

const Footer = ({ children }) => {
  return (
    <footer className='footer'>
      <div className='footer_logo_wrapper'>
        <img src={s_logo} alt="Footer Logo" />
      </div>
      <div className='container'>
        <div className='footer_menu'>
          <ul>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms of Use</Link>
            </li>
            <li>
              <Link to="/">Content Policy</Link>
            </li>
            <li>
              <Link to="/">Code of Ethics</Link>
            </li>
          </ul>
        </div>
        <div className='footer_title'>© The Good Dog Club LLC</div>
        <div className='social_links'>
          <ul className='links'>
            <li>
              <Link to="/">
                <img src={icon_insta} alt="Icon Instagram" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={icon_twitter} alt="Icon Twitter" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img alt='' src={icon_fb} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer