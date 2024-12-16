import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./MainPage.module.css";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const storedUserId = sessionStorage.getItem("userId");

    if (userToken && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUserId("");
    }
  }, []);

  // 테스트 로그아웃용 버튼
  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId("");
    alert("로그아웃되었습니다.");
  };

  // 자동 슬라이더 이미지들
  const sliderImages = [
    "https://www.clevelandamphitheater.com/wp-content/uploads/2024/07/Cleveland-Orchestra-Return-of-the-King-banner-2-1400-x-500-px.jpg-1.webp",
    "https://www.kivaauditorium.com/wp-content/uploads/sites/60/2024/05/Experience-Hendrix-banner-1400-x-500-px.jpg-1.webp",
    "https://www.pineknobamp.com/wp-content/uploads/2024/10/Weird-Al-Yankovic-banner-1400-x-500-px-2.jpg-4.webp",
    "https://www.paramounttheatreseattle.net/wp-content/uploads/2024/10/Foster-The-People-banner-2-1400-x-500-px.jpg-1.webp",
    "https://www.marymooramphitheatre.com/wp-content/uploads/2024/05/The-Wailers-Banner-updated-1400-x-500-px.jpg-1.webp",
    "https://www.marymooramphitheatre.com/wp-content/uploads/2024/06/Switchfoot-Blue-October-Matt-Nathanson-banner-1400-x-500-px.jpg-1.webp",
    "https://www.deervalleyamphitheater.com/wp-content/uploads/2024/05/The-Rascals-The-Utah-Symphony-banner-1400-x-500-px.jpg-1.webp",
    "https://www.albuquerqueamphitheater.com/wp-content/uploads/2024/05/The-Marley-Brothers-banner-3-1400-x-500-px.jpg-1.webp",
  ];

  // 자동 슬라이더 작동
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    axios
      .get("/api/order/rank")
      .then((response) => {
        console.log("rank: ", response.data);
        setRank(response.data || []);
      })
      .catch((error) => console.error("Rank Error: ", error));
  }, []);

  // 백엔드에서 모든 데이터 가져오기
  useEffect(() => {
    axios
      .get("/api/order")
      .then((response) => {
        console.log("API Response:", response.data);
        setConcerts(response.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 선택한 장르로 필터링
  const filteredConcerts = concerts.filter((concert) => {
    const matchesGenre =
      genreFilter === "All" || concert.pgenre === genreFilter;
    const matchesSearch =
      concert.ptitle &&
      concert.ptitle.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const ITEMS_PER_SLIDE = 4;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentIndex(0);
  };

  const handleGenreFilter = (value) => {
    setGenreFilter(value);
    setCurrentIndex(0);
  };

  return (
    <div className={style.main_content}>
      {/* 헤더 */}
      <header className={style.booking_header}>
        <div className={style.logo}>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearch("");
              setGenreFilter("All");
              setCurrentIndex(0);
            }}
          >
            <span style={{ color: "black" }}>다</span>
            <span style={{ color: "red" }}>나오조</span>
          </h2>
        </div>
        <input
          type="text"
          placeholder="공연 제목으로 찾아보세요."
          className={style.search_bar}
          value={search}
          onChange={handleSearchChange}
        />
        <div>
          <div className={style.user_links}>
            {isLoggedIn ? (
              <>
                <span>{userId}님 환영합니다!</span>
                {/* 로그아웃 테스트웃 테스트용 */}
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                  로그아웃
                </button>
                <Link to="/mypage" className={style.atag}>
                  마이페이지
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={style.atag}>
                  로그인
                </Link>
                <Link to="/signup" className={style.atag}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 장르 필터 */}
      <nav className={style.navigation_menu}>
        <span
          className={genreFilter === "All" ? style.active : ""}
          onClick={() => handleGenreFilter("All")}
        >
          전체
        </span>
        <span
          className={genreFilter === "뮤지컬" ? style.active : ""}
          onClick={() => handleGenreFilter("뮤지컬")}
        >
          뮤지컬
        </span>
        <span
          className={genreFilter === "대중음악" ? style.active : ""}
          onClick={() => handleGenreFilter("대중음악")}
        >
          대중음악
        </span>
        <span
          className={genreFilter === "복합" ? style.active : ""}
          onClick={() => handleGenreFilter("복합")}
        >
          복합
        </span>
        <span
          className={genreFilter === "전시/행사" ? style.active : ""}
          onClick={() => handleGenreFilter("전시/행사")}
        >
          전시/행사
        </span>
        <span
          className={genreFilter === "서양음악(클래식)" ? style.active : ""}
          onClick={() => handleGenreFilter("서양음악(클래식)")}
        >
          서양음악(클래식)
        </span>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className={style.main_content}>
        {!search && genreFilter === "All" && (
          <>
            <div className={style.auto_slider}>
              <img
                src={sliderImages[sliderIndex]}
                alt={`Slide ${sliderIndex + 1}`}
                className={style.slider_image}
              />
            </div>
            <div>
              <h2>랭킹</h2>
              <div className={style.concert_slider}>
                {rank.slice(0, ITEMS_PER_SLIDE).map((item, index) => (
                  <div className={style.concert_card} key={item.seqPfjoinId}>
                    <h3>{item.ptitle}</h3>
                    <div className={style.image_container}>
                      <Link to={`/detail/${item.seqPfjoinId}/view`}>
                        <img
                          src={item.pposter}
                          className={style.concert_image}
                        />
                      </Link>
                      <span className={style.rank}>{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 공연 목록 */}
        <div className={style.concert_container}>
          <div className={style.concert_slider}>
            {filteredConcerts.length > 0 ? (
              filteredConcerts
                .slice(currentIndex, currentIndex + ITEMS_PER_SLIDE)
                .map((concert) => (
                  <div className="concert-card" key={concert.seqPfjoinId}>
                    <h3 className="concert-title">{concert.ptitle}</h3>
                    <Link to={`/detail/${concert.seqPfjoinId}/view`}>
                      <img
                        src={concert.pposter}
                        className={style.concert_image}
                      />
                    </Link>
                    <p>장르: {concert.pgenre}</p>
                    <p>가격: {concert.pdSeatprice}</p>
                  </div>
                ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className={style.booking_footer}>
        <p>&copy; {new Date().getFullYear()} 다나오조. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
