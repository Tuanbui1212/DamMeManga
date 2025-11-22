import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SlideItem from "./SlideItems";
import SlideNavigation from "./SlideNavigation";
// import bannerData from "../../../usecases/bannerService";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SlideShow() {

    ////////////////////////////////////////////////// TẠM THỜI TEST //////////////////////////////////////////////////////
    const bannerData = [
        {
            id: 1,
            image:
                "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
            title: "One Punch Man",
            description: "Saitama – anh hùng mạnh nhất chỉ cần một đấm để kết liễu mọi kẻ thù!",
        },
        {
            id: 2,
            image:
                "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/Chainsawman.jpg?updatedAt=1763273184710",
            title: "Chainsaw Man",
            description: "Denji – chàng trai bán thân cho quỷ để trở thành người cưa máy sống!",
        },
        {
            id: 3,
            image:
                "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/Chainsawman.jpg?updatedAt=1763273184710",
            title: "Chainsaw Man",
            description: "Denji – chàng trai bán thân cho quỷ để trở thành người cưa máy sống!",
        },
    ];
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="quicksand-uniquifier relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden group">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                pagination={{
                    clickable: true,
                    bulletClass: `swiper-pagination-bullet !bg-white !opacity-60`,
                    bulletActiveClass: `!bg-gray-400 !opacity-100 !scale-125`,
                }}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                className="h-full"
            >
                {bannerData.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <SlideItem banner={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <SlideNavigation />
        </div>
    );
}
