'use client';

import { get } from "http";
import { use, useEffect, useState } from "react";

async function getUser( id: string ) {
    const res = await fetch('http://localhost:3000/api/user/' + id , { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    console.log("Data: " , data);

    return data;
}

async function getCharacter( id: string ) {
    const res = await fetch('http://localhost:3000/api/character/' + id , { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    console.log("Data: " , data);

    return data;
}

async function getBasicInfo( id: string ) {
    const res = await fetch('http://localhost:3000/api/basicinfo/' + id , { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    console.log("Data: " , data);

    return data;
}

export default function Page({ params }: { params: { par: string } }) {
    const [ myUser, setMyUser ] = useState({ id: 1, name: "Bob", pfs: "100387" });
    const [ myCharacter, setMyCharacter ] = useState({ name: "Ulvard", pfs: "2004", class: "Barbarian", level: 2, faction: "Envoy's Allience", xp: "normal" });
    const [ basicInfo, setBasicInfo ] = useState({ charClass: "sorcerer", level: 1, pfs: 123, faction: "No faction", xpProgression: "no progress" });  

    //const myUser = { id: 1, name: "Bob", pfs: "100387" };
    //const myCharacter = { name: "Ulvard", pfs: "2004", class: "Barbarian", level: 2, faction: "Envoy's Allience", xp: "normal" };

    useEffect(() => {
        getCharacter(params.par).then((character: any) => {
            console.log("Data before set: " , character);
            const newCharacter = {
                ...myCharacter,
                name: character.name,
                class: character.class,
                level: character.level,
                user: character.user
            }
            setMyCharacter(newCharacter);
            getBasicInfo(character.basicInfoId).then((basicInfo2: any) => {
                console.log("Data before set: " , basicInfo);
                const newBasicInfo = {
                    ...basicInfo,
                    charClass: basicInfo2.charClass,
                    level: basicInfo2.level,
                    pfs: basicInfo2.pfs,
                    faction: basicInfo2.faction,
                    xpProgression: basicInfo2.xpProgression
                };
                setBasicInfo(newBasicInfo);
            });

            getUser(newCharacter.user).then((user: any) => {
                console.log("Data before set: " , user);
                const newUser = {
                    ...myUser,
                    name: user.name,
                }
                setMyUser(user);
            });
        });
    }, []);


    /*
    Player Name: B Viggers
Character Name: Ulvard
PFS# for this character: 100387-2004
Class: Barbarian
Level: 2
Faction: Envoy's Allience
XP Progression (slow/normal): normal
*/

    const capitalizeFirstLetter = (myString : string) => {
        return myString.charAt(0).toUpperCase() + myString.slice(1);
    };

    return (
        <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="p-1">
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex flex-col items-stretch">
                <div className="p-2">
                    [b]Player Name:[/b] { myUser.name }
                </div>
                <div className="p-2">
                    [b]Character Name:[/b] { myCharacter.name }
                </div>
                <div className="p-2">
                    [b]PFS# for this character:[/b] { myUser.pfs }-{ basicInfo.pfs }
                </div>
                <div className="p-2">
                    [b]Class:[/b] { capitalizeFirstLetter( basicInfo.charClass ) }
                </div>
                <div className="p-2">
                    [b]Level:[/b] { basicInfo.level }
                </div>
                <div className="p-2">
                    [b]Faction:[/b] { basicInfo.faction }
                </div>
                <div className="p-2">
                    [b]XP Progression (slow/normal):[/b] { basicInfo.xpProgression }
                </div>
            </div>
        </div>

        <div>
          Footer?
        </div>

      </main>
    );
}

