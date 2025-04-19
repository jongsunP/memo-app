"use client";

import styled from "styled-components";
import { BOAT_INFO, BoatType, TodayKey, OpenBoatType } from "./config";

/*
 * 보트 컴포넌트 타입
 */
interface BoatProps {
  type: BoatType;
  isOpenBoatType?: OpenBoatType;
  setIsOpenBoatType: (type?: OpenBoatType) => void;
}

/*
 * 보트 컴포넌트
 */
const Boat = ({ type, isOpenBoatType, setIsOpenBoatType }: BoatProps) => {
  // 오늘 총 카운트
  const totalCount =
    Object.values(BOAT_INFO[type].getCountStorage()).reduce(
      (sum, value) => sum + value,
      0
    ) || 0;

  // 오늘 카운트
  const todayCount = BOAT_INFO[type].getCountStorage()[TodayKey] || 0;

  // 인벤토리
  const inventory = Object.values(BOAT_INFO[type].getInventoryStorage()).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <StyledWrapper onClick={() => setIsOpenBoatType({ type, mode: "ADD" })}>
      {/* 보트 이름 컨테이너 */}
      <div className="boatNameContainer">
        <div
          className="boatName"
          style={{
            color: BOAT_INFO[type].color,
            borderColor: BOAT_INFO[type].borderColor,
          }}
        >
          {BOAT_INFO[type].label}
        </div>
        <div className="totalCount">
          전체: {totalCount} / {inventory}
        </div>
      </div>
      <div className="todayCount">
        <div>오늘:</div>
        <div className="todayCountValue">{todayCount}</div>
      </div>
    </StyledWrapper>
  );
};

export default Boat;

const StyledWrapper = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  font-weight: bold;
  height: 85px;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid rgb(16, 16, 16);
  &:hover {
    border: 1px solid rgb(141, 110, 255);
    cursor: pointer;
  }

  /* 보트 이름 컨테이너 */
  & > .boatNameContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 110px;
    gap: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    & > .boatName {
      font-size: 18px;
    }
    & > .totalCount {
      font-size: 18px;
    }
  }

  /* 오늘 카운트 컨테이너 */
  & > .todayCount {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    min-width: 80px;
    & > .todayCountValue {
      font-size: 32px;
    }
  }
`;
