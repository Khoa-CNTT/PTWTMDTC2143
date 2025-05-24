import HomeSlider from '../../components/HomeSlider';
import BestDeal from '../../components/BestDeal';
import TopSelect from '../../components/TopSelect';
import PopularSearch from '../../components/PopularSearch';
import HotSale from '../../components/HotSale';
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
          <HotSale />
        </div>
        <div className="p-6">
          <TopSelect />
        </div>
        <div className="p-6">
          <PopularSearch />
        </div>
        <div className="p-6">
          <BestDeal />
        </div>
        <div className="p-6">
          <RecentlyViewed />
        </div>
      </div>
      <ChatbotFloating />
    </>
  );
};

export default Home;
