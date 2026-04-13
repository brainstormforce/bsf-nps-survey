import { createRoot } from '@wordpress/element';
import App from './app';

const NPSs = document.querySelectorAll( '[data-id^="nps-survey-"]' );

// create nps survey for each nps
NPSs.forEach( ( element, index ) => {
	const root = createRoot( element );

	// nps custom data
	const props = JSON.parse( element.getAttribute( 'data-vars' ) );

	// nps unique id
	props.npsId = element.dataset.id;
	// nps index for positioning
	props.npsIndex = index;

	root.render( <App { ...props } key={ props.npsId } /> );
} );
