import styled from "styled-components";

/**
 * 카운트 버튼 그룹 컴포넌트 타입
 */
interface CountButtonGroupProps {
  inputValue: number;
  setInputValue: (value: number) => void;
  list: number[];
}

/**
 * 카운트 버튼 그룹 컴포넌트
 */
const CountButtonGroup = ({
  inputValue,
  setInputValue,
  list,
}: CountButtonGroupProps) => {
  // 입력 값 변경 이벤트
  const handlerClickButton = (type: "PLUS" | "MINUS", number: number) => {
    if (type === "PLUS") {
      setInputValue(inputValue + number);
    } else {
      setInputValue(inputValue - number);
    }
  };

  return (
    <StyledWrapper>
      {/* 입력 버튼 컨테이너 */}
      <div className="dateChangeButtonContainer">
        {list
          .sort((a, b) => b - a)
          .map((item, index) => (
            <button
              key={index}
              className="dateChangeButton"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlerClickButton("MINUS", item);
              }}
            >
              - {item}
            </button>
          ))}
      </div>

      {/* 오늘 카운트 값 컨테이너 */}
      <div className="valueContainer">{inputValue.toFixed(0)}</div>

      {/* 입력 버튼 컨테이너 */}
      <div className="dateChangeButtonContainer">
        {list
          .sort((a, b) => b - a)
          .map((item, index) => (
            <button
              key={index}
              className="dateChangeButton"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlerClickButton("PLUS", item);
              }}
            >
              + {item}
            </button>
          ))}
      </div>
    </StyledWrapper>
  );
};

export default CountButtonGroup;

const StyledWrapper = styled.div`
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
`;
