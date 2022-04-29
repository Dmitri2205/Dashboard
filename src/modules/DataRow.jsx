import {useEffect} from 'react';

export default function DataRow(props){

const {rowData,name} = props

useEffect(()=>{
	console.log("nnen")
	return () => {

	}
},[])

	return(
		<div className="flex justify-between border-solid border-b-2 border-gray-300 w-full h-[44px] mb-[20px] ">
			<p>{name}</p>
			<p>{rowData.summary1}</p>			
			<p>{rowData.summary2}</p>			
			<p>{rowData.summary3}</p>			
			<p>{rowData.summary4}</p>			
			<p>{rowData.summary5}</p>			
		</div>
	)

}