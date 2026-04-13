import { redux } from 'zustand/middleware';
import { create } from 'zustand';
import reducer from './reducer';

const NPSs = document.querySelectorAll( '[data-id^="nps-survey-"]' );
export const initialState = {};

Array.from( NPSs ).forEach( ( element ) => {
	// nps custom data
	const props = JSON.parse( element.getAttribute( 'data-vars' ) );

	// nps unique id
	props.npsId = element.dataset.id;

	// add initial state for each nps
	initialState[ props.npsId ] = {
		showNps: props?.show_if,
		currentStep:
			'plugin-rating' === props?.nps_status?.dismiss_step
				? 'plugin-rating'
				: 'nps-rating',
		npsRating: null,
		npsId: props.npsId,
	};
} );

const useStore = create( redux( reducer, initialState ) );

export default useStore;
