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

async function loadAncestries() {
    const res = await fetch('/api/nethys/ancestries', { cache: 'no-store' })
    return res;
  }
  
  async function loadHeritageList(par: string): Promise<Response> {
    const res = await fetch('/api/nethys/heritages/' + par, { cache: 'no-store' })
    return res;
  }

  async function loadBackground(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/backgrounds/' + id, { cache: 'no-store' })
    return res;
  }

async function loadAncestry(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/ancestries/' + id, { cache: 'no-store' })
    return res;
}

async function loadArmor(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/equipment/armor/' + id, { cache: 'no-store' })
    return res;
}

async function loadClasses() {
    const res = await fetch('/api/nethys/classes', { cache: 'no-store' })
    return res;
}

async function loadClass(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/classes/' + id, { cache: 'no-store' })
    return res;
}

async function loadWeapon(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/equipment/weapons/' + id, { cache: 'no-store' })
    return res;
}

async function loadFeat(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/feats/' + id, { cache: 'no-store' })
    return res;
}

async function loadSpell(id: string): Promise<Response> {  
    const res = await fetch('/api/nethys/spells/' + id, { cache: 'no-store' })
    return res;
}

export default function Page({ params }: { params: { par: string } }) {
    const emptyArray: any[]  = [];
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
        focusPoints: 0,
        ancestry: 0,
        heritage: 0,
        size: "no size",
        background: 0,
        lowLightVision: false,
        darkVision: false,
        greaterDarkVision: false,
        scent: false,
        tremorsense: false,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        armor: [],
        weapons: [],
        simple: "untrained",
        martial: "untrained",
        feats: [],
        muse: "",
    });  
    const [ casting, setCasting ] = useState({ className: "bard", cantripCount: 0, spellsPerLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

    const [ ancestries, setAncestries ] = useState(emptyArray);
    const [ heritages, setHeritages ] = useState(emptyArray);
    const [ background, setBackground ] = useState({ id: 0, name: "No background", description: "No description" });
    const [ ancestry, setAncestry ] = useState({ id: 0, name: "No ancestry", description: "No description", traits: [] });
    const [ armor, setArmor ] = useState(emptyArray);

    const [ classes, setClasses ] = useState(emptyArray);
    const [ charClass, setCharClass ] = useState({ id: 0, name: "No class", description: "No description", hpPerLevel: 1});

    const [ weapons, setWeapons ] = useState(emptyArray);

    const [ spells, setSpells ] = useState(emptyArray);

    const [ feats, setFeats ] = useState(emptyArray);

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
                    explorationMode: basicInfo2.explorationMode,
                    ancestry: basicInfo2.ancestry,
                    heritage: basicInfo2.heritage,
                    size: basicInfo2.size,
                    background: basicInfo2.background,
                    lowLightVision: basicInfo2.lowLightVision,
                    darkVision: basicInfo2.darkVision,
                    greaterDarkVision: basicInfo2.greaterDarkVision,
                    scent: basicInfo2.scent,
                    tremorsense: basicInfo2.tremorsense,
                    strength: basicInfo2.strength,
                    dexterity: basicInfo2.dexterity,
                    constitution: basicInfo2.constitution,
                    intelligence: basicInfo2.intelligence,
                    wisdom: basicInfo2.wisdom,
                    charisma: basicInfo2.charisma,
                    armor: basicInfo2.armor,
                    weapons: basicInfo2.weapons,
                    simple: basicInfo2.simple,
                    martial: basicInfo2.martial,
                    feats: basicInfo2.feats,
                    spells: basicInfo2.spells,
                    muse: basicInfo2.muse
                };
                setBasicInfo(newBasicInfo);
                loadHeritageList(basicInfo2.ancestry).then((res: any) => {
                    res.json().then((data: any) => {
                        setHeritages(data);
                    });
                });
                if (basicInfo2.background) {
                    loadBackground(basicInfo2.background).then((res: any) => {
                        res.json().then((data: any) => {
                            console.log("Data before set: " , data);
                            setBackground(data);
                        });
                    });
                }
                if (basicInfo2.ancestry) {
                    loadAncestry(basicInfo2.ancestry).then((res: any) => {
                        res.json().then((data: any) => {
                            console.log("Data before set: " , data);
                            setAncestry(data);
                        });
                    });
                }
                if (basicInfo2.armor) {
                    Promise.all(basicInfo2.armor.map((item: string) => {
                        return loadArmor(item);
                    })).then((res: any[]) => 
                        Promise.all( 
                            res.map((item: any) => item.json()
                            )
                        ).then((res: any[]) => {
                            console.log("Res: ", res);
                            setArmor(res);
                        }));

                    //setArmor(basicInfo2.armor);
                }
                if (basicInfo2.weapons) {
                    Promise.all(basicInfo2.weapons.map((item: string) => {
                        return loadWeapon(item);
                    })).then((res: any[]) => 
                        Promise.all( 
                            res.map((item: any) => item.json()
                            )
                        ).then((res: any[]) => {
                            const myWeapons = [
                                ...res
                            ]
                            for (let i = 0; i < res.length; i++) {
                                if (res[i].twoHandedDamage) {
                                    const newWeapon = {
                                        ...res[i],
                                        name: res[i].name + " (2H)",
                                        damage: res[i].twoHandedDamage,
                                        id: res[i].id + "-2h"
                                    }
                                    myWeapons.push(newWeapon);
                                }
                            }

                            setWeapons(myWeapons);
                        }));
                }
                if (basicInfo2.spells) {
                    Promise.all(basicInfo2.spells.map((item: string) => {
                        return loadSpell(item);
                    })).then((res: any[]) => 
                        Promise.all( 
                            res.map((item: any) => item.json()
                            )
                        ).then((res: any[]) => {
                            console.log("Res: ", res);
                            setSpells(res);
                        }));
                }
                if (basicInfo2.feats) {
                    Promise.all(basicInfo2.feats.map((item: string) => {
                        return loadFeat(item);
                    })).then((res: any[]) => 
                        Promise.all( 
                            res.map((item: any) => item.json()
                            )
                        ).then((res: any[]) => {
                            console.log("Res: ", res);
                            setFeats(res);
                        }));
                }

                loadClasses().then((res: any) => {
                    res.json().then((data: any) => {
                        setClasses(data);
                    });
                });
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
            loadAncestries().then((res: any) => {
                res.json().then((data: any) => {
                    setAncestries(data);
                });
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
        return myString ? myString.charAt(0).toUpperCase() + myString.slice(1) : "";
    };

    const getHeritageName = (id: number) => {
        return heritages.find((heritage: any) => heritage.id === id)?.name;
    }
      
    const getAncestryName = (id: number) => {
        return ancestries.find((ancestry: any) => ancestry.id === id)?.name;
      }
      

    const ancestryAndHeritage = (ancestry: number, heritage: number) => {
        if(getHeritageName(heritage)) {
            const heritageName : string = getHeritageName(heritage);
            if (heritageName.includes (getAncestryName(ancestry))) {
                return capitalizeFirstLetter(getHeritageName(heritage));
            }
        }

        return capitalizeFirstLetter(getHeritageName(heritage)) + " " + capitalizeFirstLetter(getAncestryName(ancestry));
    }

    const getClassId = ( name: string ) => {
        return classes.find((item: any) => item.name === capitalizeFirstLetter(name))?.id;
    }

    const getBestArmor= ()  => {
        return armor.reduce((value, item: any) => {
            return item.acBonus > value.acBonus ? item : value;
            }, { acBonus: 0 });      
    }

    const getClass = () => {
        console.log("######## CharClass: ", charClass);  

        if (!charClass.hpPerLevel || charClass.hpPerLevel < 2) {

            const id = getClassId(basicInfo.charClass);
            console.log("ID: ", id);

            loadClass(id).then((res: any) => {
                res.json().then((mychar: any) => setCharClass(mychar));
                
            });
        }

        console.log("CharClass: ", charClass);

        return charClass;
    }

    const getArmorItemBonus = () => {
        /*
        const myArmor = [
            { id: "armor-1", acBonus: 1 },
            { id: "armor-2", acBonus: 2 },
            { id: "armor-3", acBonus: 3 }
        ];*/
        /*
        armor.map((item: any) => {
            console.log("Item: ", item);
        });
        */

        const bestBonus = armor.reduce((value, item: any) => {
            return item.acBonus > value ? item.acBonus : value;
            }, 0);
            

       // const bestBonus = 2;
/*
            const bestBonus = 
            
            Promise.all(armor.map((item: string) => {
                return loadArmor(item);
            })).then((res: any[]) => 
                Promise.all( 
                    res.map((item: any) => item.json()
                    )
                ).then((res: any[]) => {
                    console.log("Res: ", res);
                    return res.reduce((value, item: any) => {
                        const finalvalue = item.acBonus > value ? item.acBonus : value;
                        console.log("Finalvalue: ", finalvalue);
                        return finalvalue;
                    }, 0);
                }));
*/

/*
           Promise.all(armor.map((item: string) => {
                return loadArmor(item);
            })).then((res: any[]) => {
                return Promise.all( 
                res.map((item: any) => {
                    item.json().then((data: any) => {
                    console.log("Data: ", data);
                    return data;
                    });
                )})
            }).then((res: any) => {
                console.log("Res: ", res);
            });
*/

            //console.log("What: ", what);

/*
        const bestBonus = Promise.all(armor.map((item: any) => {
            return loadArmor(item.id);
        })).then((res: any[]) => {
            return res.reduce((value, item: any) => {
                return item.bonus > value ? item.bonus : value;
            }, 0);
        });
*/


/*
        const bestBonus = Promise.all(armor.map((item: any) => {
            return loadArmor(item.id);
        })).then((res: any[]) => {
            return res.reduce((value, item: any) => {
                return item.acBonus > value ? item.acBonus : value;
            }, 0);
        });
/*
        const armorBonus = armorList.reduce((acc, item) => {
            return acc + item.bonus;
        }, 0);*/
        return bestBonus;
    }

    const calculateTrained = (value: number, attributevalue: number, level: number) => {
        const trainValues = ["U", "T", "E", "M", "L"];
        const onlyTraining = value - attributevalue - level;
        return trainValues[onlyTraining / 2];
    }

    const calculateFromTrained = ( trained: string, attributevalue: number) => {
        const trainStrings = ["untrained", "trained", "expert", "master", "legendary"];
     //   const trainValues = ["U", "T", "E", "M", "L"];

        const trainStringIndex = trainStrings.indexOf(trained);

        return (trainStringIndex === 0 ? 0 : basicInfo.level) + attributevalue + trainStringIndex * 2;
        //const onlyTraining = trainValues.indexOf(trained) * 2;
        //return onlyTraining + attributevalue;
    }

    const getTrained = ( category: string ) => {
        if (category === "Simple") {
            return basicInfo.simple;
        }
        if (category === "Martial") {
            return basicInfo.martial;
        }
        return "untrained";
    }

    const letterFromTrained = ( trained: string ) => {
        const trainStrings = ["untrained", "trained", "expert", "master", "legendary"];
        const trainValues = ["U", "T", "E", "M", "L"];

        const trainStringIndex = trainStrings.indexOf(trained);
        return trainValues[trainStringIndex];
    }

    const numberAbbrevs = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

    const skillsToStats = {
        "acrobatics": "dex",
        "arcana": "int",
        "athletics": "str",
        "crafting": "int",
        "deception": "cha",
        "diplomacy": "cha",
        "intimidation": "cha",
        "medicine": "wis",
        "nature": "wis",
        "occultism": "int",
        "performance": "cha",
        "religion": "wis",
        "society": "int",
        "stealth": "dex",
        "survival": "wis",
        "thievery": "dex",
        "lore": "int",
        "perception": "wis"
    };

    const senses = [
        { name: "Low-light vision", key: "lowLightVision" },
        { name: "Darkvision", key: "darkVision" },
        { name: "Greater Darkvision", key: "greaterDarkVision" },
        { name: "Scent", key: "scent" },
        { name: "Tremorsense", key: "tremorsense" }
    ];

    type BasicInfoKey = keyof typeof basicInfo;

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
                    Gender:  [ooc]{ capitalizeFirstLetter( basicInfo.gender ) } { getAncestryName( basicInfo.ancestry ) } { capitalizeFirstLetter( basicInfo.charClass ) } { basicInfo.level }[/ooc] | Speed { basicInfo.speed } ft. | [ooc]AC { basicInfo.ac } [/ooc] | hp { basicInfo.hp }/{ basicInfo.hp } | [ooc]Fort +{ basicInfo.fort } Ref +{ basicInfo.ref } Will +{ basicInfo.will }[/ooc] {" | "} Percep +{ basicInfo.skills.perception }
                </div>
            </div>
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex flex-col items-stretch">
{ capitalizeFirstLetter( basicInfo.gender ) } { ancestryAndHeritage( basicInfo.ancestry, basicInfo.heritage ) }, { background.name }, { capitalizeFirstLetter(basicInfo.charClass)} {basicInfo.level}<br></br>
{ basicInfo.size } { ancestry?.traits.map((trait: any) => (trait.name)).join(" ") }<br></br>
<br></br>
[b]Senses[/b] Perception +{ basicInfo.skills.perception } (Wis {basicInfo.wisdom} + Prof {basicInfo.skills.perception-basicInfo.wisdom} ({calculateTrained(basicInfo.skills.perception, basicInfo.wisdom, basicInfo.level)})) {senses.filter((sense: any) => {const mykey = sense.key as BasicInfoKey; return basicInfo[mykey];}).map(sense => sense.name).join(', ')}<br></br>
-------------------- <br></br>
[b]Defense[/b]<br></br>
-------------------- <br></br>
[b]AC[/b] {basicInfo.ac} (Dex ({basicInfo.dexterity}) +Prof { getBestArmor().category } { basicInfo.ac - 10 - basicInfo.dexterity - getArmorItemBonus() } ({calculateTrained(basicInfo.ac - 10 - getArmorItemBonus(), basicInfo.dexterity, basicInfo.level)}) + item {getArmorItemBonus()})<br></br>
<br></br>
[b]HP[/b] {basicInfo.hp} ( { basicInfo.hp -  charClass.hpPerLevel * basicInfo.level - basicInfo.constitution * basicInfo.level }  {getAncestryName( basicInfo.ancestry)}, { charClass.hpPerLevel * basicInfo.level } {basicInfo.charClass}, { basicInfo.constitution * basicInfo.level } con)<br></br>
[b]Fort[/b] +{basicInfo.fort} ({calculateTrained(basicInfo.fort, basicInfo.constitution, basicInfo.level)}), [b]Ref[/b] +{basicInfo.ref} ({calculateTrained(basicInfo.ref, basicInfo.dexterity, basicInfo.level)}), [b]Will[/b] +{basicInfo.will} ({calculateTrained(basicInfo.will, basicInfo.wisdom, basicInfo.level)})<br></br>
-------------------- <br></br>
[b]Offense[/b]<br></br>
-------------------- <br></br>
{weapons?.filter((weapon: any) => weapon.type === "Melee").map((weapon: any) => <span key={weapon.id}>[b]Melee[/b] {weapon.name} +{ calculateFromTrained(getTrained(weapon.category), basicInfo.strength) } { weapon.damage }+{basicInfo.strength} ({letterFromTrained(getTrained(weapon.category))})<br></br></span>)}<br></br>
{weapons.filter((weapon: any) => weapon.type === "Ranged" && weapon.category !== "Ammunition").map((weapon: any) => <span key={weapon.id}>[b]Ranged[/b] {weapon.name} +{ calculateFromTrained(getTrained(weapon.category), basicInfo.dexterity) } { weapon.damage }+{(basicInfo.strength / 2) | 0} ({letterFromTrained(getTrained(weapon.category))})<br></br></span>)}<br></br>
-------------------- <br></br>
[b]Statistics[/b]<br></br>
-------------------- <br></br>
[b]Str[/b] {basicInfo.strength}, [b]Dex[/b] {basicInfo.dexterity}, [b]Con[/b] {basicInfo.constitution}, [b]Int[/b] {basicInfo.intelligence}, [b]Wis[/b] {basicInfo.wisdom}, [b]Cha[/b] {basicInfo.charisma} <br></br>
[b]Speed[/b] {basicInfo.speed} ft. <br></br>
<div>
[b]Ancestry Feats & Abilities[/b] { getHeritageName(basicInfo.heritage) }{ feats.filter(feat => feat.traits.some((trait:any) => trait.name === getAncestryName(basicInfo.ancestry))).map((feat) => <span key={feat.id}>, { feat.name } </span>) }
</div>
{ /* feat => feat.traits.includes((trait:any) => trait.name !== getAncestryName(basicInfo.ancestry)) */ }
{ getHeritageName(basicInfo.heritage) }
{ feats.filter(feat => feat.traits.some((trait:any) => trait.name === getAncestryName(basicInfo.ancestry))).map((feat) => <span key={feat.id}>Feat: { feat.name } </span>) }<br></br>
[b]General/Skill Feats[/b] Experienced Smuggler, Fascinating Performance, Intimidating Glare, Virtuosic Performer<br></br>
{ feats.filter(feat => feat.traits.some((trait:any) => (trait.name === "General") || (trait.name === "Skill"))).map((feat) => <span key={feat.id}>Feat: { feat.name } </span>) }<br></br>
[b]Class Features & Abilities[/b] Bloodline: Elemental (air), Bard Dedication, Signature Spells, Basic Muse's Whisper: Multifarious Muse (Enigma + Polymath, gain Versatile Performance)<br></br>
{ basicInfo.muse ? basicInfo.muse : "" }<br></br>
{ feats.filter(feat => feat.traits.some((trait:any) => (trait.name === capitalizeFirstLetter(basicInfo.charClass)))).map((feat) => <span key={feat.id}>Feat: { feat.name } </span>) }<br></br>
[b]Skills[/b] Acrobatics +13 (E), Deception +11 (T), Diplomacy +11 (T), Intimidation +11 (T), Lore: Herbalism +9 (T, Pathfinder), Lore: Underworld +9 (T), Nature +8 (T), Occultism +9 (T), Perform +13/+15 dance (E), Stealth +10 (T), Thievery +10 (T)<br></br>
[b]Languages[/b] Common, Elven, Orcish, Bhopan<br></br>
-------------------- <br></br>
[b]Spells[/b]<br></br>
{ true ? spells.map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) : ""}<br></br>

[b]Composition[/b] { spells.filter(spell => spell.traits.some((trait : any) => trait.name === "Composition") && spell.traits.every((trait : any) => trait.name !== "Focus")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]Composition Focus[/b] { spells.filter(spell => spell.traits.some((trait : any) => trait.name === "Composition") && spell.traits.some((trait : any) => trait.name === "Focus")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]Cantrip[/b] { spells.filter(spell => spell.traits.every((trait : any) => trait.name !== "Composition") && spell.traits.some((trait : any) => trait.name === "Cantrip")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]1st Level ({casting?.spellsPerLevel[0]}/day)[/b] { spells.filter(spell => spell.traits.every((trait : any) => trait.name !== "Composition") && spell.traits.every((trait : any) => trait.name !== "Cantrip") && spell.level === 1).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>



Spell attack rolls (primal) +11 (T)<br></br>
Spell DC (primal) 21 (T)<br></br>
[b]Focus:[/b] Elemental toss<br></br>
[b]Cantrips:[/b] Produce flame (air)(BL), Stabilize, Guidance, Tanglefoot, Prestidigitation, Shield (Bard). Mage Hand (Bard)<br></br>
[b]1-Level:[/b] Burning hands (air)(BL)(Signature), Gust of wind, Air Bubble, Feather Fall<br></br>
[b]2-Level:[/b] Resist Energy (BL), Glitterdust, Heal (Signature), Darkness<br></br>
[b]3-Level:[/b] Fireball (air)(BL), Jump (Signature), Earthbind<br></br>
[spoiler=Spell details]<br></br>
Elemental toss<br></br>
range 30<br></br>
attack +11<br></br>
damage 3d8 (+3 with Blood magic)<br></br>
<br></br>
Burning hands [i]Vilinmat[/i]<br></br>
area 15 cone<br></br>
damage<br></br>
1st: 2d6 (+1 with blood magic)<br></br>
2nd: 4d6 (+2 with blood magic)<br></br>
3rd: 6d6 (+3 with blood magic)<br></br>
<br></br>
Gust of wind [i]Alaco[/i]<br></br>
Area 60 line<br></br>
Save Fortitude<br></br>
Crit success no effect<br></br>
Success cannot move against wind<br></br>
Failure Fall prone (flying gets crit failure)<br></br>
Crit failure Pushed 30, fall prone, 2d6 damage<br></br>
<br></br>
Heal<br></br>
Single action touch +1d8/level<br></br>
Double action 30 +1d8+8 / level [i]Envinyata(rahta)[/i]<br></br>
Triple action 30 burst +1d8/level [i]Envinyataliltë[/i]<br></br>
damage same, except for double action +8<br></br>
<br></br>
<br></br>
Produce flame [i]Coronvilin[/i]<br></br>
Range 30<br></br>
attack +10<br></br>
damage 3d4 +4<br></br>
+3d4 persistent damage on crit<br></br>
<br></br>
Glitterdust [i]Tinwëasto[/i]<br></br>
<br></br>
Feather fall [i]Quessë(lanta)[/i]<br></br>
<br></br>
Air bubble [i]Vilyawelvë[/i]<br></br>
<br></br>
Shield [i]Thand[/i]<br></br>
<br></br>
Resist Energy (fire) [i]Nornaur[/i]<br></br>
<br></br>
Guidance [i]Hilyani[/i]<br></br>
<br></br>
[/spoiler]<br></br>
-------------------- <br></br>
[b]Special Abilities[/b] <br></br>
<br></br>
1 Focus Point. Refocus 10 min (doing anything, unlike most other classes) or morning prep.<br></br>
Blood magic: After casting Bloodline spell (BL) or Focus spell, +1 per spell level extra damage, or +1 status bonus to intimidation for 1 round.<br></br>
-------------------- <br></br>
[b]Gear:[/b] Adventurer's pack 2 (7s), Fine clothes 0,1 (2g), Religious symbol, silver (Desna, fan) 0,1 (2g), Dagger 0,1 (2sp), Sheath - (1cp), Thieves' tools 0,1, Dancing Scarf, Wand of Mage Armor, Radiant Wayfinder with custom lid 'Lindevaile Tindome', Disguise Kit 0,1, Scrolls of Fleet Step, Jump, Hat of Disguise, 5 lesser elixirs of darkvision, Boots of Elvenkind 0,1<br></br>
<br></br>
[b]Money[/b] 71g 8s 3c<br></br>
[b]Bulk[/b] 2,6 (5/10)<br></br>
-------------------- <br></br>
[b]Organized Play Notes[/b]<br></br>
<br></br>
97350-2001<br></br>
<br></br>
Faction: Radiant Oath <br></br>
Training: Spells<br></br>
<br></br>
Scroll: Restoration<br></br>
Lore: Herbalism<br></br>
<br></br>
[spoiler=Spell action costs]<br></br>
S=Somatic<br></br>
V=Verbal<br></br>
M=Material<br></br>
<br></br>
Focus: <br></br>
S Elemental toss <br></br>
<br></br>
Cantrips: <br></br>
SV Produce flame (air)(BL)<br></br>
SV Stabilize<br></br>
V Guidance<br></br>
SV Tanglefoot<br></br>
SV Prestidigitation<br></br>
SV Mage Hand<br></br>
V Shield<br></br>
<br></br>
1-Level: <br></br>
SV Burning hands (air)(BL)<br></br>
SV Gust of wind<br></br>
V react Air bubble<br></br>
V react Feather Fall<br></br>
<br></br>
2-Level: <br></br>
SV Glitterdust<br></br>
SV Resist Energy<br></br>
S, SV, SVM Heal<br></br>
[/spoiler]<br></br>
<br></br>
[spoiler=Bot me]<br></br>
◆◆ [b][[/b]ooc]Produce Flame (air)[/ooc] [dice=Attack]1d20 + 11[/dice] [dice=Damage (bludgeon)]3d4 + 4[/dice]<br></br>
◆ [b][[/b]ooc]Elemental toss (air)[/ooc] [dice=Attack]1d20 + 11[/dice] [dice=Damage (bludgeon)]3d8 + 3[/dice]<br></br>
◆◆◆ [b][[/b]ooc]Heal 3 action[/ooc] [dice=Damage]3d8[/dice]<br></br>
◆◆ [b][[/b]ooc]Heal 2 action[/ooc] [dice=Damage]3d8 + 24[/dice]<br></br>
◆◆ [b][[/b]ooc]Burning hands (air)[/ooc] [dice=Damage (bludgeon)]6d6 + 3[/dice] [b][[/b]ooc]DC 21 Reflex[/ooc]<br></br>
◆◆ [b][[/b]ooc]Gust of Wind[/ooc] [dice=Damage (bludgeon)]2d6[/dice] [b][[/b]ooc]DC 21 Fortitude[/ooc]<br></br>
◆◆ [b][[/b]ooc]Glitterdust[/ooc][[/b]ooc]DC 21 Reflex[/ooc]<br></br>
◆ [dice=Demoralize (Versatile Performance)]1d20 + 15[/dice]<br></br>
<br></br>
Priority:<br></br>
<br></br>
Heal anyone in danger of dropping or dying.<br></br>
<br></br>
Use Gust of Wind for control in tight spaces or against flying enemies. Tanglefoot if it will help. Glitterdust for invisible.<br></br>
<br></br>
Use damage spells, burning hands if it would hit several targets or produce flame for single target. Heal against undead. Elemental toss if need to move a lot or after burning hands as it doesn't trigger multiattack penalty. [b]Remember that blood magic gives +1/spell level to damage (not to heal)[/b]<br></br>
<br></br>
For leftover actions, shield, guidance, demoralize (with intimidating glare can affect even if no common language), or even fascinating performance if it would disturb enemy's concentration.<br></br>
<br></br>
[b]Remember to save people with feather fall / air bubble reactions.[/b]<br></br>
[/spoiler]<br></br>
<br></br>
[spoiler=PbP icons]<br></br>
Resource &gt; [url="https://docs.google.com/presentation/d/1o6rq-I_km2yJVjcqzlPJ1FyLAaX-hdzqI3jO5cKMw9I/edit#slide=id.g7160ec8a46_0_49"](GM Numbat's) Org Play PbP intro[/url]<br></br>
Action Symbols &gt; Single (◆), Double (◆◆), Triple (◆◆◆), Free (◇), Reaction (↺)<br></br>
Status Symbols &gt; ♥️ hit points, ☘️ hero points, ✋ held items, ⚕ status conditions<br></br>
[/spoiler]<br></br>
            </div>
        </div>

        <div>
          Footer?
        </div>

      </main>
    );
}

