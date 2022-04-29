import { useState,useEffect } from "react";
import styles from "../styles/dashboard.module.scss";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import AllDataIcon from "../images/icons/AllDataIcon.jsx";
import DownloadIcon from "../images/icons/DownloadIcon.jsx";
import DataRow from "../modules/DataRow.jsx";



export default function Dashboard(props){

	const {children,data} = props;

	const [pickerShown,showPicker] = useState(false)

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
						{
							data.map((datacell,i)=>{
								return <DataRow key={datacell.name} name={datacell.name} rowData={datacell} />
							})
						}
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