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

async function loadGear(id: string): Promise<Response> {
    const res = await fetch('/api/nethys/equipment/gear/' + id, { cache: 'no-store' })
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
            acrobatics: 0,
            arcana: 0,
            athletics: 0,
            crafting: 0,
            deception: 0,
            diplomacy: 0,
            intimidation: 0,
            medicine: 0,
            nature: 0,
            occultism: 0,
            performance: 0,
            religion: 0,
            society: 0,
            stealth: 0,
            survival: 0,
            thievery: 0,
            lore: 0,
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
        languages: [],
        botMe: "",
        loreName: "",
        tradition: "",
        castingAbility: "cha",
        moneyEarned: 0
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

    const [ gear, setGear ] = useState(emptyArray);

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
                        acrobatics: basicInfo2.skills.acrobatics,
                        arcana: basicInfo2.skills.arcana,
                        athletics: basicInfo2.skills.athletics,
                        crafting: basicInfo2.skills.crafting,
                        deception: basicInfo2.skills.deception,
                        diplomacy: basicInfo2.skills.diplomacy,
                        intimidation: basicInfo2.skills.intimidation,
                        medicine: basicInfo2.skills.medicine,
                        nature: basicInfo2.skills.nature,
                        occultism: basicInfo2.skills.occultism,
                        performance: basicInfo2.skills.performance,
                        religion: basicInfo2.skills.religion,
                        society: basicInfo2.skills.society,
                        stealth: basicInfo2.skills.stealth,
                        survival: basicInfo2.skills.survival,
                        thievery: basicInfo2.skills.thievery,
                        lore: basicInfo2.skills.lore,
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
                    muse: basicInfo2.muse,
                    languages: basicInfo2.languages,
                    botMe: basicInfo2.botMe,
                    loreName: basicInfo2.loreName,
                    tradition: basicInfo2.tradition,
                    castingAbility: basicInfo2.castingAbility,
                    moneyEarned: basicInfo2.moneyEarned
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
                                        id: res[i].id + "-2h",
                                        pseudoItem: true
                                    }
                                    myWeapons.push(newWeapon);
                                }
                            }

                            setWeapons(myWeapons);
                        }));
                }
                if (basicInfo2.gearCompact) {
                    console.log("Gear: ", basicInfo2.gearCompact);
                    Promise.all(basicInfo2.gearCompact.map((item: any) => {
                        return loadGear(item.id);
                    })).then((res: any[]) => 
                        Promise.all( 
                            res.map((item: any) => item.json()
                            )
                        ).then((res: any[]) => {
                            console.log("Gear Res: ", res);
                            setGear(res);
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
    const makeMoneyString = (weapons: any[], armor: any[], gear: any[], moneyEarned: number) => {
        const money = {
            cp: 0,
            sp: 0,
            gp: 0,
            pp: 0
        };

        let myMoney = moneyEarned;



        weapons.forEach((weapon: any) => {
            myMoney -= weapon.priceInCopper;
        });




        armor.forEach((armor: any) => {
            myMoney -= armor.priceInCopper;
        });

       
        gear.forEach((gear: any) => {
            myMoney -= gear.pricesInCopper[0];
        });



        /*
       weapons.forEach((weapon: any) => {
            money.cp += weapon.priceInCopper % 10;
            money.sp += ((weapon.priceInCopper / 10) | 0) % 10;
            money.gp += ((weapon.priceInCopper / 100) | 0);
//            money.pp += weapon.cost            
        });

        armor.forEach((armor: any) => {
            money.cp += armor.priceInCopper % 10;
            money.sp += ((armor.priceInCopper / 10) | 0) % 10;
            money.gp += ((armor.priceInCopper / 100) | 0);
            //money.pp += armor.cost.pp;
        });

        gear.forEach((gear: any) => {
            money.cp += gear.pricesInCopper[0] % 10;
            money.sp += ((gear.pricesInCopper[0] / 10) | 0) % 10;
            money.gp += ((gear.pricesInCopper[0] / 100) | 0);
            //money.pp += gear.cost.pp;
        });
*/
        money.cp += myMoney % 10;
        money.sp += ((myMoney / 10) | 0) % 10;
        money.gp += ((myMoney / 100) | 0);


        return "" + money.gp + " gp, " +  money.sp + " sp, " + money.cp + " cp ";
    }

    const calculateBulk = (weapons: any[], armor: any[], gear: any[]) => {
        var bulk :number= 0;
        weapons.forEach((weapon: any) => {
            bulk += weapon.bulk === "L" ? 0.1 : weapon.bulk ? +weapon.bulk : 0;
        });
        armor.forEach((armor: any) => {
            bulk += armor.bulk === "L" ? 0.1 : armor.bulk ? +armor.bulk : 0;
        });
        gear.forEach((gear: any) => {
            bulk += gear.bulks[0] === "L" ? 0.1 : gear.bulks[0] ? +gear.bulks[0] : 0;
        });
        return bulk.toFixed(1);
    }

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

    const skillToStat = ( skill: string ) => {
        switch(skill) {
            case "acrobatics":
                return "dex";
            case "arcana":
                return "int";
            case "athletics":
                return "str";
            case "crafting":
                return "int";
            case "deception":
                return "cha";
            case "diplomacy":
                return "cha";
            case "intimidation":
                return "cha";
            case "medicine":
                return "wis";
            case "nature":
                return "wis";
            case "occultism":
                return "int";
            case "performance":
                return "cha";
            case "religion":
                return "wis";
            case "society":
                return "int";
            case "stealth":
                return "dex";
            case "survival":
                return "wis";
            case "thievery":
                return "dex";
            case "lore":
                return "int";
            case "perception":
                return "wis";
        }
        return "str";
    }

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

    const attributeToBasicInfoAttribute = ( attribute: string ) => {
        switch(attribute) {
            case "str":
                return basicInfo.strength;
            case "dex":
                return basicInfo.dexterity;
            case "con":
                return basicInfo.constitution;
            case "int":
                return basicInfo.intelligence;
            case "wis":
                return basicInfo.wisdom;
            case "cha":
                return basicInfo.charisma;
        }
        return 0;
    };

    const skillNameToBasicInfoSkill = ( skill: string ) => {
        switch(skill) {
            case "acrobatics":
                return basicInfo.skills.acrobatics;
            case "arcana":
                return basicInfo.skills.arcana;
            case "athletics":
                return basicInfo.skills.athletics;
            case "crafting":
                return basicInfo.skills.crafting;
            case "deception":
                return basicInfo.skills.deception;
            case "diplomacy":
                return basicInfo.skills.diplomacy;
            case "intimidation":
                return basicInfo.skills.intimidation;
            case "medicine":
                return basicInfo.skills.medicine;
            case "nature":
                return basicInfo.skills.nature;
            case "occultism":
                return basicInfo.skills.occultism;
            case "performance":
                return basicInfo.skills.performance;
            case "religion":
                return basicInfo.skills.religion;
            case "society":
                return basicInfo.skills.society;
            case "stealth":
                return basicInfo.skills.stealth;
            case "survival":
                return basicInfo.skills.survival;
            case "thievery":
                return basicInfo.skills.thievery;
            case "lore":
                return basicInfo.skills.lore;
            case "perception":
                return basicInfo.skills.perception;
        }
        return 0;
    }

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
<div>
[b]General/Skill Feats[/b] { feats.filter(feat => feat.traits.some((trait:any) => (trait.name === "General") || (trait.name === "Skill"))).map((feat) => <span key={feat.id}>{ feat.name } </span>) }<br></br>
</div>
<div>
[b]Class Features & Abilities[/b] { basicInfo.muse ? basicInfo.muse : "" }
{ feats.filter(feat => feat.traits.some((trait:any) => (trait.name === capitalizeFirstLetter(basicInfo.charClass)))).map((feat) => <span key={feat.id}>, { feat.name } </span>) }
</div>
<div>
[b]Skills[/b] 

{ skillsToStats ? Object.keys(skillsToStats)
.filter((skill) => (skillNameToBasicInfoSkill(skill) - attributeToBasicInfoAttribute(skillToStat(skill)) > 0) && (skill !== "perception"))
.map((skill: string) => <span key={skill}> {capitalizeFirstLetter(skill)} +{skillNameToBasicInfoSkill(skill)} ({calculateTrained(skillNameToBasicInfoSkill(skill), attributeToBasicInfoAttribute(skillToStat(skill)), basicInfo.level)}{skill==="lore"?" (" + basicInfo.loreName + ")":""}),</span>) : "" }

</div>

<div>
[b]Languages[/b] { basicInfo.languages.join(", ") }
</div>
-------------------- <br></br>
[b]Spells[/b]<br></br>

[b]Composition[/b] { spells.filter(spell => spell.traits.some((trait : any) => trait.name === "Composition") && spell.traits.every((trait : any) => trait.name !== "Focus")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]Composition Focus[/b] { spells.filter(spell => spell.traits.some((trait : any) => trait.name === "Composition") && spell.traits.some((trait : any) => trait.name === "Focus")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]Cantrip[/b] { spells.filter(spell => spell.traits.every((trait : any) => trait.name !== "Composition") && spell.traits.some((trait : any) => trait.name === "Cantrip")).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>
[b]1st Level ({casting?.spellsPerLevel[0]}/day)[/b] { spells.filter(spell => spell.traits.every((trait : any) => trait.name !== "Composition") && spell.traits.every((trait : any) => trait.name !== "Cantrip") && spell.level === 1).map((spell: any) => <span key={spell.id}>{spell.name}<br></br></span>) }<br></br>

Spell attack rolls ({basicInfo.tradition}) +{attributeToBasicInfoAttribute(basicInfo.castingAbility) + basicInfo.level + 2} (T)<br></br>
Spell DC ({basicInfo.tradition}) +{attributeToBasicInfoAttribute(basicInfo.castingAbility) + basicInfo.level + 2 + 10} (T)<br></br>
{ /* TODO: Get the trained status from the correct place, not here. */}
-------------------- <br></br>
[b]Special Abilities[/b] <br></br>
<br></br>
{ basicInfo.focusPoints > 0 ? "1 Focus Point. Refocus 10 min." : "" }<br></br>
-------------------- <br></br>
<div>
[b]Gear: [/b] 
{ weapons.filter((weapon: any) => !weapon.pseudoItem).map((weapon: any) => <span key={weapon.id}>{weapon.name}{weapon.purchaseAmount?" ("+weapon.purchaseAmount+")":""}, </span>) }
{ armor.map((armor: any) => <span key={armor.id}>{armor.name}, </span>) }
{ gear.map((gear: any) => <span key={gear.id}>{gear.name}, </span>) }
</div>

{ /*weapons.filter((weapon: any) => !weapon.pseudoItem).map((weapon: any) => <span key={weapon.id}>{weapon.name} {weapon.purchaseAmount?"("+weapon.purchaseAmount+")":""} P: {weapon.priceInCopper} B: {weapon.bulk}</span>) }
{ armor.map((armor: any) => <span key={armor.id}>{armor.name} P: {armor.priceInCopper} B: {armor.bulk}</span>) }
{ gear.map((gear: any) => <span key={gear.id}>{gear.name} P: { gear.pricesInCopper[0] } B: {gear.bulks[0]}</span>) }
{ /* TODO: Make it so that it works correctly for subitems. */}
<br></br>
[b]Money[/b] {makeMoneyString(weapons.filter((weapon: any) => !weapon.pseudoItem), armor, gear, +basicInfo.moneyEarned)}<br></br>
[b]Bulk[/b] {calculateBulk(weapons.filter((weapon: any) => !weapon.pseudoItem), armor, gear) } ({5+basicInfo.strength}/{10+basicInfo.strength})<br></br>
-------------------- <br></br>
[b]Organized Play Notes[/b]<br></br>
<br></br>
{myUser.pfs}-{basicInfo.pfs}<br></br>
Faction: Grand Archive <br></br>
Item: Oil Of Potency<br></br>
[spoiler=Bot me]<br></br>
<pre>
{basicInfo.botMe}<br></br>
</pre>
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

