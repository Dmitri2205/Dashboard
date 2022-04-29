import { useState , useEffect} from "react";
import Switcher from "../modules/Switcher";
import Header from "./Header";
import Dashboard from "./Dashboard";
import plus from "../images/plus.png";


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

	useEffect(()=>{

	},[])


	const chooseCategory = (i) => {
		let cat = [...categories];
		cat.forEach(category => category.selected = false)
		cat[i].selected = true
		setCategories(cat);
	}

	return(
		<main className="container mx-auto bg-white rounded-sm mt-[20px]" style={{overflow:"hidden"}}>
			<Header/>
		    <Dashboard>
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
		    		<p className="flex justify-start items-center rounded-lg w-[180px] h-[46px] fz-[20px] bg-white">
		    			<img className="w-[16px] h-[16px] mr-[16px] ml-[24px]" src={plus} alt="add"/>
	    				<span className="justify-self-start" style={{color:"#367BF5",fontWeight:"bold"}}>Create new</span>
		    		</p>
		    		<div></div>
		    		<div></div>
		    		<div></div>
		    </Dashboard>
		</main>
	)
}