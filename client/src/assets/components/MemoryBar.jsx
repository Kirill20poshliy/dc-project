import React, {Component} from "react";

class MemoryBar extends Component {

    state = {
        totalMemory: 0,
        memory: 0,
    }

    render () {

        const {memory, totalMemory} = this.state
        let percent = (memory*100)/totalMemory

        return (
            <div className="memory column">
                <div className="memory-bar">
                    <div 
                        className="memory-bar-progress" 
                        style={{width: `${percent}%`}}
                    />
                </div>
                <div className="column content-center memory-plate">
                    {memory || totalMemory ? (`Занято ${memory} МБ из ${totalMemory} МБ`) : ('Undefined')}
                </div>
            </div>
        ) 

    }

}

export default MemoryBar