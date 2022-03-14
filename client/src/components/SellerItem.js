import { Link } from "react-router-dom";
import nft_img from '../assets/img/nft_img.png'

const SellerItem = ({ data }) => {
  return (
    <>
      {data ? (
        <Link to={`/`}>
          <div className='seller_item'>
            <img alt='' src={data.nft_url} />
            <p className='sell_infor'>{data.seller_name} <br />{data.other_infor} </p>
          </div>
        </Link>
      ) : ''}
    </>
  );
}

export default SellerItem;