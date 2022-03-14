import { Link } from "react-router-dom";
import {
  HeartOutlined
} from '@ant-design/icons';

const AuctionItem = ({ data, className }) => {
  console.log(data)
  return (
    <>
      {data ? (
        <div className={`action_item ` + className}>
          <Link to={`/`}>
            <div className='image'>
              <img src={data.nft_url} alt="Auction Item" />
              <div className='fav_wrapper'>
                <HeartOutlined />&nbsp;&nbsp;{data.fav_count}
              </div>
            </div>
            <h6 className='item_title'>{data.title}</h6>
            <div className='item_detail'>
              <div className='user_info'>
                <img src={data.avatar_url} alt="User avatar" />
                <p>
                  Creator <br />{data.creator}
                </p>
                <div className="clearboth"></div>
              </div>
              <div className='bid_content'>
                Current Bid <br />{data.current_bid}
              </div>
            </div>
          </Link>
        </div>
      ) : ''}
    </>
  );
}

export default AuctionItem;