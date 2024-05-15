import Draggable, {DraggableCore} from "react-draggable";
import '~/styles/extra/Windowbase.css'
import eye from '~/assets/ui/eyeicon.png'

const TestWindow = () => {
	return (
		<Draggable
		handle=".handle">
			<div className="Window">
				<div className="handle">
					<img src={eye} alt="" />
				</div>
				<div className="content">
					<h1>Sloptime</h1>
					<p>This is a window you should be able to drag around??</p>
				</div>
			</div>
		</Draggable>
	)
}

export default TestWindow;