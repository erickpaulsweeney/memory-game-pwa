import Icon from "./Icon";

function Card(props) {
    return (
        <div className="card" onClick={() => props.handleClick(props)} style={{ transform: props.display ? 'rotateX(180deg)' : null }}>
            <div className="icon-container" style={{ backgroundColor: props.bgColor }}>
                <Icon svgNo={props.svgNo}/>
            </div>
        </div>
    )
}

export default Card;