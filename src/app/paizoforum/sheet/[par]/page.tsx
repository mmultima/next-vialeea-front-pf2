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

async function getCasting( id: string ) {
    const res = await fetch('http://localhost:3000/api/castings/' + id , { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    return data;
}

export default function Page({ params }: { params: { par: string } }) {
    const [ myUser, setMyUser ] = useState({ id: 1, name: "Bob", pfs: "100387" });
    const [ myCharacter, setMyCharacter ] = useState({ name: "Ulvard", pfs: "2004", class: "Barbarian", level: 2, faction: "Envoy's Allience", xp: "normal" });
    const [ basicInfo, setBasicInfo ] = useState({ 
        charClass: "sorcerer", 
        level: 1, 
        pfs: 123, 
        faction: "No faction", 
        xpProgression: "no progress", 
        race: "no race",
        gender: "no gender",
        speed: 10,
        ac: 10,
        hp: 10,
        fort: 0,
        ref: 0,
        will: 0,
        perception: 0,
        skills: {
            perception: 0
        },
        explorationMode: "no mode",
        focusPoints: 0
    });  
    const [ casting, setCasting ] = useState({ className: "bard", cantripCount: 0, spellsPerLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

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
                    xpProgression: basicInfo2.xpProgression,
                    race: basicInfo2.race,
                    gender: basicInfo2.gender,
                    speed: basicInfo2.speed,
                    ac: basicInfo2.ac,
                    hp: basicInfo2.hp,
                    fort: basicInfo2.fort,
                    ref: basicInfo2.ref,
                    will: basicInfo2.will,
                    skills: {
                        ...basicInfo.skills,
                        perception: basicInfo2.skills.perception
                    },
                    focusPoints: basicInfo2.focusPoints,
                    explorationMode: basicInfo2.explorationMode
                };
                setBasicInfo(newBasicInfo);
            });
            if (character.castingIdString) {
                getCasting(character.castingIdString).then((casting2: any) => {
                    console.log("Data before set: " , casting);
                    const newCasting = {
                        ...casting,
                        className: casting2.className,
                        cantripCount: casting2.cantripCount,
                        spellsPerLevel: casting2.spellsPerLevel
                    };
                    setCasting(newCasting);
                });
            }
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

    const numberAbbrevs = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

    return (
        <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="p-1">
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex flex-col items-stretch">
                <div className="p-2">
                    Status line, entered to fields: 
                </div>
                <div className="p-2">
                    Race: [ooc]Focus {basicInfo.focusPoints}/{basicInfo.focusPoints}[/ooc] | Spells: {
                        casting?.spellsPerLevel?.map((value: number, index: number) =>
                        <span key={index}>{numberAbbrevs[index + 1]} : {value}/{value} </span>
                    )} {" "
                    } Hero: 1 |
                </div>
                <div className="p-2">
                    Class/Levels: [ooc]Conditions: none | Exploration: { basicInfo.explorationMode } [/ooc]
                </div>
                <div className="p-2">
                    Gender:  [ooc]{ capitalizeFirstLetter( basicInfo.gender ) } { capitalizeFirstLetter( basicInfo.race ) } { capitalizeFirstLetter( basicInfo.charClass ) } { basicInfo.level }[/ooc] | Speed { basicInfo.speed } ft. | [ooc]AC { basicInfo.ac } [/ooc] | hp { basicInfo.hp }/{ basicInfo.hp } | [ooc]Fort +{ basicInfo.fort } Ref +{ basicInfo.ref } Will +{ basicInfo.will }[/ooc] {" | "} Percep +{ basicInfo.skills.perception }
                </div>
            </div>
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

