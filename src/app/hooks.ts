import { useDispatch, useSelector,} from "react-redux";

import type { AppDispatch, RootState,} from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

//Current Redux Toolkit TypeScript guidance recommends creating these typed hooks
// rather than repeatedly typing useDispatch and useSelector inside every component.