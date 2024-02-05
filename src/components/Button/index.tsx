import './styles.css'

interface ButtonInterface{
    onClick: ()=> void;
    label: string;
}

export const Button = ({onClick, label}: ButtonInterface)=>{
    return (<button onClick={onClick}>{label}</button>)
}