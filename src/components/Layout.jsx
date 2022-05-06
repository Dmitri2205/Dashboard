import { useState, useEffect } from "react";
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


    const [categories, setCategories] = useState([{
            name: "Analyze",
            selected: true
        },
        {
            name: "My campaigns",
            selected: false
        },
        {
            name: "Configure",
            selected: false
        }
    ]);

    const [data, setData] = useState([{
            name: "Data1",
            summary1: Math.floor(Math.random() * 1001),
            summary2: Math.floor(Math.random() * 801),
            summary3: Math.floor(Math.random() * 401),
            summary4: Math.floor(Math.random() * 201),
            summary5: Math.floor(Math.random() * 101),

        },
        {
            name: "Data2",
            summary1: Math.floor(Math.random() * 1002),
            summary2: Math.floor(Math.random() * 802),
            summary3: Math.floor(Math.random() * 402),
            summary4: Math.floor(Math.random() * 202),
            summary5: Math.floor(Math.random() * 102),

        },
        {
            name: "Data3",
            summary1: Math.floor(Math.random() * 1003),
            summary2: Math.floor(Math.random() * 803),
            summary3: Math.floor(Math.random() * 403),
            summary4: Math.floor(Math.random() * 203),
            summary5: Math.floor(Math.random() * 103),

        },
        {
            name: "Data4",
            summary1: Math.floor(Math.random() * 1004),
            summary2: Math.floor(Math.random() * 804),
            summary3: Math.floor(Math.random() * 404),
            summary4: Math.floor(Math.random() * 204),
            summary5: Math.floor(Math.random() * 104),

        },
        {
            name: "Data5",
            summary1: Math.floor(Math.random() * 1005),
            summary2: Math.floor(Math.random() * 805),
            summary3: Math.floor(Math.random() * 405),
            summary4: Math.floor(Math.random() * 205),
            summary5: Math.floor(Math.random() * 105),

        },
    ]);

    const [sortType, setSortType] = useState("all");


    const chooseCategory = (i) => {
        let cat = [...categories];
        cat.forEach(category => category.selected = false)
        cat[i].selected = true
        setCategories(cat);
    }

    const asideSwitches = [{
            icon: EvenIcon(),
            text: 'Even rows of data',
            tip: 'Display rows 2,4,6 etc'
        },
        {
            icon: OddIcon(),
            text: 'Odd rows of data',
            tip: 'Display rows 1,3,5 etc'
        },
        {
            icon: AllDataIcon(),
            text: 'All data',
            tip: 'Display all data'
        },
    ]

    const createNew = () => {
        let newArray = [...data];
        newArray.push({
            name: `Data${newArray.length+1}`,
            summary1: Math.floor(Math.random() * 1000),
            summary2: Math.floor(Math.random() * 800),
            summary3: Math.floor(Math.random() * 400),
            summary4: Math.floor(Math.random() * 200),
            summary5: Math.floor(Math.random() * 100),

        })
        return setData(newArray);
    }

    return ( 
    	<main className="container mx-auto bg-white rounded-sm mt-[20px]">
        <Header/> 
        <Dashboard data={ data } sortType={ sortType } >
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
		    						<span onClick={(e) => chooseCategory(i)} style={{cursor:"pointer"}}>{category.name}</span>
		    					</div>
		    				
		    				)
		    			})
		    		}
		    	</Switcher>

        <p className = { `${dashboard_styles.aside__create} flex justify-start items-center rounded-lg w-[180px] h-[46px] ml-[7px] mb-[32px] text-xl bg-white cursor-pointer` } onClick = { e => createNew() } >
        <img className="w-[16px] h-[16px] mr-[16px] ml-[24px]" src={plus} alt="add"/>

        <span className = "justify-self-start"
        style = {{ color: "#367BF5", fontWeight: "bold" }} >
        Create new 
        </span> 
        </p>

        {
            asideSwitches.map((switcher, i) => {
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