const QUESTIONS_LOADING='QUESTIONS_LOADING';
const QUESTIONS_ERROR='QUESTIONS_ERROR';
const QUESTIONS_SET='QUESTIONS_SET';

const questionsLoadingAC=function() {
  return {
    type: QUESTIONS_LOADING,
  };
}

const questionsErrorAC=function() {
  return {
    type: QUESTIONS_ERROR,
  };
}

const questionsSetAC=function(questions) {
  return {
    type: QUESTIONS_SET,
    questions:questions,
  };
}

export {
  questionsLoadingAC,QUESTIONS_LOADING,
  questionsErrorAC,QUESTIONS_ERROR,
  questionsSetAC,QUESTIONS_SET,
}
