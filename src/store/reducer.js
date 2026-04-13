import actionTypes from './action-types';

const reducer = ( state, { type, payload, npsId } ) => {
	switch ( type ) {
		case actionTypes.SET_SHOW_NPS:
			return {
				...state,
				[ npsId ]: { ...state[ npsId ], showNps: payload },
			};
		case actionTypes.SET_CURRENT_STEP:
			return {
				...state,
				[ npsId ]: { ...state[ npsId ], currentStep: payload },
			};
		case actionTypes.SET_NPS_RATING:
			return {
				...state,
				[ npsId ]: { ...state[ npsId ], npsRating: payload },
			};
		default:
			return state;
	}
};

export default reducer;
