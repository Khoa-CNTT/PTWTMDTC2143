import HomeSlider from '../../components/HomeSlider';
import BestDeal from '../../components/BestDeal';
import TopSelect from '../../components/TopSelect';
import PopularSearch from '../../components/PopularSearch';
import HotSale from '../../components/HotSale';
import { FaFireAlt } from 'react-icons/fa';
import Category from '../../components/Category';

import RecentlyViewed from '../../components/RecentlyViewed';
import ChatbotFloating from '../../components/ChatBox/chatBoxFloating';

const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <HomeSlider />
        <Category />
        <div className="p-6">
          <div className="bg-red-500 pb-3 rounded-[20px] shadow-md">
            <div className="container">
              <h3 className="text-[30px] font-[500] text-white">Best Deal</h3>
              <BestDeal />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-yellow-300 pb-3 rounded-[20px] shadow-md">
            <div className="container">
              <h3 className="mt-20 text-[30px] font-[500]">
                Top 10 Selected Products On the Week
              </h3>
              <TopSelect />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 pb-3 rounded-[20px] shadow-md">
            <div className="container">
              <h3 className="mt-20 text-[30px] font-[500]">Popula Search</h3>
              <PopularSearch />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 pb-3 rounded-[20px] shadow-md">
            <div className="container">
              <h3 className="mt-20 text-[30px] font-[500] flex items-center">
                <FaFireAlt className="me-2 text-red-500" />
                Hot Sale
              </h3>
              <HotSale />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-200 pb-3 rounded-[20px] shadow-md">
            <div className="container">
              <h3 className="mt-20 text-[30px] font-[500] flex items-center">
                Recently Viewed
              </h3>
              <RecentlyViewed />
            </div>
          </div>
        </div>
      </div>

      <ChatbotFloating />
    </>
  );
};

export default Home;
