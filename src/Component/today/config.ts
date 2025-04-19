// 로컬스토리지 데이터 타입
export type CountType = {
  [key: string]: number;
};

// 열린 보트 타입
export interface OpenBoatType {
  type: BoatType;
  mode: "ADD" | "CHARGE";
}

// 오늘 날짜 키
export const TodayKey = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDate()}`;

// 보트 타입
export type BoatType = "in" | "magic" | "out";

// 보트 카운트 키
const boatLocalStorageCountKey = {
  in: "inBoatCount",
  magic: "magicBoatCount",
  out: "outBoatCount",
};

// 보트 인벤토리 키
const boatLocalStorageInventoryKey = {
  in: "inBoatInventory",
  magic: "magicBoatInventory",
  out: "outBoatInventory",
};

// 보트 타입
export interface BoatInfoType {
  label: "인보트" | "매직보트" | "아웃보트";
  type: BoatType;
  color: string;
  borderColor: string;
  getCountStorage: () => CountType;
  setCountStorage: (data: CountType) => void;
  getInventoryStorage: () => CountType;
  setInventoryStorage: (data: CountType) => void;
}

// 요일 맵
export const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

// 보트 정보
export const BOAT_INFO: {
  [key: string]: BoatInfoType;
} = {
  in: {
    label: "인보트",
    type: "in",
    color: "rgb(141, 110, 255)",
    borderColor: "rgb(141, 110, 255)",
    getCountStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageCountKey.in) || "{}"
        );
      } else {
        return {};
      }
    },
    setCountStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageCountKey.in,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageCountKey.in) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
    getInventoryStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageInventoryKey.in) || "{}"
        );
      } else {
        return 0;
      }
    },
    setInventoryStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageInventoryKey.in,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageInventoryKey.in) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
  },
  magic: {
    label: "매직보트",
    type: "magic",
    color: "rgb(255, 110, 110)",
    borderColor: "rgb(255, 110, 110)",
    getCountStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageCountKey.magic) || "{}"
        );
      } else {
        return {};
      }
    },
    setCountStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageCountKey.magic,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageCountKey.magic) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
    getInventoryStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageInventoryKey.magic) || "{}"
        );
      } else {
        return 0;
      }
    },
    setInventoryStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageInventoryKey.magic,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageInventoryKey.magic) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
  },
  out: {
    label: "아웃보트",
    type: "out",
    color: "rgb(69, 163, 69)",
    borderColor: "rgb(69, 163, 69)",
    getCountStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageCountKey.out) || "{}"
        );
      } else {
        return {};
      }
    },
    setCountStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageCountKey.out,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageCountKey.out) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
    getInventoryStorage: () => {
      if (typeof window !== "undefined") {
        return JSON.parse(
          localStorage?.getItem(boatLocalStorageInventoryKey.out) || "{}"
        );
      } else {
        return 0;
      }
    },
    setInventoryStorage: (data: CountType) => {
      localStorage?.setItem(
        boatLocalStorageInventoryKey.out,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(boatLocalStorageInventoryKey.out) || "{}"
          ),
          [TodayKey]: data[TodayKey],
        })
      );
    },
  },
};
