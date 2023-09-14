import React from 'react';
let idx = 0;
class Message extends React.Component {
    render() {
        return <div>
        {
            this.props.msg.map((content) => {
                return(
                    <div key={idx++}>{content}</div>
                );
            })
        }
    </div>
    }
}

export default Message;