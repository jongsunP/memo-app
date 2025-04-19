import styled, { css, keyframes } from "styled-components";
import { useRef } from "react";

/*
 * 바텀 시트 컴포넌트 타입
 */
interface BottomSheetProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  callback?: () => void;
}

/*
 * 바텀 시트 컴포넌트
 */
const BottomSheet = ({ isOpen, callback, children }: BottomSheetProps) => {
  if (!isOpen) {
    return null;
  }

  // 바텀 시트 컴포넌트 참조
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // 배경 클릭 이벤트
  const handlerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const isBackgroundClick =
      bottomSheetRef.current !== null &&
      !bottomSheetRef.current.contains(e.target as Node);
    if (isBackgroundClick) {
      callback?.();
    }
  };

  return (
    <StyledWrapper $isOpen={isOpen} onClick={handlerClick}>
      <div className="bottomSheetContainer" ref={bottomSheetRef}>
        {/* 닫기 버튼 */}
        <div className="closeButton" onClick={() => callback?.()}>
          X
        </div>

        {/* 바텀 시트 컴포넌트 컨텐츠 */}
        {children}
      </div>
    </StyledWrapper>
  );
};

export default BottomSheet;

/* 아래에서 위로 올라오는 애니메이션 */
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100%);
    
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

/* 위에서 아래로 내려가는 애니메이션 */
const slideDown = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, 100%);
  }
`;

/* 배경 블러 처리 컴포넌트 */
const StyledWrapper = styled.div<{
  $isOpen?: boolean;
}>`
  background-color: rgba(18, 18, 18, 0.6);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  /* 바텀 시트 컴포넌트 */
  & > .bottomSheetContainer {
    cursor: default;
    border-radius: 20px 20px 0 0;
    height: 60vh;
    display: flex;
    flex-direction: column;
    padding: 40px;
    align-items: center;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    animation-duration: ${".3s"};
    animation-name: ${slideDown};
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    ${({ $isOpen }) => {
      if ($isOpen) {
        return css`
          animation-name: ${slideUp};
        `;
      }
    }}

    /* 닫기 버튼 */
    & > .closeButton {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      font-size: 16px;
      border: 1px solid black;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      background-color: black;
      color: white;
    }
  }
`;
