import styled from "styled-components";
import { BOAT_INFO, BoatType, OpenBoatType } from "./config";
import { useRef } from "react";

/*
 * 쿠폰 컴포넌트 타입
 */
interface CouponProps {
  list: BoatType[];
  isOpenChargeModeUI: boolean;
  setIsOpenChargeModeUI: (isOpen: boolean) => void;
  setIsOpenBoatType: (type: OpenBoatType) => void;
}

/*
 * 쿠폰 컴포넌트
 */
const Coupon = ({
  list,
  isOpenChargeModeUI,
  setIsOpenChargeModeUI,
  setIsOpenBoatType,
}: CouponProps) => {
  // 충전 버튼 리스트 참조
  const listRef = useRef<HTMLDivElement>(null);

  // 배경 클릭 이벤트
  const handlerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const isBackgroundClick =
      listRef.current !== null && !listRef.current.contains(e.target as Node);
    if (isBackgroundClick) {
      setIsOpenChargeModeUI(false);
    }
  };

  return (
    <StyledWrapper>
      {/* 충전 버튼 리스트 배경 */}
      {isOpenChargeModeUI && (
        <div
          className="dim"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlerClick(e);
          }}
        />
      )}
      {/* 충전 버튼 타이틀 */}
      <div
        className="addButtonTitle"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpenChargeModeUI(!isOpenChargeModeUI);
        }}
      >
        쿠폰
      </div>

      {/* 충전 버튼 리스트 */}
      {isOpenChargeModeUI && (
        <div className="addButtonList" ref={listRef}>
          {list.map((item, index) => (
            <div
              className="addButton"
              key={index}
              style={{
                color: BOAT_INFO[item].color,
                borderColor: BOAT_INFO[item].borderColor,
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpenBoatType({ type: item, mode: "CHARGE" });
                setIsOpenChargeModeUI(false);
              }}
            >
              {BOAT_INFO[item].label}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

export default Coupon;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  position: relative;

  /* 충전 버튼 리스트 배경 */
  & > .dim {
    width: 100%;
    height: 100vh;
    background-color: rgba(18, 18, 18, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* 충전 버튼 타이틀 */
  & > .addButtonTitle {
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    font-weight: bold;
  }

  /* 충전 버튼 리스트 */
  & > .addButtonList {
    border-radius: 4px;
    padding: 20px 40px;
    display: flex;
    gap: 20px;
    position: absolute;
    bottom: -210px;
    background-color: aquamarine;
    flex-direction: column;
    right: 0;
    width: 200px;
    background-color: white;
    & > .addButton {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      background-color: white;
      border-radius: 4px;
      height: 30px;
      padding: 5px 10px;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      &:hover {
        border: 1px solid rgb(141, 110, 255);
        cursor: pointer;
      }
    }
  }
`;
