import { useEffect, useState } from "react";

interface Props {
    castingId: string;
}


async function putCasting(data: any) {
    const res = await fetch('/api/castings/' + data.id, { 
      cache: 'no-store',
      method: 'PUT',
      body: JSON.stringify(data)
    });
  
    const resdata = await  res.json()
  
    return resdata;
  }

export default function CastingEdit ({ castingId } : Props) {
    //const [ casting, setCasting ] = useState([ {type: "bard", spellsPerLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} ]);
    const [ casting, setCasting ] = useState({ className: "bard", cantripCount: 0, spellsPerLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

    useEffect(() => {
        fetch('http://localhost:3000/api/castings/' + castingId, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                console.log("Data before set: " , data);
                setCasting(data);
            });
    }, [castingId]);

    const addSpellLevel = () => {
        if (casting.spellsPerLevel === undefined) {
            setCasting({ ...casting, spellsPerLevel: [0] });            
        }
        else {
            setCasting({ ...casting, spellsPerLevel: [...casting.spellsPerLevel, 0] });
        }
    }

    const saveCasting = () => {
        putCasting(casting).then((data: any) => {
            console.log("Data before set: " , data);
            setCasting(data);
        });
    }

    const handleCantripChange = (event: any) => {
        setCasting({ ...casting, cantripCount: event.target.value });
    }

    /* <span key={index}>{index + 1} : {value} </span> */

    const handlePerLevelChange = (index: number, event: any) => {
        const newSpellsPerLevel = casting.spellsPerLevel?.map((value: number, i: number) => {
            if (i === index) {
                return event.target.value;
            }
            return value;
        });

        setCasting({ ...casting, spellsPerLevel: newSpellsPerLevel });
    }

    return (
        <div>
            <div>
                <h1>Casting Edit</h1>
                <p>Id: { castingId }</p>
                <p>Type: { casting.className }</p>
                <p>Cantrips: { casting.cantripCount }

                <input
                    className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                    value={casting.cantripCount}
                    onChange={(event) => handleCantripChange(event)}
                />


                </p>
                <p>Spells per level: { casting.spellsPerLevel?.map((value: number, index: number) =>
                <div key={index}>
                    <span>Level {index + 1} : </span>
                                    <input
                                    className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                                    value={casting.spellsPerLevel[index]}
                                    onChange={(event) => handlePerLevelChange(index, event)}
                                />
                </div>
                )    
                }</p>
            </div>
            <button onClick={ addSpellLevel } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-stretch mt-4">Add Spell Level</button>
            <button onClick={ saveCasting } className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-stretch mt-4">Save Casting</button>
        </div>
    );
}