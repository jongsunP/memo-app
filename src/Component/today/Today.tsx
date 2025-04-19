"use client";

import { useEffect, useState } from "react";
import Submit from "./Submit";
import styled from "styled-components";
import BoatList from "./BoatList";

// 로컬스토리지 데이터 타입
export type CountType = {
  [key: string]: number;
};

// 오늘 날짜 컴포넌트
const Today = () => {
  // 요일 맵
  const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘 날짜 키
  const TodayKey = `${new Date().getMonth() + 1}-${new Date().getDate()}`;

  // 카운트 스테이트
  const [inBoatCountState, setInBoatCountState] = useState<number>(0);
  const [magicBoatCountState, setMagicBoatCountState] = useState<number>(0);
  const [outBoatCountState, setOutBoatCountState] = useState<number>(0);

  // 총합 카운트
  const [inBoatTotalCountState, setInBoatTotalCountState] = useState<number>(0);
  const [magicBoatTotalCountState, setMagicBoatTotalCountState] =
    useState<number>(0);
  const [outBoatTotalCountState, setOutBoatTotalCountState] =
    useState<number>(0);

  // 투데이 카운트
  const [inBoatTodayCountState, setInBoatTodayCountState] = useState<number>(0);
  const [magicBoatTodayCountState, setMagicBoatTodayCountState] =
    useState<number>(0);
  const [outBoatTodayCountState, setOutBoatTodayCountState] =
    useState<number>(0);

  // 로컬스토리지 데이터 조회
  useEffect(() => {
    const inBoatLocalData: CountType = localStorage?.getItem("inBoatCount")
      ? JSON.parse(localStorage.getItem("inBoatCount") || "{}")
      : {};
    const magicBoatLocalData: CountType = localStorage?.getItem(
      "magicBoatCount"
    )
      ? JSON.parse(localStorage.getItem("magicBoatCount") || "{}")
      : {};
    const outBoatLocalData: CountType = localStorage?.getItem("outBoatCount")
      ? JSON.parse(localStorage.getItem("outBoatCount") || "{}")
      : {};
    setInBoatTodayCountState(
      inBoatLocalData[TodayKey] ? inBoatLocalData[TodayKey] : 0
    );
    setMagicBoatTodayCountState(
      magicBoatLocalData[TodayKey] ? magicBoatLocalData[TodayKey] : 0
    );
    setOutBoatTodayCountState(
      outBoatLocalData[TodayKey] ? outBoatLocalData[TodayKey] : 0
    );
    setInBoatTotalCountState(
      Object.values(inBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
    setMagicBoatTotalCountState(
      Object.values(magicBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
    setOutBoatTotalCountState(
      Object.values(outBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
  }, []);

  return (
    <StyledWrapper>
      {/* 날짜 타이틀 */}
      <div className="title">
        {new Date().toLocaleDateString()} ({dayMap[new Date().getDay()]})
      </div>

      {/* 보트 리스트 */}
      <BoatList
        list={[
          {
            type: "인보트",
            count: inBoatCountState,
            totalCount: inBoatTotalCountState,
            todayCount: inBoatTodayCountState,
            setState: setInBoatCountState,
            state: inBoatCountState,
          },
          {
            type: "매직보트",
            count: magicBoatCountState,
            totalCount: magicBoatTotalCountState,
            todayCount: magicBoatTodayCountState,
            setState: setMagicBoatCountState,
            state: magicBoatCountState,
          },
          {
            type: "아웃보트",
            count: outBoatCountState,
            totalCount: outBoatTotalCountState,
            todayCount: outBoatTodayCountState,
            setState: setOutBoatCountState,
            state: outBoatCountState,
          },
        ]}
      />

      {/* 저장 버튼 */}
      <Submit
        inBoatCountState={inBoatCountState}
        magicBoatCountState={magicBoatCountState}
        outBoatCountState={outBoatCountState}
        setInBoatTotalCountState={setInBoatTotalCountState}
        setMagicBoatTotalCountState={setMagicBoatTotalCountState}
        setOutBoatTotalCountState={setOutBoatTotalCountState}
        setInBoatCountState={setInBoatCountState}
        setMagicBoatCountState={setMagicBoatCountState}
        setOutBoatCountState={setOutBoatCountState}
        TodayKey={TodayKey}
      />
    </StyledWrapper>
  );
};

export default Today;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 40px;
  gap: 40px;
  & > .title {
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
  }
`;
