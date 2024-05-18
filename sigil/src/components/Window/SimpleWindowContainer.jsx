import Draggable from 'react-draggable'; // Both at the same time
import '~/styles/Window/SimpleWindow.css'
import icon from '~/assets/ui/eyeicon.png'
import closeIcon from '~/assets/ui/window_close.png'
import useViewportDimensions from '../../hooks/useViewportDimensions';


const SimpleWindowContainer = ({children, width, height = '50vh'}) => {

	const vpdm = useViewportDimensions();
	// Todo, effect into the changes to viewport dimensions to trigger a window reposition if the window is resized to clip it.

	return (
		<Draggable
        handle=".handle span"
        defaultPosition={{x: 0, y: 0}}
        scale={1}
        bounds="#desktop"
		position={null}
        >
        <div className='simple-window' style={{'maxWidth': width}}>
          <div className="handle">
			<img src={icon} alt="" />
			<span></span>
			<img src={closeIcon} alt="" />
		  </div>
		  <div className='window-content'>
          	{children}
		  </div>
        </div>
      </Draggable>
	)
}

export default SimpleWindowContainer;