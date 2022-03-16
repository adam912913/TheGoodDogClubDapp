import roadmap_banner from '../assets/img/roadmap_banner.jpg'
import roadmap_back_baseline from '../assets/img/roadmap_back_baseline.png'

const Roadmap = ({ children }) => {
  return (
    <section className='roadmap' id='roadmap'>
      <div className='banner_wrapper'>
        <img alt='' src={roadmap_banner} />
      </div>
      <div className='roadmap_contents'>
        <div className='container'>
          <div className='step_row'>
            <div className='roadmap_item odd_item'>
              <div>
                <p>Release 24 of the most popular breeds in the USA and one “Easter Egg”. Then, pay back everyone who believed in us.</p>
                <h3>Drop 01</h3>
              </div>
            </div>
            <div className='roadmap_item even_item'>
              <div>
                <p>Release 25 more breeds as well as purchase land in the metaverse to begin building our dog park with possible partnership.</p>
                <h3>Drop 02</h3>
              </div>
            </div>
          </div>
          <div className='step_row'>
            <div className='roadmap_item odd_item'>
              <div>
                <p>Release 25 more breeds and build up the dog park complete with integrated pet store, play to earn games, and a dog training center.</p>
                <h3>Drop 03</h3>
              </div>
            </div>
            <div className='roadmap_item even_item'>
              <div>
                <p>Release 25 more breeds and develop a liquidity pool for holders to pull from to help with their pets needs.</p>
                <h3>Drop 04</h3>
              </div>
            </div>
          </div>
          <div className='step_row'>
            <div className='roadmap_item odd_item'>
              <div>
                <p>Release 25 more breeds and develop a rewards program for all holders with the partnership we decide upon.</p>
                <h3>Drop 05</h3>
              </div>
            </div>
            <div className='roadmap_item even_item'>
              <div>
                <p>Release 25 more breeds and begin charitable donations to help dogs around the globe.</p>
                <h3>Drop 06</h3>
              </div>
            </div>
          </div>
          <div className='step_row'>
            <div className='roadmap_item odd_item'>
              <div>
                <p>Release 25 more breeds and begin the breeding of NFTs implementation.</p>
                <h3>Drop 07</h3>
              </div>
            </div>
            <div className='roadmap_item even_item'>
              <div>
                <p>Release the final 25 breeds and throw a “Dog Party” for all holders.</p>
                <h3>Drop 08</h3>
              </div>
            </div>
          </div>
        </div>
        <img alt='' src={roadmap_back_baseline} className="roadmap_baseline_img" />
      </div>
    </section>
  )
}

export default Roadmap;