import styled from "styled-components";
import { CountType } from "./Today";

/*
 * 저장 버튼 컴포넌트 타입
 */
interface SubmitProps {
  inBoatCountState: number;
  magicBoatCountState: number;
  outBoatCountState: number;
  setInBoatTotalCountState: (count: number) => void;
  setMagicBoatTotalCountState: (count: number) => void;
  setOutBoatTotalCountState: (count: number) => void;
  setInBoatCountState: (count: number) => void;
  setMagicBoatCountState: (count: number) => void;
  setOutBoatCountState: (count: number) => void;
  TodayKey: string;
}

/*
 * 저장 버튼 컴포넌트
 */
const Submit = ({
  inBoatCountState,
  magicBoatCountState,
  outBoatCountState,
  setInBoatTotalCountState,
  setMagicBoatTotalCountState,
  setOutBoatTotalCountState,
  setInBoatCountState,
  setMagicBoatCountState,
  setOutBoatCountState,
  TodayKey,
}: SubmitProps) => {
  // 저장
  const handlerSave = () => {
    window.confirm(
      `인보트: ${inBoatCountState}\n\n매직보트: ${magicBoatCountState}\n\n아웃보트: ${outBoatCountState}`
    );

    const inBoatLocalData: CountType = localStorage?.getItem("inBoatCount")
      ? JSON.parse(localStorage.getItem("inBoatCount") || "{}")
      : {};
    const magicBoatLocalData: CountType = localStorage?.getItem(
      "magicBoatCount"
    )
      ? JSON.parse(localStorage.getItem("magicBoatCount") || "{}")
      : {};
    const outBoatLocalData: CountType = localStorage?.getItem("outBoatCount")
      ? JSON.parse(localStorage.getItem("outBoatCount") || "{}")
      : {};

    // 새로운 데이터 추가
    const newInBoatData = inBoatLocalData[TodayKey]
      ? inBoatLocalData[TodayKey] + inBoatCountState
      : inBoatCountState;
    const newMagicBoatData = magicBoatLocalData[TodayKey]
      ? magicBoatLocalData[TodayKey] + magicBoatCountState
      : magicBoatCountState;
    const newOutBoatData = outBoatLocalData[TodayKey]
      ? outBoatLocalData[TodayKey] + outBoatCountState
      : outBoatCountState;

    // 로컬스토리지에 저장
    localStorage?.setItem(
      "inBoatCount",
      JSON.stringify({
        ...inBoatLocalData,
        [TodayKey]: newInBoatData,
      })
    );
    localStorage?.setItem(
      "magicBoatCount",
      JSON.stringify({
        ...magicBoatLocalData,
        [TodayKey]: newMagicBoatData,
      })
    );
    localStorage?.setItem(
      "outBoatCount",
      JSON.stringify({
        ...outBoatLocalData,
        [TodayKey]: newOutBoatData,
      })
    );

    // 총합 계산 및 상태 업데이트
    setInBoatTotalCountState(newInBoatData);
    setMagicBoatTotalCountState(newMagicBoatData);
    setOutBoatTotalCountState(newOutBoatData);

    // 카운트 초기화
    setInBoatCountState(0);
    setMagicBoatCountState(0);
    setOutBoatCountState(0);
  };

  return <StyledWrapper onClick={handlerSave}>SAVE</StyledWrapper>;
};

export default Submit;

const StyledWrapper = styled.button`
  width: 100%;
  height: 80px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background-color: rgb(141, 110, 255);
  color: white;
  font-size: 30px;
`;
