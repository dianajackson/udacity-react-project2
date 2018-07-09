import {DATA_LOAD_STARTED, DATA_LOAD_FINISHED, DATA_LOAD_NOT_STARTED} from "../actions/commonActions"

export default function setDataLoadState (state = "", action) {

  	if ([DATA_LOAD_STARTED, DATA_LOAD_FINISHED, DATA_LOAD_NOT_STARTED].includes(action.type)) {
      	//let dataLoadStatus = action.dataLoadStatus || ""
    	return action.dataLoadStatus
      	//return {
      		//state,
      	//	action.dataLoadStatus
    	//}
  	}

    return state;
}
