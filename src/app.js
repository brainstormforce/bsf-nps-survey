import NpsDialog from './components/dialog';
import './style.scss';

const App = ( props ) => {
	return (
		<div id="nps-survey-wrapper" className="nps-survey-wrapper">
			{ props && <NpsDialog { ...props } /> }
		</div>
	);
};

export default App;
