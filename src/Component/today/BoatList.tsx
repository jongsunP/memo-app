import styled from "styled-components";
import Boat from "./Boat";
import { BoatType, OpenBoatType } from "./config";

/*
 *  보트 리스트 컴포넌트 타입
 */
interface ListProps {
  list: BoatType[];
  isOpenBoatType: OpenBoatType | undefined;
  setIsOpenBoatType: (type: OpenBoatType | undefined) => void;
}

/*
 * 보트 리스트 컴포넌트
 */
const BoatList = ({ list, isOpenBoatType, setIsOpenBoatType }: ListProps) => {
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
    </StyledWrapper>
  );
};

export default BoatList;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
