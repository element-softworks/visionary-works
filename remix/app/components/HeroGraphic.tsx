import React from 'react';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';

const HeroImage: React.FC<{ [x: string]: any }> = (props) => {
	return (
		<div className={styles}>
			<svg
				{...props}
				xmlns="http://www.w3.org/2000/svg"
				width="1000.05"
				height="790.05"
				className="hero-svg"
				viewBox="0 0 1000 790"
			>
				<defs>
					<clipPath id="a">
						<path
							fill="none"
							d="M7.09 0h205.39a25 25 0 0125 25v392.38a21.91 21.91 0 01-21.91 21.91H7.09V0z"
						></path>
					</clipPath>
					<clipPath id="b">
						<rect
							width="223.3"
							height="429.08"
							x="10.64"
							y="3.87"
							fill="none"
							rx="18.45"
						></rect>
					</clipPath>
					<clipPath id="c">
						<rect
							width="775.42"
							height="480.24"
							x="121.38"
							y="154.81"
							fill="none"
							rx="23.5"
						></rect>
					</clipPath>
				</defs>
				<g className="code-shadow-wrapper" opacity="0.15">
					<rect
						width="485.83"
						height="431.7"
						x="514.22"
						y="358.35"
						className="code-shadow"
						rx="27.3"
					></rect>
				</g>
				<g className="mobile-shadow-wrapper" opacity="0.15">
					<rect
						width="237.48"
						height="450.27"
						className="mobile-shadow"
						rx="22.53"
					></rect>
				</g>
				<g className="desktop-wrapper">
					<g className="desktop">
						<rect
							width="786.35"
							height="491.68"
							x="113.78"
							y="151.57"
							opacity="0.15"
							rx="27"
						></rect>
						<rect
							width="775.44"
							height="480.24"
							x="121.76"
							y="154.81"
							fill="#fff"
							rx="23.5"
						></rect>
						<g className="features">
							<g className="feature">
								<g className="text">
									<rect
										width="114.05"
										height="13.45"
										x="176.8"
										y="534.53"
										fill="#111"
										rx="4.97"
									></rect>
									<g className="body">
										<rect
											width="129.18"
											height="6.69"
											x="169.23"
											y="568"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="155.89"
											height="6.69"
											x="155.88"
											y="581.38"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="98.36"
											height="6.69"
											x="184.64"
											y="594.77"
											opacity="0.08"
											rx="2.47"
										></rect>
									</g>
								</g>
								<circle cx="233.68" cy="460.73" r="45.73" fill="#ffd100"></circle>
							</g>
							<g className="feature">
								<g className="text">
									<rect
										width="114.05"
										height="13.45"
										x="360.57"
										y="534.53"
										fill="#111"
										rx="4.97"
									></rect>
									<g className="body">
										<rect
											width="129.18"
											height="6.69"
											x="353.01"
											y="568"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="155.89"
											height="6.69"
											x="339.65"
											y="581.38"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="98.36"
											height="6.69"
											x="368.42"
											y="594.77"
											opacity="0.08"
											rx="2.47"
										></rect>
									</g>
								</g>
								<circle cx="417.46" cy="460.73" r="45.73" fill="#ffd100"></circle>
							</g>
							<g className="feature">
								<g className="text">
									<rect
										width="114.05"
										height="13.45"
										x="544.35"
										y="534.53"
										fill="#111"
										rx="4.97"
									></rect>
									<g className="body">
										<rect
											width="129.18"
											height="6.69"
											x="536.78"
											y="568"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="155.89"
											height="6.69"
											x="523.43"
											y="581.38"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="98.36"
											height="6.69"
											x="552.19"
											y="594.77"
											opacity="0.08"
											rx="2.47"
										></rect>
									</g>
								</g>
								<circle cx="601.23" cy="460.73" r="45.73" fill="#ffd100"></circle>
							</g>
							<g className="feature">
								<g className="text">
									<rect
										width="114.05"
										height="13.45"
										x="728.12"
										y="534.53"
										fill="#111"
										rx="4.97"
									></rect>
									<g className="body">
										<rect
											width="129.18"
											height="6.69"
											x="720.55"
											y="568"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="155.89"
											height="6.69"
											x="707.2"
											y="581.38"
											opacity="0.08"
											rx="2.47"
										></rect>
										<rect
											width="98.36"
											height="6.69"
											x="735.96"
											y="594.77"
											opacity="0.08"
											rx="2.47"
										></rect>
									</g>
								</g>
								<circle cx="785" cy="460.73" r="45.73" fill="#ffd100"></circle>
							</g>
						</g>
						<g className="hero">
							<rect
								width="298.28"
								height="25.17"
								x="155.6"
								y="231.93"
								fill="#111"
								rx="9.3"
							></rect>
							<rect
								width="240.39"
								height="12.59"
								x="155.6"
								y="274.73"
								opacity="0.08"
								rx="4.65"
							></rect>
							<rect
								width="286.95"
								height="12.59"
								x="155.6"
								y="293.6"
								opacity="0.08"
								rx="4.65"
							></rect>
							<rect
								width="114.53"
								height="36.5"
								x="155.6"
								y="321.29"
								fill="#ffd100"
								rx="2.83"
							></rect>
						</g>
						<path
							fill="none"
							stroke="#000"
							strokeMiterlimit="10"
							strokeWidth="2"
							d="M121.76 386.21H897.2"
							opacity="0.08"
						></path>
						<circle cx="163.72" cy="196.75" r="8.12" fill="#111"></circle>
						<rect
							width="97.44"
							height="16.24"
							x="178.6"
							y="188.63"
							fill="#111"
							rx="2.83"
						></rect>
						<rect
							width="102.85"
							height="8.12"
							x="760.52"
							y="192.69"
							fill="#ffd100"
							rx="3"
						></rect>
						<rect
							width="102.85"
							height="8.12"
							x="642.33"
							y="192.69"
							fill="#ffd100"
							rx="3"
						></rect>
						<rect
							width="102.85"
							height="8.12"
							x="524.14"
							y="192.69"
							fill="#ffd100"
							rx="3"
						></rect>
						<rect
							width="102.85"
							height="8.12"
							x="405.96"
							y="192.69"
							fill="#ffd100"
							rx="3"
						></rect>
						<rect
							width="368.1"
							height="125.86"
							x="495.27"
							y="231.93"
							fill="#ffd100"
							rx="6"
						></rect>
					</g>
				</g>
				<g className="mobile-wrapper">
					<g className="mobile">
						<g clipPath="url(#a)">
							<rect
								width="775.42"
								height="480.24"
								x="121.38"
								y="154.81"
								opacity="0.08"
								rx="23.5"
							></rect>
						</g>
						<rect
							width="223.3"
							height="429.08"
							x="10.64"
							y="3.87"
							fill="#fff"
							rx="18.45"
						></rect>
						<g className="content">
							<circle cx="122.28" cy="129.89" r="50.72" fill="#ffd100"></circle>
							<g className="text">
								<rect
									width="126.48"
									height="14.92"
									x="59.05"
									y="213.96"
									fill="#111"
									rx="5.51"
								></rect>
								<g className="body">
									<rect
										width="143.26"
										height="7.42"
										x="50.65"
										y="251.07"
										opacity="0.08"
										rx="2.74"
									></rect>
									<rect
										width="172.88"
										height="7.42"
										x="35.84"
										y="265.92"
										opacity="0.08"
										rx="2.74"
									></rect>
									<rect
										width="109.08"
										height="7.42"
										x="67.74"
										y="280.76"
										opacity="0.08"
										rx="2.74"
									></rect>
								</g>
							</g>
							<g clipPath="url(#b)">
								<rect
									width="131.12"
									height="82.88"
									x="35.84"
									y="325.33"
									opacity="0.08"
									rx="10.66"
								></rect>
								<rect
									width="131.12"
									height="82.88"
									x="185.52"
									y="325.33"
									opacity="0.08"
									rx="10.66"
								></rect>
							</g>
						</g>
						<g className="header">
							<g fill="#111" className="logo">
								<circle cx="35.96" cy="28.45" r="6.19"></circle>
								<rect
									width="49.48"
									height="12.37"
									x="49.57"
									y="22.27"
									rx="2.83"
								></rect>
							</g>
							<g fill="#ffd100" className="menu">
								<rect
									width="14.84"
									height="2.47"
									x="197.54"
									y="22.27"
									rx="0.91"
								></rect>
								<rect
									width="14.84"
									height="2.47"
									x="197.54"
									y="27.21"
									rx="0.91"
								></rect>
								<rect
									width="14.84"
									height="2.47"
									x="197.54"
									y="32.16"
									rx="0.91"
								></rect>
							</g>
						</g>
					</g>
				</g>
				<g className="code-wrapper">
					<g className="code">
						<g clipPath="url(#c)">
							<path
								d="M968.29 779.59H546a25 25 0 01-25-25V386.77a27.86 27.86 0 0127.87-27.87h419.42a25 25 0 0125 25v370.69a25 25 0 01-25 25z"
								opacity="0.08"
							/>
						</g>
						<rect
							width="466.62"
							height="415.63"
							x="526.67"
							y="363.96"
							fill="#2d2d2d"
							rx="25"
						></rect>
						<g className="13">
							<rect
								width="39.58"
								height="9.9"
								x="564.05"
								y="737.53"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="69.27"
								height="9.9"
								x="622.19"
								y="737.53"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="86.59"
								height="9.9"
								x="710.01"
								y="737.53"
								fill="#b29000"
								rx="2"
							></rect>
							<rect
								width="56.9"
								height="9.9"
								x="815.16"
								y="737.53"
								fill="#ffd100"
								rx="2"
							></rect>
						</g>
						<g className="12">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="709.08"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="896.8"
								y="709.08"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="217.71"
								height="9.9"
								x="660.53"
								y="709.08"
								fill="#353535"
								rx="2"
							></rect>
						</g>
						<g className="11">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="680.63"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="879.48"
								y="680.63"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="54.43"
								height="9.9"
								x="806.5"
								y="680.63"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="127.41"
								height="9.9"
								x="660.53"
								y="680.63"
								fill="#fff"
								rx="2"
							></rect>
						</g>
						<g className="10">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="652.18"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="738.46"
								y="652.18"
								fill="#fff"
								rx="2"
							></rect>
							<rect
								width="112.57"
								height="9.9"
								x="796.6"
								y="652.18"
								fill="#353535"
								rx="2"
							></rect>
							<rect
								width="59.38"
								height="9.9"
								x="660.53"
								y="652.18"
								fill="#b29000"
								rx="2"
							></rect>
						</g>
						<g className="9">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="623.73"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="142.26"
								height="9.9"
								x="780.52"
								y="623.73"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="101.43"
								height="9.9"
								x="660.53"
								y="623.73"
								fill="#b29000"
								rx="2"
							></rect>
						</g>
						<g className="8">
							<rect
								width="39.58"
								height="9.9"
								x="564.05"
								y="595.28"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="69.27"
								height="9.9"
								x="622.19"
								y="595.28"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="86.59"
								height="9.9"
								x="710.01"
								y="595.28"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="56.9"
								height="9.9"
								x="815.16"
								y="595.28"
								fill="#fff"
								rx="2"
							></rect>
						</g>
						<g className="7">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="566.83"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="121.23"
								height="9.9"
								x="825.05"
								y="566.83"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="38.35"
								height="9.9"
								x="768.15"
								y="566.83"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="89.06"
								height="9.9"
								x="660.53"
								y="566.83"
								fill="#353535"
								rx="2"
							></rect>
						</g>
						<g className="6">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="538.37"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="879.48"
								y="538.37"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="54.43"
								height="9.9"
								x="806.5"
								y="538.37"
								fill="#b29000"
								rx="2"
							></rect>
							<rect
								width="127.41"
								height="9.9"
								x="660.53"
								y="538.37"
								fill="#ffd100"
								rx="2"
							></rect>
						</g>
						<g className="5">
							<rect
								width="39.58"
								height="9.9"
								x="564.05"
								y="509.92"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="69.27"
								height="9.9"
								x="622.19"
								y="509.92"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="86.59"
								height="9.9"
								x="710.01"
								y="509.92"
								fill="#fff"
								rx="2"
							></rect>
							<rect
								width="56.9"
								height="9.9"
								x="815.16"
								y="509.92"
								fill="#353535"
								rx="2"
							></rect>
						</g>
						<g className="4">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="481.47"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="159.57"
								height="9.9"
								x="660.53"
								y="481.47"
								fill="#b29000"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="838.66"
								y="481.47"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="896.8"
								y="481.47"
								fill="#ffd100"
								rx="2"
							></rect>
						</g>
						<g className="3">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="453.02"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="738.46"
								y="453.02"
								fill="#353535"
								rx="2"
							></rect>
							<rect
								width="112.57"
								height="9.9"
								x="796.6"
								y="453.02"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="59.38"
								height="9.9"
								x="660.53"
								y="453.02"
								fill="#ffd100"
								rx="2"
							></rect>
						</g>
						<g className="2">
							<rect
								width="39.58"
								height="9.9"
								x="602.39"
								y="424.57"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="896.8"
								y="424.57"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="217.71"
								height="9.9"
								x="660.53"
								y="424.57"
								fill="#fff"
								rx="2"
							></rect>
						</g>
						<g className="1">
							<rect
								width="39.58"
								height="9.9"
								x="564.05"
								y="396.12"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="39.58"
								height="9.9"
								x="755.78"
								y="396.12"
								fill="#b29000"
								rx="2"
							></rect>
							<rect
								width="79.17"
								height="9.9"
								x="813.92"
								y="396.12"
								fill="#ffd100"
								rx="2"
							></rect>
							<rect
								width="115.04"
								height="9.9"
								x="622.19"
								y="396.12"
								fill="#ffd100"
								rx="2"
							></rect>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

const heroGraphicMobile = keyframes`
	0% {
		transform: translateY(0);
	}
		
	50% {
		transform: translateY(10px);
	}
	
	100% {
		transform: translateY(0);
	}
`;

const heroGraphicDesktop = keyframes`
	0% {
		transform: translateY(0);
	}
	
	50% {
		transform: translateY(18px);
	}
	
	100% {
		transform: translateY(0);
	}
`;

const heroGraphicCode = keyframes`
	0% {
		transform: translateY(0);
	}
	
	50% {
		transform: translateY(12px);
	}
	
	100% {
		transform: translateY(0);
	}
`;

const styles = css`
	.hero-svg .mobile,
	.hero-svg .mobile-shadow {
		animation: ${heroGraphicMobile} 3s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
	}

	.hero-svg .desktop {
		animation: ${heroGraphicDesktop} 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) -3s infinite;
	}

	.hero-svg .code,
	.hero-svg .code-shadow {
		animation: ${heroGraphicCode} 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) -1s infinite;
	}
`;

export default HeroImage;
