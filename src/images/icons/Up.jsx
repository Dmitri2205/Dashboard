export default function Up(props){
	const {color,cb,direction} = props
	return(
		<svg onClick={e=>cb(direction)} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4.59 2.83L7.76 6L9.17 4.59L4.59 0L0 4.59L1.42 6L4.59 2.83Z" fill={color}/>
		</svg>
	)
}
