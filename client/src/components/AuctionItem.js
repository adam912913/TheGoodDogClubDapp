import { Link } from "react-router-dom";
import {
  HeartOutlined
} from '@ant-design/icons';
import user_avatar from '../assets/img/user_avatar.jpg'
import nft_img from '../assets/img/nft_img.png'

const AuctionItem = (props) => {
  return (
    <div className={`action_item ` + props.className}>
      <Link to={`/`}>
        <div className='image'>
          <img src={nft_img} alt="Auction Item" />
          <div className='fav_wrapper'>
            <HeartOutlined />&nbsp;&nbsp;100
          </div>
        </div>
        <h6 className='item_title'>It was popularised in the 1960s...</h6>
        <div className='item_detail'>
          <div className='user_info'>
            <img src={user_avatar} alt="User avatar" />
            <p>
              Creator <br />
              Adam Gilchrist {props.data ? '- ' + props.data.index : ''}
            </p>
            <div className="clearboth"></div>
          </div>
          <div className='bid_content'>
            Current Bid <br />555 abc
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AuctionItem;