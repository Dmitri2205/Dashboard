import { useState,useEffect } from "react";
import styles from "../styles/dashboard.module.scss";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import AllDataIcon from "../images/icons/AllDataIcon.jsx";
import Up from "../images/icons/Up.jsx";
import DownloadIcon from "../images/icons/DownloadIcon.jsx";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export default function Dashboard(props){

	const {children,data,sortType} = props;

	const [pickerShown,showPicker] = useState(false)
	
	const [sortDirection,setSortDirection] = useState("");

	const [reversed,setReversed] = useState(false)

	const [sortedData,setSortedData] = useState([]);

	useEffect(()=>{
		setSortDirection("down")
	},[null])

	useEffect(() => {
		filterFunc(data);
	},[null,sortType,data])

	useEffect(()=>{
		if(sortedData.length !== 0){
			sortFunc(sortedData)
		}
	},[sortDirection])

	const filterFunc = (toSort) => {
		let sorted = sortType === "even" ? toSort.filter((data,i) => i % 2 === 1) :
					sortType === "odd" ? toSort.filter((data,i) => i % 2 === 0) :
					toSort;
		sortFunc(reversed ? sorted.reverse() : sorted)
	}

	const sortFunc = (sorted) => {
		let copyed = Array.from(sorted)
		let orderedData = copyed
		if(sortDirection === "up" && !reversed || sortDirection === "down" && reversed){
			setReversed(!reversed)
			orderedData.reverse();
		}
		setSortedData(orderedData);
	}

	const [dates,setDates] = useState([
	  {
	    startDate: new Date(),
	    endDate: addDays(new Date(), 7),
	    key: 'selection'
	  }
	]);


	const processedDate = (type) => {
		let date = dates[0][type].toString().split(" ")
		return date[1] + " " + date[2] + "," + date[3]

	}

	return(
		<section>
			{children[0]}
				<div className={`${styles.dashboard} flex flex-column px-[86px] min-h-[250px]`}>
					<div className={`${styles.dashboard__aside} mt-[32px]`}>
						{children[1]}
						{children[2]}
						{children[3]}
						{children[4]}
					</div>
					<div className={`${styles.dashboard__table} flex flex-col ml-[4%] mt-[12px] w-full`}>
						<div className={`${styles.table__header} flex justify-between items-center `}>
							<p className="text-2xl md:text-xl`">Dashboard</p>
							<div className={`${styles.header__inputs} inline-flex items-center`}>
								<label className="inline-flex items-center rounded-sm border-2 border-solid border-gray-300 px-3">
									<p>{processedDate("startDate")}</p>
									<span className="dot" style={{display:"inline-flex",width:"4px",height:"4px",borderRadius:"50%",backgroundColor:"black",margin:"0 1px"}}></span>
									<p>{processedDate("endDate")}</p>
									<span onClick={e=>showPicker(!pickerShown)} style={pickerShown ? {transform:"rotateX(180deg) translateY(5px)"} : {transform:"rotateX(0deg)"}}></span>
								</label>
								<span className="inline-flex justify-center items-center rounded-sm bg-white ml-2">{AllDataIcon()}</span>
								<span className="inline-flex justify-center items-center rounded-sm bg-white ml-2">{DownloadIcon()}</span>
							</div>
						</div>
						<div className={`${styles.table__sortRow} flex flex-row justify-between mt-[38px]`}>
						<label className={`${styles.sortRow__arrows} inline-flex items-center`}>
							<div className="flex flex-col w-4 justify-center items-center">
								{Up({color:sortDirection === "up" ? "#069697" : "#C6CACC",cb:setSortDirection,direction:"up"})}
								{Up({color:sortDirection === "down" ? "#069697" : "#C6CACC",cb:setSortDirection,direction:"down"})}
							</div>
							<p>Data</p>
						</label>
							<ul className="inline-flex justify-between w-[83.5%] columns-5">
								{
									[1,2,3,4,5].map((item)=>{
										return <li key={`Summary${item}`} className="text-base">Summary{item}</li>
									})
								}
							</ul>
						</div>
						<TransitionGroup component="ul">
						{
							sortedData.map((datacell,i)=>{
								return(
								<CSSTransition key={datacell.name} 
											   timeout={500}
											   in={true}
											   classNames="item"
								>
								<li className={`inline-flex justify-between items-center border-solid border-b-2 border-gray-300 w-full h-[44px] mb-[20px]`}>
									{
										Object.values(datacell).map((value,i)=>{
											return <p key={value.toString()} className="min-w-[50px] text-right">{value}</p>
										})
									}			
								</li>
								</CSSTransition>
								)
							})
						}
						</TransitionGroup>
					</div>
				<div className={`${styles.dashboard__datePicker} ${pickerShown ? "" : styles.hidden}`}>
					<DateRange
					  onChange={item => setDates([item.selection])}
					  showSelectionPreview={true}
					  moveRangeOnFirstSelection={false}
					  months={2}
					  ranges={dates}
					  direction="horizontal"
					/>
				</div>
				</div>
		</section>
	)
}