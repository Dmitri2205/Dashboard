import styles from "../styles/header.module.scss";
import avatar from "../images/avatar.png";

export default function Header(props) {
	const {} = props;

	const upgradeHandler = () => {
		alert("Upgrade");
	}

	return (
		<header className={`${styles.header} flex flex-row place-content-between`}>
			<div className={`${styles.header__logo} flex flex-row items-center`}>
				<span className="place-content-center items-center mr-[10px] shadow-md rounded-sm">d</span>
				<p>dashboard</p>
			</div>
			<div className={`${styles.header__buttons} flex flex-row items-center`}>
				<p className="inline-flex place-content-between w-[96px] h-[40px] rounded-sm place-content-center items-center mr-[16px] px-[9px]"> help <span title="Have a question?" className="w-[20px] h-[20px]"> </span></p>
				<button className="mr-[16px] w-[96px] h-[40px] rounded-sm" onClick={e=>upgradeHandler()}>upgrade</button>
				<img src={avatar} alt="avatar"/>
			</div>
		</header>
	)
}