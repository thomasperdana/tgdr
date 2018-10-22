import { Reducer } from 'redux';
import produce from 'immer';
import { EntriesStateTypes, IEntriesState } from './entriesTypes';
import { RootAction } from '../storeTypes';

const initialState: IEntriesState = {
  category: null,
  data: {
    bot: {
      hot: [],
      isLoading: false,
      new: [],
      top: [],
    },
    channel: {
      hot: [],
      isLoading: false,
      new: [],
      top: [],
    },
    supergroup: {
      hot: [],
      isLoading: false,
      new: [],
      top: [],
    },
  },
  hasError: false,
  limit: 9,
  skip: 0,
};

export const entriesReducer: Reducer<IEntriesState> = (
  state = initialState,
  action: RootAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case EntriesStateTypes.REQUEST:
        draft.data[action.payload.type].isLoading = true;
        return;

      case EntriesStateTypes.SUCCESS:
        draft.limit = action.payload.limit;
        draft.skip = action.payload.skip;
        draft.category = action.payload.category;
        draft.hasError = false;
        draft.data[action.payload.type].isLoading = false;
        draft.data[action.payload.type][action.payload.sort] =
          action.payload.data;
        return;

      case EntriesStateTypes.FAILURE:
        draft.hasError = true;
        return;
    }
  });