import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "..";
import {
  fetchMatchList,
  fetchChnnelList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IChnnelitem,
  IMatchitem,
} from "./mainR";

export interface IUseMainReturn {
  MatchList?: Array<IMatchitem>;
  chnnelList: Array<IChnnelitem>;
  getData: () => Promise<void>;
  getData2: () => Promise<void>;
}

const useMain = (): IUseMainReturn => {
  const { MatchList } = useSelector((state: State) => state.main);
  const { chnnelList } = useSelector((state: State) => state.main);
  const dispatch = useDispatch();

  const getData: () => Promise<void> = useCallback(async (): Promise<void> => {
    // dispatch(getMainList());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await dispatch(fetchMatchList());
    if (res.error === undefined && res.payload.result) {
      console.log("MatchItem Select");
    } else {
      console.log("error");
    }
  }, []);

  const getData2: () => Promise<void> = useCallback(async (): Promise<void> => {
    // dispatch(getMainList());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await dispatch(fetchChnnelList());
    if (res.error === undefined && res.payload.result) {
      console.log("chnnelItem Select");
    } else {
      console.log("error");
    }
  }, []);

  return { chnnelList, MatchList, getData, getData2 };
};
export default useMain;
