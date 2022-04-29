import { useState , useEffect} from "react";
import Switcher from "../modules/Switcher";
import Header from "./Header";
import Dashboard from "./Dashboard";
import dashboard_styles from "../styles/dashboard.module.scss";

import plus from "../images/plus.png";
import EvenIcon from "../images/icons/EvenIcon.jsx";
import OddIcon from "../images/icons/OddIcon.jsx";
import AllDataIcon from "../images/icons/AllDataIcon.jsx";


export default function Layout(props) {
	
	const { children } = props;


	const [categories,setCategories] = useState([
		{
			name:"Analyze",
			selected:true
		},
		{
			name:"My campaigns",
			selected:false
		},
		{
			name:"Configure",
			selected:false
		}
	]);

	const [data,setData] = useState([]);

	const [sortType,setSortType] = useState("all");

	useEffect(()=>{
		sortData()
	},[sortType])


	const chooseCategory = (i) => {
		let cat = [...categories];
		cat.forEach(category => category.selected = false)
		cat[i].selected = true
		setCategories(cat);
	}

	const sortData = () => {
		console.log(sortType);
	}

	const asideSwitches = [
		{
			icon:EvenIcon(),
			text:'Even rows of data',
			tip:'Display rows 2,4,6 etc'
		},	
		{
			icon: OddIcon(),
			text:'Odd rows of data',
			tip:'Display rows 1,3,5 etc'
		},	
		{
			icon:AllDataIcon(),
			text:'All data',
			tip:'Display all data'
		},	
	]

	return(
		<main className="container mx-auto bg-white rounded-sm mt-[20px]" /*style={{overflow:"hidden"}}*/>
			<Header/>
		    <Dashboard data={data}>
		    	<Switcher>
		    		{
		    			categories.map((category,i) => {
		    				return (
		    					<div key={i}
		    						 className={
    						  			`${category.selected ? "border-solid border-2 border-gray-300" : ""} 
    						  			inline-flex justify-center items-center mx-[4px] w-[140px] h-[47px] 
    						  			box-content rounded-sm px-[10px]`
		    						  }
		    						  style={{borderBottom:"none",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0",transition:"all .3s"}}
		    					>
		    						<span onClick={(e) => chooseCategory(i) } style={{cursor:"pointer"}}>{category.name}</span>
		    					</div>
		    				
		    				)
		    			})
		    		}
		    	</Switcher>
		    		<p className={`${dashboard_styles.aside__create} flex justify-start items-center rounded-lg w-[180px] h-[46px] ml-[7px] mb-[32px] text-xl bg-white`}>
		    			<img className="w-[16px] h-[16px] mr-[16px] ml-[24px]" src={plus} alt="add"/>
	    				<span className="justify-self-start" style={{color:"#367BF5",fontWeight:"bold"}}>Create new</span>
		    		</p>
		    		{
		    			asideSwitches.map((switcher,i)=>{
		    				return (
		    					<div key={switcher.text.split(" ")[0]} 
		    						 onClick={(e) => setSortType(switcher.text.split(" ")[0].toLowerCase()) }
		    						 className={`${dashboard_styles.aside__switcher} ${sortType === switcher.text.split(" ")[0].toLowerCase() ? dashboard_styles.active : '' } 
		    						 			 flex items-center rounded-sm px-[16px] py-[7px] mb-[8px] min-w-[224px]`
		    						 }
		    					>
		    						{switcher.icon}
		    						<p className="inline-flex flex-col text-base">
		    							{switcher.text}
		    							<span className="text-xs color-gray">{switcher.tip}</span>
		    						</p>
		    					</div>
		    				)
		    			})
		    		}
		    </Dashboard>
		</main>
	)
}