"use client";

import { useEffect, useState } from "react";
import styles from "./memo.module.css";

type CountType = {
  [key: string]: number;
};

const Memo = () => {
  const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

  // 카운트
  const [inBoatCountState, setInBoatCountState] = useState<number>(0);
  const [magicBoatCountState, setMagicBoatCountState] = useState<number>(0);
  const [outBoatCountState, setOutBoatCountState] = useState<number>(0);

  // 총합 카운트
  const [inBoatTotalCountState, setInBoatTotalCountState] = useState<number>(0);
  const [magicBoatTotalCountState, setMagicBoatTotalCountState] =
    useState<number>(0);
  const [outBoatTotalCountState, setOutBoatTotalCountState] =
    useState<number>(0);

  // 저장
  const handleSave = () => {
    window.confirm(
      `인보트: ${inBoatCountState}\n\n매직보트: ${magicBoatCountState}\n\n아웃보트: ${outBoatCountState}`
    );

    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const key = `${month}-${day}`;

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
    const newInBoatData = inBoatLocalData[key]
      ? inBoatLocalData[key] + inBoatCountState
      : inBoatCountState;
    const newMagicBoatData = magicBoatLocalData[key]
      ? magicBoatLocalData[key] + magicBoatCountState
      : magicBoatCountState;
    const newOutBoatData = outBoatLocalData[key]
      ? outBoatLocalData[key] + outBoatCountState
      : outBoatCountState;

    // 로컬스토리지에 저장
    localStorage?.setItem(
      "inBoatCount",
      JSON.stringify({
        ...inBoatLocalData,
        [key]: newInBoatData,
      })
    );
    localStorage?.setItem(
      "magicBoatCount",
      JSON.stringify({
        ...magicBoatLocalData,
        [key]: newMagicBoatData,
      })
    );
    localStorage?.setItem(
      "outBoatCount",
      JSON.stringify({
        ...outBoatLocalData,
        [key]: newOutBoatData,
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

  useEffect(() => {
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
    setInBoatTotalCountState(
      Object.values(inBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
    setMagicBoatTotalCountState(
      Object.values(magicBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
    setOutBoatTotalCountState(
      Object.values(outBoatLocalData).reduce((sum, value) => sum + value, 0)
    );
  }, []);

  const handleMinusClick = (type: string, count: number) => {
    if (type === "인보트") {
      if (inBoatCountState - count < 0) {
        setInBoatCountState(0);
      } else {
        setInBoatCountState(inBoatCountState - count);
      }
    }
    if (type === "매직보트") {
      if (magicBoatCountState - count < 0) {
        setMagicBoatCountState(0);
      } else {
        setMagicBoatCountState(magicBoatCountState - count);
      }
    }
    if (type === "아웃보트") {
      if (outBoatCountState - count < 0) {
        setOutBoatCountState(0);
      } else {
        setOutBoatCountState(outBoatCountState - count);
      }
    }
  };

  const handlePlusClick = (type: string, count: number) => {
    if (type === "인보트") {
      setInBoatCountState(inBoatCountState + count);
    }
    if (type === "매직보트") {
      setMagicBoatCountState(magicBoatCountState + count);
    }
    if (type === "아웃보트") {
      setOutBoatCountState(outBoatCountState + count);
    }
  };

  const list = [
    {
      type: "인보트",
      count: inBoatCountState,
      totalCount: inBoatTotalCountState,
    },
    {
      type: "매직보트",
      count: magicBoatCountState,
      totalCount: magicBoatTotalCountState,
    },
    {
      type: "아웃보트",
      count: outBoatCountState,
      totalCount: outBoatTotalCountState,
    },
  ];

  const Boat = ({
    type,
    count,
    totalCount,
    handlerMinusClick,
    handlerPlusClick,
  }: {
    type: string;
    count: number;
    totalCount: number;
    handlerMinusClick: (type: string, count: number) => void;
    handlerPlusClick: (type: string, count: number) => void;
  }) => {
    return (
      <div className={styles.rowContainer}>
        <div className={styles.boatNameContainer}>
          <p
            className={styles.boatName}
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
          </p>
          <p className={styles.totalCount}>전체: {totalCount}</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.dateChangeButtonContainer}>
            <button
              className={styles.dateChangeButton}
              onClick={() => handlerMinusClick(type, 1)}
            >
              - 1
            </button>
            <button
              className={styles.dateChangeButton}
              onClick={() => handlerMinusClick(type, 0.5)}
            >
              - 0.5
            </button>
          </div>
          <div className={styles.todayCountValueContainer}>
            <p className={styles.todayCount}>오늘: {totalCount}</p>
            <div className={styles.valueContainer}>{count.toFixed(1)}</div>
          </div>
          <div className={styles.dateChangeButtonContainer}>
            <button
              className={styles.dateChangeButton}
              onClick={() => handlerPlusClick(type, 1)}
            >
              + 1
            </button>
            <button
              className={styles.dateChangeButton}
              onClick={() => handlerPlusClick(type, 0.5)}
            >
              + 0.5
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.memoContainer}>
      {/* 날짜 */}
      <div className={styles.title}>
        {new Date().toLocaleDateString()} ({dayMap[new Date().getDay()]})
      </div>

      {/* 보트 컨테이너 */}
      <div className={styles.boatContainer}>
        {list.map((item, index) => (
          <Boat
            key={index}
            type={item.type}
            count={item.count}
            totalCount={item.totalCount}
            handlerMinusClick={handleMinusClick}
            handlerPlusClick={handlePlusClick}
          />
        ))}
      </div>

      {/* 저장 버튼 */}
      <button className={styles.submitButton} onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
};

export default Memo;
