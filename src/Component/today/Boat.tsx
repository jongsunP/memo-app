import styled from "styled-components";

/*
 * 보트 컴포넌트 타입
 */
interface BoatProps {
  type: string;
  count: number;
  totalCount: number;
  todayCount: number;
  state?: number;
  setState: (count: number) => void;
}

/*
 * 보트 컴포넌트
 */
const Boat = ({
  type,
  count,
  totalCount,
  todayCount,
  state = 0,
  setState,
}: BoatProps) => {
  /*
   * 마이너스 버튼 클릭 이벤트
   */
  const handlerMinusClick = (count: number) => {
    if (state - count < 0) {
      setState(0);
    } else {
      setState(state - count);
    }
  };

  /*
   * 플러스 버튼 클릭 이벤트
   */
  const handlerPlusClick = (count: number) => {
    setState(state + count);
  };

  return (
    <StyledWrapper>
      {/* 보트 이름 컨테이너 */}
      <div className="boatNameContainer">
        <div
          className="boatName"
          style={{
            color:
              type === "인보트"
                ? "rgb(141, 110, 255)"
                : type === "매직보트"
                ? "rgb(255, 110, 110)"
                : "rgb(110, 255, 110)",
          }}
        >
          {type}
        </div>
        <div className="totalCount">전체: {totalCount}</div>
      </div>

      {/* 입력 컨테이너 */}
      <div className="inputContainer">
        <div className="dateChangeButtonContainer">
          <button
            className="dateChangeButton"
            onClick={() => handlerMinusClick(1)}
          >
            - 1
          </button>
          <button
            className="dateChangeButton"
            onClick={() => handlerMinusClick(0.5)}
          >
            - 0.5
          </button>
        </div>

        {/* 오늘 카운트 값 컨테이너 */}
        <div className="todayCountValueContainer">
          <div className="todayCount">오늘: {todayCount}</div>
          <div className="valueContainer">{count.toFixed(1)}</div>
        </div>

        {/* 입력 버튼 컨테이너 */}
        <div className="dateChangeButtonContainer">
          <button
            className="dateChangeButton"
            onClick={() => handlerPlusClick(1)}
          >
            + 1
          </button>
          <button
            className="dateChangeButton"
            onClick={() => handlerPlusClick(0.5)}
          >
            + 0.5
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Boat;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  gap: 20px;
  & > .boatNameContainer {
    font-weight: bold;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 85px;
    min-width: 110px;
    width: 100%;
    padding: 0 10px;
    border-radius: 5px;
    gap: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    & > .boatName {
      font-size: 18px;
      color: white;
    }
    & > .totalCount {
      font-size: 18px;
      color: white;
    }
  }
  & > .inputContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: white;
    & > .dateChangeButtonContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      & > .dateChangeButton {
        width: 40px;
        height: 40px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
      }
    }
    & > .todayCountValueContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      height: 85px;
      gap: 5px;
      width: 70px;
      & > .todayCount {
        font-size: 18px;
        color: white;
      }
      & > .valueContainer {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: 1px solid white;
        font-size: 36px;
      }
    }
  }
`;
