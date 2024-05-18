import Draggable from 'react-draggable'; // Both at the same time
import '~/styles/Window/Window.css'
import icon from '~/assets/ui/eyeicon.png'
import closeIcon from '~/assets/ui/window_close.png'
import lcorner from '~/assets/ui/win_single_corner_left.png'
import rcorner from '~/assets/ui/win_single_corner_right.png'

const WindowContainer = ({children, width, height}) => {
	return (
		<Draggable
        handle=".handle span"
        defaultPosition={{x: 0, y: 0}}
        scale={1}
        bounds="#desktop"
		position={null}
        >
        <div style={{'max-width': '75ch', 'width': 'fit-content', 'height': height}} className='window'>
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