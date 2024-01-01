import {withDefaultProps} from "../lib";

export const Arrow = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 14 24" fill='none' xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2 2L11.2929 11.2929C11.6834 11.6834 11.6834 12.3166 11.2929 12.7071L2 22" stroke="#0D0C0C" strokeWidth="4" strokeLinecap="round"/>
    </svg>
));

export const Clear = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 15L11.5 10.5L10 12L14.5 16.5L10 21L11.5 22.5L16 18L20.5 22.5L22 21L17.5 16.5L22 12L20.5 10.5L16 15Z" fill="#B3B3BC"/>
    </svg>
));

export const ClearError = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 15L11.5 10.5L10 12L14.5 16.5L10 21L11.5 22.5L16 18L20.5 22.5L22 21L17.5 16.5L22 12L20.5 10.5L16 15Z" fill="#F51B1B"/>
    </svg>
));

export const Close = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M31.3139 11.5147L28.4855 8.68629L20.0002 17.1716L11.515 8.68629L8.68652 11.5147L17.1718 20L8.68652 28.4853L11.5149 31.3137L20.0002 22.8284L28.4855 31.3137L31.3139 28.4853L22.8287 20L31.3139 11.5147Z" fill="#B3B3BC"/>
    </svg>
));

export const EyeClose = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.85379 13.9792C3.56613 13.5077 2.95075 13.3587 2.47929 13.6464C2.00784 13.934 1.85884 14.5494 2.1465 15.0209C2.26376 15.2131 2.69465 15.7472 3.33234 16.4055C3.99631 17.091 4.93997 17.9689 6.12612 18.8436C6.36456 19.0195 6.61342 19.1957 6.87236 19.3704L4.70714 21.5357C4.31662 21.9262 4.31662 22.5593 4.70714 22.9499C5.09767 23.3404 5.73083 23.3404 6.12136 22.9499L8.63401 20.4372C10.4395 21.409 12.5856 22.1999 15.0001 22.4359V26.0001C15.0001 26.5524 15.4478 27.0001 16.0001 27.0001C16.5524 27.0001 17.0001 26.5524 17.0001 26.0001V22.4465C18.6183 22.2913 21.2423 21.758 23.9143 20.3285L26.5357 22.9498C26.9262 23.3404 27.5593 23.3404 27.9499 22.9498C28.3404 22.5593 28.3404 21.9262 27.9499 21.5356L25.6682 19.2539C27.163 18.2107 28.6063 16.8455 29.8253 15.0649C30.1373 14.6092 30.0208 13.9869 29.5651 13.6749C29.1094 13.3629 28.487 13.4794 28.175 13.9351C24.3341 19.5452 17.8792 20.4944 16.0166 20.5C12.4786 20.3761 9.48234 18.8338 7.3132 17.234C6.23119 16.436 5.37012 15.6347 4.76888 15.014C4.21213 14.4393 3.91729 14.0605 3.86291 13.9906C3.856 13.9817 3.85298 13.9778 3.85379 13.9792Z" fill="#B3B3BC"/>
    </svg>
));

export const EyeOpen = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M7.41477 19.9673C5.61259 18.4813 4.42918 16.9874 4.06297 16.4997C4.42961 16.0115 5.61295 14.5179 7.41477 13.0321C9.54775 11.2732 12.4532 9.60228 15.8309 9.50381C19.924 9.39531 23.9958 11.6155 27.9271 16.4996C24.0924 21.2635 20.1261 23.5 16.1441 23.5C16.0412 23.5 15.9372 23.4984 15.8312 23.4955C12.4534 23.3971 9.54781 21.7262 7.41477 19.9673Z" stroke="#B3B3BC" strokeWidth="2"/>
        <circle cx="16" cy="16.5" r="3.5" stroke="#B3B3BC" strokeWidth="2"/>
    </svg>
));

export const Info = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13.0078 8.87818C13.0078 9.15432 12.784 9.37818 12.5078 9.37818H11.4924C11.2163 9.37818 10.9924 9.15432 10.9924 8.87818V8.18726C10.9924 7.91111 11.2163 7.68726 11.4924 7.68726L12.5078 7.68725C12.784 7.68725 13.0078 7.91111 13.0078 8.18725V8.87818ZM12.9598 15.8128C12.9598 16.089 12.7359 16.3128 12.4598 16.3128H11.5288C11.2527 16.3128 11.0288 16.089 11.0288 15.8128L11.0288 11.4367C11.0288 11.1606 11.2527 10.9367 11.5288 10.9367H12.4598C12.7359 10.9367 12.9598 11.1606 12.9598 11.4367L12.9598 15.8128Z" fill="#0D0C0C"/>
    </svg>
));

export const Logo = withDefaultProps(({ size, fill, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 53 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M26.4315 14.3425L49.9492 3.20801L52.967 6.22578L34.7563 26.1014L26.4315 17.8806L18.2107 26.1014L0 6.22578L3.01777 3.20801L26.4315 14.3425Z" fill="#F51B1B"/>
    </svg>
));
