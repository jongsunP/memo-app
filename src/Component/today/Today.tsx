import styled from "styled-components";
import BoatList from "./BoatList";
import { dayMap } from "./config";

// 오늘 날짜 컴포넌트
const Today = () => {
  return (
    <StyledWrapper>
      {/* 날짜 타이틀 */}
      <div className="title">
        {new Date().toLocaleDateString()} ({dayMap[new Date().getDay()]})
      </div>

      {/* 보트 리스트 */}
      <BoatList list={["in", "magic", "out"]} />
    </StyledWrapper>
  );
};

export default Today;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 40px;
  gap: 40px;

  /* 날짜 타이틀 */
  & > .title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
`;
