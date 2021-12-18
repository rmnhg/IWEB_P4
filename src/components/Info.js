import { LangContext } from "./App";
import juegos_es from '../assets/juegos_es.png';
import juegos_en from '../assets/juegos_en.png';

export default function Info(props) {
	return <div id="main">
		<LangContext.Consumer>
		{(context) => {
			props.updateTitle(context.dictionary["pagetitle"], null, null);
			return <div>
				<p>{context.dictionary["infol1"]}</p>
				<p>{context.dictionary["infol2"]}</p>
				<p>{context.dictionary["infol3"]}</p>
				<img width="640" height="427" alt={context.dictionary["altMainImg"]} src={context.userLang === 'es' ? juegos_es : juegos_en}></img>
			</div>
		}}
		</LangContext.Consumer>
	</div>
}