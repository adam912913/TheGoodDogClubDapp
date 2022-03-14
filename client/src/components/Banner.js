import { Link } from 'react-router-dom'
import $ from 'jquery'
import icon_arrow from '../assets/img/arrow.png'

const menu_clicked = (section_id) => {
  console.log('menu_clicked', section_id)
  $('html, body').animate({ scrollTop: $(`#${section_id}`).offset().top }, 500)
}

const Banner = ({ children }) => {
  return (
    <section className="banner">
      <div className='final_jump_back'>
        <div className="content">
          <div className="">
            <Link
              className="roadmap_btn"
              to="/"
              onClick={() => menu_clicked('roadmap')}
            >
              Roadmap <img src={icon_arrow} alt="arrow" />{' '}
            </Link>
            <h2 className="banner_title">
              The Metaverse And <br /> The NFT Space
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
