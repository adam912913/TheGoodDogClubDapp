import { Link } from "react-router-dom";
import nft_img from '../assets/img/nft_img.png'

const SellerItem = (props) => {
  return (
    <Link to={`/`}>
      <div className='seller_item'>
        <img alt='' src={nft_img} />
        <p className='sell_infor'>Adam Gilchrist <br />243 bas </p>
      </div>
    </Link>
  );
}

export default SellerItem;