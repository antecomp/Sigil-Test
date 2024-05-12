

const ExampleNotif = ({closeToast, toastProps, title, msg, img}) => {
	return (
	  <div className='messageNotif'>
		<img src={img} alt="" />
		<div>
		  <h3>{title}</h3>
		  {msg}
		</div>
	  </div>
	)
  }

export default ExampleNotif