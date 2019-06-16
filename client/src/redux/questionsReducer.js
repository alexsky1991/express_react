import { QUESTIONS_LOADING, QUESTIONS_ERROR, QUESTIONS_SET } from './questionsAC';

const initState={
  status: 0, 
  data: null
}

function questionsReducer(state=initState,action) {
  switch (action.type) {

    case QUESTIONS_LOADING: {
      let newState={
        status:1,
        data:null
      };
      return newState;
    }

    case QUESTIONS_ERROR: {
      let newState={
        status:2,
        data:null
      };
      return newState;
    }

    case QUESTIONS_SET: {
      let newState={
        status:3,
        data:action.questions
      };
      return newState;
    }
    
    default:
      return state;
  }
}

export default questionsReducer;
