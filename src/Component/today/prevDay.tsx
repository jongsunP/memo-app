import styled from "styled-components";

/**
 * 이전 날짜 컴포넌트 타입
 */
interface PrevDayProps {}

/**
 * 이전 날짜 컴포넌트
 */
const PrevDay = ({}: PrevDayProps) => {
  return <StyledWrapper>{"<"}</StyledWrapper>;
};

export default PrevDay;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
