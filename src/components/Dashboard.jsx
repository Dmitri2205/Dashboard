import { useState,useEffect } from "react";
import styles from "../styles/dashboard.module.scss";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';


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
					<div className={`${styles.dashboard__table} flex flex-col ml-[10%] mt-[12px] w-full`}>
						<div className={`${styles.table__header} flex justify-between items-center `}>
							<p className="text-4xl md:text-2xl`">Dashboard</p>
							<div className={`${styles.header__inputs} inline-flex`}>
								<label className="inline-flex items-center rounded-sm border-2 border-solid border-gray-300 px-3">
								<input type="text" value={processedDate("startDate")}/>
								-
								<input type="text" value={processedDate("endDate")}/>
								<span onClick={e=>showPicker(!pickerShown)} style={pickerShown ? {transform:"rotateY(180deg)"} : {transform:"rotateY(0deg)"}}></span>
								</label>
							</div>
						</div>
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