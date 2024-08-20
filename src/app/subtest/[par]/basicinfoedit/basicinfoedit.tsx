import { get } from 'http';
import Image from 'next/image';
import { Key, MouseEvent, useEffect, useRef, useState } from 'react';


//import DialogTitle from '@mui/material/DialogTitle';
//import Dialog from '@mui/material/Dialog';

interface Props {
  name: string;
  image: string;
  colour: string;
  basicInfo: any;
  handleChangeInfo: Function;
}

/*
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}


function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
}
      */

async function  putData(id: string, data: string) {
  const res = await fetch('/api/basicinfo/' + id, { 
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const resdata = await  res.json()

  console.log("P Response: ", resdata);
}

async function loadFeat(id: string) {
  const res = await fetch('/api/nethys/feats/' + id, { cache: 'no-store' })
  return res;
}

async function loadWeapon(id: string) {
  const res = await fetch('/api/nethys/equipment/weapons/' + id, { cache: 'no-store' })
  return res;
}

async function loadArmor(id: string) {
  const res = await fetch('/api/nethys/equipment/armor/' + id, { cache: 'no-store' })
  return res;
}

async function loadGear(id: string) {
  const res = await fetch('/api/nethys/equipment/gear/' + id, { cache: 'no-store' })
  return res;
}

async function loadSpell(id: string) {
  const res = await fetch('/api/nethys/spells/' + id, { cache: 'no-store' })
  return res;
}

async function loadFeatList(trait: string) {
  const res = await fetch('/api/nethys/featlist/' + trait, { cache: 'no-store' })
  return res;
}

export default function BasicInfoEdit({ name, image, colour, basicInfo, handleChangeInfo } : Props) {
    console.log("Class: ", basicInfo.charClass);

    const emptyArray: any[]  = [];
    //console.log("Name: " + name);
    // React / Next doesn't like 'null' as data, but "" gives an empty element.
    const [charClass, setCharClass] = useState(basicInfo.charClass);
    const [level, setLevel] = useState(basicInfo.level);
    const [fort, setFort] = useState(basicInfo.fort);
    const [will, setWill] = useState(basicInfo.will);
    const [ref, setRef] = useState(basicInfo.ref);
    const [AC, setAc] = useState(basicInfo.AC);
    const [HP, setHp] = useState(basicInfo.HP);
    const [race, setRace] = useState(basicInfo.race);
    const [gender, setGender] = useState(basicInfo.gender);
    
    const [strength, setStrength] = useState(basicInfo.strength);
    
    const [dexterity, setDexterity] = useState(basicInfo.dexterity);
    const [constitution, setConstitution] = useState(basicInfo.constitution);
    const [intelligence, setIntelligence] = useState(basicInfo.intelligence);
    const [wisdom, setWisdom] = useState(basicInfo.wisdom);
    const [charisma, setCharisma] = useState(basicInfo.charisma);

    const [feats, setFeats] = useState(emptyArray);

    const [open, setOpen] = useState(emptyArray);

    const [featList, setFeatList] = useState(emptyArray);

    if (!colour) {
      colour = "";
    }

    if (!image) {
      image = "";
    }

    //const charClass = "sorcerer";
    /*

    const level = 1;
    const fort = 5;
    const will = 4;
    const ref = 6;
    const AC = 17;
    const HP = 14;
    const race = "elf";
    const gender = "Female";
*/

    const handleStrengthChange = (event: any) => {
      setStrength(event.target.value);
      const changedInfo = {
        ...basicInfo,
        strength: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleDexterityChange = (event: any) => {
      setDexterity(event.target.value);
      const changedInfo = {
        ...basicInfo,
        dexterity: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleConstitutionChange = (event: any) => {
      setConstitution(event.target.value);
      const changedInfo = {
        ...basicInfo,
        constitution: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleIntelligenceChange = (event: any) => {
      setIntelligence(event.target.value);
      const changedInfo = {
        ...basicInfo,
        intelligence: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleWisdomChange = (event: any) => {
      setWisdom(event.target.value);
      const changedInfo = {
        ...basicInfo,
        wisdom: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleCharismaChange = (event: any) => {
      setCharisma(event.target.value);
      const changedInfo = {
        ...basicInfo,
        charisma: event.target.value
      };

      handleChangeInfo(changedInfo);
    }

    const handleCharClassChange = (event: any) => {
        setCharClass(event.target.value);
        const changedInfo = {
          ...basicInfo,
          charClass: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleLevelChange = (event: any) => {
        setLevel(event.target.value);

        const changedInfo = {
          ...basicInfo,
          level: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleFortChange = (event: any) => {
        setFort(event.target.value);
        const changedInfo = {
          ...basicInfo,
          fort: event.target.value
        };

        handleChangeInfo(changedInfo);

    }
    const handleWillChange = (event: any) => {
        setWill(event.target.value);
        const changedInfo = {
          ...basicInfo,
          will: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleRefChange = (event: any) => {
        setRef(event.target.value);
        const changedInfo = {
          ...basicInfo,
          ref: event.target.value
        };

        handleChangeInfo(changedInfo);
    }


    //TODO: Fix AC and HP

    const handleAcChange = (event: any) => {
        setAc(event.target.value);
        const changedInfo = {
          ...basicInfo,
          ac: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleHpChange = (event: any) => {
        setHp(event.target.value);
        const changedInfo = {
          ...basicInfo,
          hp: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleRaceChange = (event: any) => {
        setRace(event.target.value);
        const changedInfo = {
          ...basicInfo,
          race: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleGenderChange = (event: any) => {
        setGender(event.target.value);
        const changedInfo = {
          ...basicInfo,
          gender: event.target.value
        };

        handleChangeInfo(changedInfo);
    }

    const classText = "m-1 border-solid border-4 hover:border-red-600 rounded-full " + colour;


    const buttonClick = (event: any) => {
      event.preventDefault();
      console.log("BasicInfo: ", basicInfo);

      //basicInfo.id = "1";

      putData(basicInfo.id, JSON.stringify(basicInfo));
      //putData(newCharacter.id, JSON.stringify(newCharacter));
    };
    

    //console.log(classText);

    /*<div className="border-solid border-4 border-indigo-600 hover:border-red-600 rounded-lg flex items-center">*/ 
/*   <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-center">*/

//const [feats, setFeats] = useState<string[]>(['']);


//TODO: How to load feats from the server? How to wait for basicInfo to be loaded?
/*
useEffect(() => {
  console.log("BasicInfo before: ", basicInfo);
  const newFeats = basicInfo.feats;
  const newFeats2 = [...feats];
  newFeats.forEach((feat: number) => {
    loadFeat("" + feat).then((res) => {  
      res.json().then
      ((data) => {
        //parseInt(event.target.value)  
        newFeats2[data.id] = data;
        console.log("DATA: ", data);
        setFeats(newFeats2);
      });
    });
  });
  console.log("BasicInfo after: ", basicInfo);
}, []);
*/

const initialLoad = useRef(true);

useEffect(() => {
  if (initialLoad.current && basicInfo.feats && basicInfo.feats.length > 0) {
    initialLoad.current = false;
    console.log("BasicInfo before: ", basicInfo);
    const newFeats = basicInfo.feats;
    const newFeats2 = [...feats];
    /*
    newFeats.forEach((feat: number) => {
      loadFeat("" + feat).then((res) => {  
        res.json().then((data) => {
          newFeats2[data.id] = data;
          console.log("DATA: ", data);
          setFeats(newFeats2);
        });
      });
    });
*/
    const newWeapons = basicInfo.weapons;
    const newWeapons2 = [...weapons]; 

    const newArmor = basicInfo.armor;
    const newArmor2 = [...armor];


    Promise.all(newFeats.map((feat: number) => 
      loadFeat("" + feat).then(res => res.json())
    )).then(dataArray => {
      dataArray.forEach(data => {
        newFeats2[data.id] = data;
      });
      console.log("DATA: ", dataArray);
      setFeats(() => newFeats2);
    });

    if (newWeapons) {
    Promise.all(newWeapons.map((weapon: number) =>
      loadWeapon("" + weapon).then(res => res.json())
    )).then(dataArray => {
      dataArray.forEach(data => {
        newWeapons2[data.id] = data;
      });
      console.log("DATA: ", dataArray);
      setWeapons(() => newWeapons2);
    });
  }

  if (newArmor) {
    Promise.all(newArmor.map((armorItem: number) =>
      loadArmor("" + armorItem).then(res => res.json())
    )).then(dataArray => {
      dataArray.forEach(data => {
        newArmor2[data.id] = data;
      });
      console.log("DATA: ", dataArray);
      setArmor(() => newArmor2);
    });
  }

    const newGear = basicInfo.gear;
    const newGear2 = [...gear];

    if (newGear) {
    Promise.all(newGear.map((gearItem: number) =>
      loadGear("" + gearItem).then(res => res.json())
    )).then(dataArray => {
      dataArray.forEach(data => {
        newGear2[data.id] = data;
      });
      console.log("DATA: ", dataArray);
      setGear(() => newGear2);
    });
  }

    const newSpells = basicInfo.spells;
    const newSpells2 = [...spells];

    if (newSpells) {
    Promise.all(newSpells.map((spell: number) =>
      loadSpell("" + spell).then(res => res.json())
    )).then(dataArray => {
      dataArray.forEach(data => {
        newSpells2[data.id] = data;
      });
      console.log("DATA: ", dataArray);
      setSpells(() => newSpells2);
    });
  }

    console.log("BasicInfo after: ", basicInfo);
  }
}, [basicInfo]);

const handleFeatChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("BasicInfo before: ", basicInfo);
  const newFeats = [...basicInfo.feats];
  newFeats[index] = event.target.value;
  const newFeats2 = [...feats];
  //newFeats2[index] = "";
  //newFeats2[]
  //setFeats(newFeats2);
  //setFeats(newFeats)

  loadFeat(event.target.value).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newFeats2[data.id] = data;
      console.log("DATA: ", data);
      setFeats(newFeats2);
    });
  });

  const changedInfo = {
    ...basicInfo,
    feats: newFeats
  };
  handleChangeInfo(changedInfo);
  console.log("BasicInfo after: ", basicInfo);

};

const addNewFeat = () => {
  console.log("BasicInfo: ", basicInfo);
  //setFeats([...feats, '']);
  const changedInfo = {
    ...basicInfo,
    feats: [...basicInfo.feats, '']
  };
  handleChangeInfo(changedInfo);
  console.log("BasicInfo after: ", basicInfo);
};

//const [weapons, setWeapons] = useState<string[]>(['']);
const [weapons, setWeapons] = useState(emptyArray);

//emptyArray
const handleWeaponChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const newWeapons = [...basicInfo.weapons];
  newWeapons[index] = event.target.value;
  const newWeapons2 = [...weapons];
  //setWeapons(newWeapons);

  loadWeapon(event.target.value).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newWeapons2[data.id] = data;
      console.log("DATA: ", data);
      setWeapons(newWeapons2);
    });
  });

  const changedInfo = {
    ...basicInfo,
    weapons: newWeapons
  };
  handleChangeInfo(changedInfo);
};

const addNewWeapon = () => {
  const changedInfo = {
    ...basicInfo,
    weapons: basicInfo.weapons ? [...basicInfo.weapons, ''] : ['']
  };
  handleChangeInfo(changedInfo);
};

const [armor, setArmor] = useState(emptyArray);

const handleArmorChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const newArmor = [...basicInfo.armor];
  newArmor[index] = event.target.value;
  const newArmor2 = [...armor];

  loadArmor(event.target.value).then((res) => {  
    res.json().then
    ((data) => {
      newArmor2[data.id] = data;
      console.log("DATA: ", data);
      setArmor(newArmor2);
    });
  });

  const changedInfo = {
    ...basicInfo,
    armor: newArmor
  };
  handleChangeInfo(changedInfo);
};

const addNewArmor = () => {
  const changedInfo = {
    ...basicInfo,
    armor: basicInfo.armor ? [...basicInfo.armor, ''] : ['']
  };
  handleChangeInfo(changedInfo);
};

const [spells, setSpells] = useState(emptyArray);

const handleSpellChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const newSpells = [...basicInfo.spells];
  newSpells[index] = event.target.value;
  const newSpells2 = [...spells];

  loadSpell(event.target.value).then((res) => {  
    res.json().then
    ((data) => {
      newSpells2[data.id] = data;
      console.log("DATA: ", data);
      setSpells(newSpells2);
    });
  });

  const changedInfo = {
    ...basicInfo,
    spells: newSpells
  };
  handleChangeInfo(changedInfo);
};

const addNewSpell = () => {
  const changedInfo = {
    ...basicInfo,
    spells: basicInfo.spells ? [...basicInfo.spells, ''] : ['']
  };
  handleChangeInfo(changedInfo);
};

const [gear, setGear] = useState(emptyArray);

const handleGearChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const newGear = [...basicInfo.gear];
  newGear[index] = event.target.value;
  const newGear2 = [...gear];

  loadGear(event.target.value).then((res) => {  
    res.json().then
    ((data) => {
      newGear2[data.id] = data;
      console.log("DATA: ", data);
      setGear(newGear2);
    });
  });

  const changedInfo = {
    ...basicInfo,
    gear: newGear
  };
  handleChangeInfo(changedInfo);
};

const addNewGear = () => {
  const changedInfo = {
    ...basicInfo,
    gear: basicInfo.gear ? [...basicInfo.gear, ''] : ['']
  };
  handleChangeInfo(changedInfo);
};

const handleSkillChange = (skill: string, event: React.ChangeEvent<HTMLInputElement>) => {
  const changedInfo = {
    ...basicInfo,
    skills: {
      ...basicInfo.skills,
      [skill]: parseInt(event.target.value)
    }
  };
  handleChangeInfo(changedInfo);
}

/*
const handleAttributeChange = (attribute: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  const changedInfo = {
    ...basicInfo,
    [attribute]: event.target.value
  };
  handleChangeInfo(changedInfo);
};
*/
const handleClose = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const newOpen: string[] = new Array(feats.length).fill(null);
  console.log("Close: ", index);
  setOpen(newOpen);
  //console.log("Close: ", index);  
}

const handleOpen = (event: MouseEvent, index: number) => {
  /*
  loadFeatList(feats[index].trait).then((res) => {
    res.json().then((data) => { 
      console.log("Feats for trait " + feats[index].trait +  ": ", data);
      setFeatList(data);
    })
  });
  */

  const newOpen: string[] = new Array(feats.length).fill(null);
  newOpen[index] = "open";
  //newOpen[index] = "open";
  event.preventDefault();
  console.log("Open: ", index);
  setOpen(newOpen);

  //basicInfo.feats[index].trait
  const trait = "Bard";
  loadFeatList(trait).then((res) => {
    res.json().then((data) => { 
      console.log("Feats for trait " + trait +  ": ", data);
      setFeatList(data);
    })
  });
}

const handleChooseFeat = (event: MouseEvent, index: number, feat: any) => {
  event.preventDefault();
  console.log("Choose: ", index);
  console.log("Feat: ", feat);
  const newFeats = [...basicInfo.feats];
  newFeats[index] = feat.id;
  handleChangeInfo({ 
    ...basicInfo,
    feats: newFeats
  });

  //Copied from handleFeatChange
  const newFeats2 = [...feats];
  loadFeat(feat.id).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newFeats2[data.id] = data;
      console.log("DATA: ", data);
      setFeats(newFeats2);
    });
  });
}


    return (
        <div>
      <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch">
        <div> {/*  className="border-solid border-4 border-indigo-600 hover:border-red-600"> */ }
          <Image
            className={ classText }
            src={ image }
            alt="char picture"
            //className="dark:invert"
            width={90}
            height={90}
            priority
          />
        </div>
        <div className="p-1">
          <div>
            <strong>{ name }</strong>
          </div>
          <div>
            {basicInfo.gender} {basicInfo.race} {basicInfo.charClass} {basicInfo.level}
          </div>
          <div>
            <strong>HP</strong> {basicInfo.hp} 
            <strong> AC</strong> {basicInfo.ac} 
            <strong> Fort</strong> +{basicInfo.fort} 
            <strong> Ref</strong> +{basicInfo.ref} 
            <strong> Will</strong> +{basicInfo.will} 
          </div>
        </div>
      </div>
                  <form>
                  <div className="p-3">
                    Class
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.charClass} onChange={ handleCharClassChange }></input>
                  </div>
                  <div className="p-3">
                    Level
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.level} onChange={ handleLevelChange }></input>
                  </div>
                  <div className="p-3">
                    Fort
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.fort} onChange={ handleFortChange }></input>
                  </div>
                  <div className="p-3">
                    Will
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.will} onChange={ handleWillChange }></input>
                  </div>
                  <div className="p-3">
                    Ref
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.ref} onChange={ handleRefChange }></input>
                  </div>
                  <div className="p-3">
                    AC
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.ac} onChange={ handleAcChange }></input>
                  </div>
                  <div className="p-3">
                    HP
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.hp} onChange={ handleHpChange }></input>
                  </div>
                  <div className="p-3">
                    Race
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.race} onChange={ handleRaceChange }></input>
                  </div>
                  <div className="p-3">
                    Gender
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.gender} onChange={ handleGenderChange }></input>
                  </div>
                  <div className="p-3">
          Strength
          <input type="number" className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.strength} onChange={handleStrengthChange}></input>
        </div>
        
        <div className="p-3">
          Dexterity
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.dexterity} onChange={handleDexterityChange }></input>
        </div>
        <div className="p-3">
          Constitution
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.constitution} onChange={handleConstitutionChange}></input>
        </div>
        <div className="p-3">
          Intelligence
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.intelligence} onChange={handleIntelligenceChange}></input>
        </div>
        <div className="p-3">
          Wisdom
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.wisdom} onChange={handleWisdomChange}></input>
        </div>
        <div className="p-3">
          Charisma
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.charisma} onChange={handleCharismaChange}></input>
        </div>                    
        <div className="p-3">
          Acrobatics
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.acrobatics} onChange={(event) => handleSkillChange('acrobatics', event)}></input>
        </div>
        <div className="p-3">
          Arcana
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.arcana} onChange={(event) => handleSkillChange('arcana', event)}></input>
        </div>
        <div className="p-3">
          Athletics
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.athletics} onChange={(event) => handleSkillChange('athletics', event)}></input>
        </div>
        <div className="p-3">
          Crafting
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.crafting} onChange={(event) => handleSkillChange('crafting', event)}></input>
        </div>
        <div className="p-3">
          Deception
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.deception} onChange={(event) => handleSkillChange('deception', event)}></input>
        </div>
        <div className="p-3">
          Diplomacy
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.diplomacy} onChange={(event) => handleSkillChange('diplomacy', event)}></input>
        </div>
        <div className="p-3">
          Intimidation
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.intimidation} onChange={(event) => handleSkillChange('intimidation', event)}></input>
        </div>
        <div className="p-3">
          Lore
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.lore} onChange={(event) => handleSkillChange('lore', event)}></input>
        </div>
        <div className="p-3">
          Medicine
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.medicine} onChange={(event) => handleSkillChange('medicine', event)}></input>
        </div>
        <div className="p-3">
          Nature
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.nature} onChange={(event) => handleSkillChange('nature', event)}></input>
        </div>
        <div className="p-3">
          Occultism
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.occultism} onChange={(event) => handleSkillChange('occultism', event)}></input>
        </div>
        <div className="p-3">
          Performance
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.performance} onChange={(event) => handleSkillChange('performance', event)}></input>
        </div>
        <div className="p-3">
          Religion
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.religion} onChange={(event) => handleSkillChange('religion', event)}></input>
        </div>
        <div className="p-3">
          Society
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.society} onChange={(event) => handleSkillChange('society', event)}></input>
        </div>
        <div className="p-3">
          Stealth
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.stealth} onChange={(event) => handleSkillChange('stealth', event)}></input>
        </div>
        <div className="p-3">
          Survival
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.survival} onChange={(event) => handleSkillChange('survival', event)}></input>
        </div>
        <div className="p-3">
          Thievery
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.thievery} onChange={(event) => handleSkillChange('thievery', event)}></input>
        </div>

                  <div className="p-3 flex justify-end">

                  <div className="p-3">
                      <strong>Feats</strong>
                      {basicInfo.feats?.map((feat: number, index: number) => (
                        <div key={index} className="p-1">
                          <input
                            className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                            value={feat}
                            onChange={(event) => handleFeatChange(index, event)}
                          />
                          {feats[feat]?.name}
                          <button onClick={(event) => handleOpen(event, index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>
{/*                          <SimpleDialog
        selectedValue={1}
        open={open}
        onClose={}
     /> */}
     <dialog open={open[index]}>
  
  {featList?.map((feat: any, index2: number) => (
    <button onClick={(event) => handleChooseFeat(event, index, feat)} key={index2}>{feat.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleClose(event, index)}>OK</button>
  </form>
</dialog>
                        </div>
                      ))}
                    <button type="button" onClick={addNewFeat} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Add Feat
                    </button>
                  </div>                      

      {/* Weapons inputs */}
      <div className="p-3">
        <strong>Weapons</strong>
        {basicInfo.weapons?.map((weapon : number, index : number) => (
          <div key={index} className="p-1">
            <input
              className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
              value={weapon}
              onChange={(event) => handleWeaponChange(index, event)}
            />
            {weapons[weapon]?.name}
          </div>
        ))}
        <button type="button" onClick={addNewWeapon} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Weapon
        </button>
      </div>

      <div className="p-3">
            <strong>Armor</strong>
            {basicInfo.armor?.map((armorItem: number, index:number) => (
              <div key={index} className="p-1">
                <input
                  className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                  value={armorItem}
                  onChange={(event) => handleArmorChange(index, event)}
                />
                {armor[armorItem]?.name}
              </div>
            ))}
            <button type="button" onClick={addNewArmor} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Armor
            </button>
          </div>


      {/* Gear inputs */}
      <div className="p-3">
        <strong>Gear</strong>
        {basicInfo.gear?.map((gearItem: number, index: number) => (
          <div key={index} className="p-1">
            <input
              className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
              value={gearItem}
              onChange={(event) => handleGearChange(index, event)}
            />
            {gear[gearItem]?.name}
          </div>
        ))}
        <button type="button" onClick={addNewGear} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Gear
        </button>
      </div>

      {/* Spells inputs */}
      <div className="p-3">
        <strong>Spells</strong>
        {basicInfo.spells?.map((spell: number, index: number) => (
          <div key={index} className="p-1">
            <input
              className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
              value={spell}
              onChange={(event) => handleSpellChange(index, event)}
            />
            {spells[spell]?.name}
          </div>
        ))}
        <button type="button" onClick={addNewSpell} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Spell
        </button>
      </div>


                <button onClick={buttonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Button
                </button>
              </div>


                  </form>
        </div>
    );
}
