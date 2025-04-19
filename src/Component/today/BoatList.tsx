import styled from "styled-components";
import Boat from "./Boat";

/*
 *  보트 리스트 컴포넌트 타입
 */
interface ListProps {
  list: {
    type: string;
    count: number;
    totalCount: number;
    todayCount: number;
    state: number;
    setState: (count: number) => void;
  }[];
}

/*
 * 보트 리스트 컴포넌트
 */
const BoatList = ({ list }: ListProps) => {
  return (
    <StyledWrapper>
      {list.map((item, index) => (
        <Boat
          key={index}
          type={item.type}
          count={item.count}
          totalCount={item.totalCount}
          todayCount={item.todayCount}
          state={item.state}
          setState={item.setState}
        />
      ))}
    </StyledWrapper>
  );
};

export default BoatList;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
