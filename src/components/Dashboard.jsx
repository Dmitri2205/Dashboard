import { useState,useEffect } from "react";
import styles from "../styles/dashboard.module.scss";


export default function Dashboard(props){

	const {children} = props;

	return(
		<section>
			{children[0]}
			<div>
				<div className={`${styles.dashboard} flex flex-column px-[86px] min-h-[250px]`}>
					<div className={`${styles.dashboard__aside} mt-[32px]`}>
						{children[1]}
					</div>
				</div>
			</div>		
		</section>
	)
}