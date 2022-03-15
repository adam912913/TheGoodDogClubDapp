import { Row, Col } from 'react-bootstrap'
import logo_title from '../assets/img/logo-title.png'
import chewy_label from '../assets/img/chewy_label.png'

const Partnerships = ({ children }) => {
  return (
    <section className="partnerships">
      <div className="container pow_back">
        <div className="wrapper">
          <Row>
            <Col md={6} sm={12} className="content_wrapper">
              <h2 className='title'>Partnerships</h2>
              <p className='partnership_content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <div className='partnership_logo_wrapper'>
                <img alt='' src={logo_title} height="52" className="chewy_tgdc_logo" />
                <img alt='' src={chewy_label} className="chewy_label" />
              </div>
            </Col>
            <Col md={6} sm={0} className="nft_images">
              <div className='block_1'>
                <img alt='' src={`assets/images/nft_partnerships/1.png`} />
              </div>
              <div className='block_2'>
                <div className='nft_images_row'>
                  <img alt='' src={`assets/images/nft_partnerships/2.png`} style={{ width: '35%', marginBottom: '2em' }} />
                  <img alt='' src={`assets/images/nft_partnerships/3.png`} style={{ width: '60%', marginTop: '-20%', marginLeft: '4%', marginRight: '-5%' }} />
                </div>
                <div className='nft_images_row' style={{ justifyContent: 'flex-start', alignItems: 'flex-start', position: 'relative' }}>
                  <img alt='' src={`assets/images/nft_partnerships/4.png`} style={{ width: '35%', marginBottom: '2em' }} />
                  <img alt='' src={`assets/images/nft_partnerships/5.png`} style={{ width: '60%', top: '10px', marginLeft: '5%', position: 'absolute', right: '2%', bottom: '-68px' }} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default Partnerships;