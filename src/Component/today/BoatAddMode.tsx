import styled from "styled-components";
import { BOAT_INFO, TodayKey, OpenBoatType } from "./config";
import { useState } from "react";

/*
 * 보트 추가 모드 컴포넌트 타입
 */
interface BoatAddModeProps {
  isOpenBoatType?: OpenBoatType;
  callback?: () => void;
}

/*
 * 보트 추가 모드 컴포넌트
 */
const BoatAddMode = ({ isOpenBoatType, callback }: BoatAddModeProps) => {
  // 추가 모드가 아니면 렌더링 하지 않음
  if (!isOpenBoatType || isOpenBoatType.mode !== "ADD") {
    return null;
  }

  // 총 카운트
  const totalCount = Object.values(
    BOAT_INFO[isOpenBoatType.type].getCountStorage()
  ).reduce((sum, value) => sum + value, 0);

  // 인벤토리
  const inventory = Object.values(
    BOAT_INFO[isOpenBoatType.type].getInventoryStorage()
  ).reduce((sum, value) => sum + value, 0);

  // 오늘 카운트
  const todayCount =
    BOAT_INFO[isOpenBoatType.type].getCountStorage()[TodayKey] || 0;

  // 입력 값 상태
  const [inputValue, setInputValue] = useState<number>(0);

  // 입력 값 변경 이벤트
  const handlerClickButton = (type: "PLUS" | "MINUS", number: number) => {
    if (type === "PLUS") {
      setInputValue(inputValue + number);
    } else {
      setInputValue(inputValue - number);
    }
  };

  // 저장
  const handlerSubmit = () => {
    BOAT_INFO[isOpenBoatType.type].setCountStorage({
      ...BOAT_INFO[isOpenBoatType.type].getCountStorage(),
      [TodayKey]:
        (BOAT_INFO[isOpenBoatType.type].getCountStorage()[TodayKey] || 0) +
        inputValue,
    });
    setInputValue(0);
    callback?.();
  };

  return (
    <StyledWrapper>
      {/* 보트 이름 컨테이너 */}
      <div className="boatNameContainer">
        <div
          className="boatName"
          style={{
            color: BOAT_INFO[isOpenBoatType.type].color,
            borderColor: BOAT_INFO[isOpenBoatType.type].borderColor,
          }}
        >
          {BOAT_INFO[isOpenBoatType.type].label}
        </div>
        <div className="totalCount">
          전체: {totalCount} / {inventory}
        </div>
      </div>

      {/* 오늘 카운트 컨테이너 */}
      <div className="todayCount">
        <div>오늘:</div>
        <div className="todayCountValue">{todayCount}</div>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="buttonContainer">
        {/* 날짜 변경 버튼 컨테이너 */}
        <div className="dateChangeButtonContainer">
          <button
            className="dateChangeButton"
            onClick={() => handlerClickButton("MINUS", 1)}
          >
            - 1
          </button>
          <button
            className="dateChangeButton"
            onClick={() => handlerClickButton("MINUS", 0.5)}
          >
            - 0.5
          </button>
        </div>

        {/* 오늘 카운트 값 컨테이너 */}
        <div className="valueContainer">{inputValue.toFixed(1)}</div>

        {/* 입력 버튼 컨테이너 */}
        <div className="dateChangeButtonContainer">
          <button
            className="dateChangeButton"
            onClick={() => handlerClickButton("PLUS", 1)}
          >
            + 1
          </button>
          <button
            className="dateChangeButton"
            onClick={() => handlerClickButton("PLUS", 0.5)}
          >
            + 0.5
          </button>
        </div>
      </div>

      {/* 저장 버튼 */}
      <button className="submitButton" onClick={handlerSubmit}>
        SAVE
      </button>
    </StyledWrapper>
  );
};

export default BoatAddMode;

/* 배경 블러 처리 컴포넌트 */
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  /* 보트 이름 컨테이너 */
  & > .boatNameContainer {
    display: flex;
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
    align-items: center;
    justify-content: center;
    font-size: 18px;
    min-width: 80px;
    gap: 10px;
    & > .todayCountValue {
      font-size: 32px;
    }
  }

  /* 버튼 컨테이너 */
  & > .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    & > .dateChangeButtonContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      & > .dateChangeButton {
        width: 100px;
        height: 50px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
        &:hover {
          background-color: rgb(16, 16, 16);
          color: white;
        }
      }
    }
    & > .valueContainer {
      height: 85px;
      width: 70px;
      min-width: 70px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      border: 1px solid white;
      font-size: 36px;
    }
  }

  /* 저장 버튼 */
  & > .submitButton {
    margin-top: auto;
    width: 100%;
    height: 80px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    background-color: rgb(16, 16, 16);
    color: white;
    font-size: 30px;
  }
`;
