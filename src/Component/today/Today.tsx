import styled from "styled-components";
import BoatList from "./BoatList";
import { dayMap, OpenBoatType, boatTypeList } from "./config";
import { useState } from "react";
import Coupon from "./Coupon";
import BoatAddMode from "./BoatAddMode";
import BoatChargeMode from "./BoatChargeMode";
import BottomSheet from "./BottomSheet";
import PrevDay from "./prevDay";

// 오늘 날짜 컴포넌트
const Today = () => {
  // 보트 타입 상태
  const [isOpenBoatType, setIsOpenBoatType] = useState<
    OpenBoatType | undefined
  >();

  // 충전 모드 UI 상태
  const [isOpenChargeModeUI, setIsOpenChargeModeUI] = useState<boolean>(false);

  // 모달 닫기 콜백
  const modalCloseCallback = () => {
    setIsOpenBoatType(undefined);
    setIsOpenChargeModeUI(false);
  };

  return (
    <StyledWrapper>
      {/* 충전 버튼 컨테이너 */}
      <div className="titleContainer">
        <PrevDay />

        <Coupon
          list={boatTypeList}
          isOpenChargeModeUI={isOpenChargeModeUI}
          setIsOpenChargeModeUI={setIsOpenChargeModeUI}
          setIsOpenBoatType={setIsOpenBoatType}
        />
      </div>

      {/* 날짜 타이틀 */}
      <div className="title">
        {new Date().toLocaleDateString()} ({dayMap[new Date().getDay()]})
      </div>

      {/* 보트 리스트 */}
      <BoatList
        list={boatTypeList}
        isOpenBoatType={isOpenBoatType}
        setIsOpenBoatType={setIsOpenBoatType}
      />

      {/* 보트 버튼 클릭 시 바텀시트 컴포넌트 렌더링 */}
      <BottomSheet
        isOpen={Boolean(isOpenBoatType)}
        callback={modalCloseCallback}
      >
        {isOpenBoatType?.mode === "ADD" ? (
          // 추가 모드
          <BoatAddMode
            isOpenBoatType={isOpenBoatType}
            callback={modalCloseCallback}
          />
        ) : (
          // 충전 모드
          <BoatChargeMode
            isOpenBoatType={isOpenBoatType}
            callback={modalCloseCallback}
          />
        )}
      </BottomSheet>
    </StyledWrapper>
  );
};

export default Today;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 40px;
  /* 충전 버튼 컨테이너 */
  & > .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* 날짜 타이틀 */
  & > .title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;
