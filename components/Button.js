export default function Button({ color, key, text, onClick, hidden, type, isDisabled, iconL, iconR }) {
    return <button key={key} className={`btn btn-${color} ${isDisabled ? 'opacity-50 hover:cursor-not-allowed' : ''}  ${hidden ? 'hidden' : ''}`} type={type} onClick={onClick} disabled={isDisabled}>{iconL}{text}{iconR}</button>;
  }  
