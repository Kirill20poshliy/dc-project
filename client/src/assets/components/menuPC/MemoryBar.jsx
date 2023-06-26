import React, {useState, useEffect} from "react";

const MemoryBar = () => {

    const totalMemory = 200
    const [memory, setMemory] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            setMemory(data.occupiedMemory)
        })
        .catch(err => console.log(err))        
    }, [])

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