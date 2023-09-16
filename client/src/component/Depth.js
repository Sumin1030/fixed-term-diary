function Depth(props) {
    let className = props.last? 'gb-depth last' : 'gb-depth'; 
    if(props.end) className += " end";
    const result = <div className={className} depth={props.depth}>
                        <span className='gb-depth-top'></span>
                        <span className='gb-depth-bottom'></span>
                    </div>;
    return result;
}

export default Depth;