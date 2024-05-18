import Draggable from 'react-draggable'; // Both at the same time
import '~/styles/Window/Window.css'
import icon from '~/assets/ui/eyeicon.png'
import closeIcon from '~/assets/ui/window_close.png'
import lcorner from '~/assets/ui/win_single_corner_left.png'
import rcorner from '~/assets/ui/win_single_corner_right.png'
import useViewportDimensions from '../../hooks/useViewportDimensions';


const WindowContainer = ({children, width, height = '50vh'}) => {

	const vpdm = useViewportDimensions();
	// Todo, effect into the changes to viewport dimensions to trigger a window reposition if the window is resized to clip it.

	return (
		<Draggable
        handle=".handle span"
        defaultPosition={{x: Math.floor(vpdm.width / 2.5 * (Math.random())), y: Math.floor(vpdm.height / 2.5 * (Math.random())) }}
        scale={1}
        bounds="#desktop"
		position={null}
        >
        <div style={{'maxWidth': '75ch', 'width': 'fit-content', 'height': height, 'maxHeight': height}} className='window'>
          <div className="handle">
			<img src={icon} alt="" />
			<span></span>
			<img src={closeIcon} alt="" />
		  </div>
		  <div className='window-content'>
          	{children}
		  </div>
		  <div className="window-footer">
			<img src={lcorner} style={{'top': '-1px', 'left': '0px'}} alt="" />
			<span></span>
			<img src={rcorner} style={{'top': '-1px', 'right': '0px'}} alt="" />
		  </div>
        </div>
      </Draggable>
	)
}

export default WindowContainer;