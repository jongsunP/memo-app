import styled from "styled-components";
import { BOAT_INFO, TodayKey, OpenBoatType } from "./config";
import { useState } from "react";

/*
 * 보트 충전 모드 컴포넌트 타입
 */
interface BoatChargeModeProps {
  isOpenBoatType?: OpenBoatType;
  callback?: () => void;
}

/*
 * 보트 충전 모드 컴포넌트
 */
const BoatChargeMode = ({ isOpenBoatType, callback }: BoatChargeModeProps) => {
  console.log(isOpenBoatType);
  // 충전 모드가 아니면 렌더링 하지 않음
  if (!isOpenBoatType || isOpenBoatType.mode !== "CHARGE") {
    return null;
  }

  // 인벤토리
  const inventory = Object.values(
    BOAT_INFO[isOpenBoatType.type].getInventoryStorage()
  ).reduce((sum, value) => sum + value, 0);

  // 입력 값 상태
  const [inputValue, setInputValue] = useState<number>(0);

  // 입력 값 변경 이벤트
  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  // 저장
  const handlerSubmit = () => {
    BOAT_INFO[isOpenBoatType.type].setInventoryStorage({
      ...BOAT_INFO[isOpenBoatType.type].getInventoryStorage(),
      [TodayKey]:
        (BOAT_INFO[isOpenBoatType.type].getInventoryStorage()[TodayKey] || 0) +
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
        <div className="totalCount">전체: {inventory}</div>
      </div>

      {/* 버튼 컨테이너 */}
      <input
        className="inputContainer"
        onChange={handlerInputChange}
        value={inputValue || ""}
        type="number"
      />

      {/* 저장 버튼 */}
      <button className="submitButton" onClick={handlerSubmit}>
        SAVE
      </button>
    </StyledWrapper>
  );
};

export default BoatChargeMode;

/* 배경 블러 처리 컴포넌트 */
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;

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

  /* 입력 컨테이너 */
  & > .inputContainer {
    width: -webkit-fill-available;
    height: 45px;
    padding: 0 10px;
    border-radius: 5px;
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
