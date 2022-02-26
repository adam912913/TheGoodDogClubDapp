import { useState } from "react";
import { Collapse } from 'antd';
import { Row, Col } from 'react-bootstrap'
import parse from 'html-react-parser'
import { FAQS } from "../config/constants";

const { Panel } = Collapse;
function callback(key) {
  console.log(key);
}

const FaqCollapse = ({ isActive }) => {
  console.log(isActive)
  return isActive ? (<div className='collapse_icon minus'>&nbsp;</div>) : (<div className='collapse_icon plus'>&nbsp;</div>);
}

const init_load_faq_count = 4;
let init_data = [];
for (let i = 0; i < init_load_faq_count && i < FAQS.length; i++) {
  init_data.push(FAQS[i]);
}

const Faqs = ({ children }) => {
  const [faq_list, set_faq_list] = useState(init_data);

  return (
    <section className='faqs' id="faqs">
      <div className='container'>
        <h1 className='faq_title'>FREQUENTLY <br />ASKED QUESTIONS</h1>
        <Collapse
          accordion={true}
          onChange={callback}
          expandIcon={({ isActive }) => <FaqCollapse isActive={isActive} />}
          className="site-collapse-custom-collapse"
        >
          {faq_list.map((item, index) => {
            return (
              <Panel header={item.title} key={index}><p>{parse(item.content)}</p></Panel>
            );
          })}
        </Collapse>
        <Row>
          <Col md={12}>
            <button className='btn_load_more' onClick={() => set_faq_list(FAQS)}>Load more</button>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Faqs