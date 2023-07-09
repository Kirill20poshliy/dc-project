import { useSelector } from "react-redux"

const MemoryBar = () => {

    const totalMemory = 200
    const memory = useSelector(state => state.user.memory)

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

export default MemoryBar