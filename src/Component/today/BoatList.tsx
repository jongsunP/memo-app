import { useEffect, useState } from "react";
import styled from "styled-components";
import Boat from "./Boat";
import { BOAT_INFO, BoatType, OpenBoatType } from "./config";
import BottomSheet from "./BottomSheet";
import BoatAddMode from "./BoatAddMode";
import BoatChargeMode from "./BoatChargeMode";

/*
 *  보트 리스트 컴포넌트 타입
 */
interface ListProps {
  list: BoatType[];
}

/*
 * 보트 리스트 컴포넌트
 */
const BoatList = ({ list }: ListProps) => {
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
      {/* 보트 리스트 컨테이너 */}
      {list.map((item, index) => (
        <Boat
          key={index}
          type={item}
          isOpenBoatType={isOpenBoatType}
          setIsOpenBoatType={setIsOpenBoatType}
        />
      ))}

      {/* 충전 버튼 컨테이너 */}
      <div className="addButtonContainer">
        <div
          className="addButtonTitle"
          onClick={() => setIsOpenChargeModeUI(!isOpenChargeModeUI)}
        >
          충전
        </div>
        {isOpenChargeModeUI && (
          <div className="addButtonList">
            {/* 충전 버튼 리스트 */}
            {list.map((item, index) => (
              <div
                className="addButton"
                key={index}
                style={{
                  color: BOAT_INFO[item].color,
                  borderColor: BOAT_INFO[item].borderColor,
                }}
                onClick={() => {
                  setIsOpenBoatType({ type: item, mode: "CHARGE" });
                }}
              >
                {BOAT_INFO[item].label}
              </div>
            ))}
          </div>
        )}
      </div>

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

export default BoatList;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* 충전 버튼 컨테이너 */
  & > .addButtonContainer {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    & > .addButtonTitle {
      font-size: 18px;
      font-weight: bold;
    }
    & > .addButtonList {
      display: flex;
      gap: 10px;
      & > .addButton {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 4px;
        width: 100%;
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
  }
`;
