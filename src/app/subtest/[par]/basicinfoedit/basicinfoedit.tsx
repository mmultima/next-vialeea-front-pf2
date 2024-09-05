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

async function loadWeaponList(par: string) {
  const res = await fetch('/api/nethys/weaponlist/' + par, { cache: 'no-store' })
  return res;
}

async function loadArmorList(par: string) {
  const res = await fetch('/api/nethys/armorlist/' + par, { cache: 'no-store' })
  return res;
}

async function loadGearList(par: string) {
  const res = await fetch('/api/nethys/gearlist', { cache: 'no-store' })
  return res;
}

async function loadAncestries() {
  const res = await fetch('/api/nethys/ancestries', { cache: 'no-store' })
  return res;
}

async function loadHeritageList(par: string): Promise<Response> {
  const res = await fetch('/api/nethys/heritages/' + par, { cache: 'no-store' })
  return res;
}

async function loadBackgroundList(): Promise<Response> {
  const res = await fetch('/api/nethys/backgrounds', { cache: 'no-store' })
  return res;
}

async function loadBackground(id: string): Promise<Response> {
  const res = await fetch('/api/nethys/backgrounds/' + id, { cache: 'no-store' })
  return res;
}

async function loadSpellList(traits: string[], Level: number, tradition? : string): Promise<Response> {
  //http://localhost:3000/api/nethys/spells?Trait=focus&Trait=bard&Level=1
  const trad = tradition ? "&tradition=" + tradition : "";

  console.log("Traits: ", traits);

  const res = await fetch('/api/nethys/spells?' + traits.map(trait => "Trait=" + trait ).join("&") + "&level=" + Level + trad, { cache: 'no-store' })
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
    const [openWeapon, setOpenWeapon] = useState(emptyArray);
    const [openArmor, setOpenArmor] = useState(emptyArray);
    const [openGear, setOpenGear] = useState(emptyArray);

    const [featList, setFeatList] = useState(emptyArray);
    const [weaponList, setWeaponList] = useState(emptyArray);
    const [armorList, setArmorList] = useState(emptyArray);
    const [gearList, setGearList] = useState(emptyArray);
    const [spellList, setSpellList] = useState(emptyArray);

    const [openAncestry, setOpenAncestry] = useState(false);
    const [openHeritage, setOpenHeritage] = useState(false);
    const [ancestries, setAncestries] = useState(emptyArray);
    const [heritages, setHeritages] = useState(emptyArray);
    const [openBackground, setOpenBackground] = useState(false);
    const [backgroundList, setBackgroundList] = useState(emptyArray); //OOps, the naming is here wrong, it should be backgrounds.
    const [backgrounds, setBackgrounds] = useState(emptyArray); //OOps, the naming is here wrong, it should be backgroundsList.

    const [openSpell, setOpenSpell] = useState(emptyArray);

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

    const newGear = basicInfo.gearCompact;
    const newGear2 = [...gear];

    if (newGear) {
    Promise.all(newGear.map((gearItem: any) =>
      loadGear("" + gearItem.id).then(res => res.json())
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

    if (basicInfo.ancestry) {
      loadHeritages(basicInfo.ancestry);
    }

    if (basicInfo.background) {
      loadBackground(basicInfo.background).then((res) => {
        res.json().then((data) => { 
          console.log("Background: ", data);

          const newBackgrounds2 = backgroundList;
          newBackgrounds2[data.id] = data;
          
          //console.log("DATA: ", dataArray);
          setBackgroundList(newBackgrounds2);


        })
      });
    }
  }

  loadAncestries().then((res) => {
    res.json().then((data) => { 
      console.log("Ancestries: ", data);
      setAncestries(data);
    })
  });

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
    gearCompact: basicInfo.gearCompact ? [...basicInfo.gearCompact, ''] : ['']
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

const handlePfsChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    pfs: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleFactionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    faction: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleXpProgressionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    xpProgression: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleSpeedChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    speed: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleExplorationModeChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    explorationMode: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleFocusPointsChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    focusPoints: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleSizeChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    size: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleAncestryChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    ancestry: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleHeritageChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    heritage: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const loadHeritages = (par: string) => {
  loadHeritageList(par).then((res) => {
    res.json().then((data) => { 
      console.log("Heritages for ancestry " + par +  ": ", data);
      setHeritages(data);
    })
  });
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

  //TODO: The length should be taken from basicInfo.feats?

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

const switchFeatListType = (event: MouseEvent, trait: string) => {
  event.preventDefault();
  console.log("Trait: ", trait);
  loadFeatList(trait).then((res) => {
    res.json().then((data) => { 
      console.log("Feats for trait " + trait +  ": ", data);
      setFeatList(data);
    })
  });
}

const categoryList = [
  "simple",
  "martial",
  "advanced",
  "ammunition"
];

const handleOpenArmor = (event: MouseEvent, index: number) => {

  const newOpen: string[] = new Array(basicInfo.equipment?.armor?.length).fill(null);
  newOpen[index] = "open";
  //newOpen[index] = "open";
  event.preventDefault();
  console.log("Open: ", index);
  setOpenArmor(newOpen);

  //basicInfo.feats[index].trait
  const trait = "unarmored";
  loadArmorList(trait).then((res) => {
    res.json().then((data) => { 
      console.log("Armor for trait " + trait +  ": ", data);
      setArmorList(data);
    })
  });
}

const handleCloseArmor = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const newOpen: string[] = new Array(basicInfo.equipment?.armor?.length).fill(null);
  console.log("Close: ", index);
  setOpenArmor(newOpen);
  //console.log("Close: ", index);  
}

const handleChooseArmor = (event: MouseEvent, index: number, onearmor: any) => {
  event.preventDefault();
  console.log("Choose: ", index);
  console.log("Armor: ", onearmor);
  const newArmor = [...basicInfo.armor];
  newArmor[index] = onearmor.id;
  handleChangeInfo({ 
    ...basicInfo,
    armor: newArmor
  });

  //Copied from handleFeatChange
  const newArmor2 = [...armor];
  loadArmor(onearmor.id).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newArmor2[data.id] = data;
      console.log("DATA: ", data);
      setArmor(newArmor2);
    });
  });
}

const switchArmorListType = (event: MouseEvent, category: string) => {
  event.preventDefault();
  console.log("category: ", category);
  loadArmorList(category).then((res) => {
    res.json().then((data) => { 
      console.log("Armor for category " + category +  ": ", data);
      setArmorList(data);
    })
  });
}

const armorCategoryList = [
  "unarmored",
  "light",
  "medium",
  "heavy"
];

const handleOpenWeapon = (event: MouseEvent, index: number) => {

  const newOpen: string[] = new Array(basicInfo.equipment?.weapons?.length).fill(null);
  newOpen[index] = "open";
  //newOpen[index] = "open";
  event.preventDefault();
  console.log("Open: ", index);
  setOpenWeapon(newOpen);

  //basicInfo.feats[index].trait
  const trait = "simple";
  loadWeaponList(trait).then((res) => {
    res.json().then((data) => { 
      console.log("Weapons for trait " + trait +  ": ", data);
      setWeaponList(data);
    })
  });
}

const handleCloseWeapon = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const newOpen: string[] = new Array(basicInfo.equipment?.weapons?.length).fill(null);
  console.log("Close: ", index);
  setOpenWeapon(newOpen);
  //console.log("Close: ", index);  
}

const handleChooseWeapon = (event: MouseEvent, index: number, weapon: any) => {
  event.preventDefault();
  console.log("Choose: ", index);
  console.log("Weapon: ", weapon);
  const newWeapons = [...basicInfo.weapons];
  newWeapons[index] = weapon.id;
  handleChangeInfo({ 
    ...basicInfo,
    weapons: newWeapons
  });

  //Copied from handleFeatChange
  const newWeapons2 = [...weapons];
  loadWeapon(weapon.id).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newWeapons2[data.id] = data;
      console.log("DATA: ", data);
      setWeapons(newWeapons2);
    });
  });
}

const switchWeaponListType = (event: MouseEvent, category: string) => {
  event.preventDefault();
  console.log("category: ", category);
  loadWeaponList(category).then((res) => {
    res.json().then((data) => { 
      console.log("Weapons for category " + category +  ": ", data);
      setWeaponList(data);
    })
  });
}

const getGearName = (id: number, name: string, subid: number) => {
  //console.log("ID: ", id  + " Name: " + name + " SubID: " + subid);


  if (id) {
    if (subid > 0) {
      //console.log("Gear: ", gear[id]);
      const nameArr : string[] = gear[id]?.subItemNames;
      const maybeName = nameArr?.find((subgear: string) => subgear.toLowerCase() === name);

      //const maybeName = gear[id]?.subItemNames?.first((subgear: string) => subgear.toLowerCase() === name);
      if (maybeName) {
        return maybeName;
      }
    }

    return gear[id]?.name;
  } else {
    return name;
  }
};

const handleOpenGear = (event: MouseEvent, index: number) => {
  
    const newOpen: string[] = new Array(basicInfo.equipment?.gear?.length).fill(null);
    newOpen[index] = "open";
    //newOpen[index] = "open";
    event.preventDefault();
    console.log("Open: ", index);
    setOpenGear(newOpen);
  
    //basicInfo.feats[index].trait
    const trait = "simple";
    loadGearList(trait).then((res) => {
      res.json().then((data) => { 
        console.log("Gear for trait " + trait +  ": ", data);
        setGearList(data);
      })
    });
}

const handleCloseGear = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const newOpen: string[] = new Array(basicInfo.equipment?.gear?.length).fill(null);
  console.log("Close: ", index);
  setOpenGear(newOpen);
  //console.log("Close: ", index);  
}

const handleChooseGear = (event: MouseEvent, index: number, onegear: any) => {
  event.preventDefault();
  console.log("Choose: ", index);
  console.log("Gear: ", onegear);
  const newGearItem = {
    id: onegear.id,
    name: onegear.name,
    subId: onegear.subId
  };
  const newGear = [...basicInfo.gearCompact];
  newGear[index] = newGearItem;
  handleChangeInfo({ 
    ...basicInfo,
    gearCompact: newGear
  });

  //Copied from handleFeatChange
  const newGear2 = [...gear];
  loadGear(onegear.id).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newGear2[data.id] = data;
      console.log("DATA: ", data);
      setGear(newGear2);
    });
  });
}

const handleOpenAncestry = (event: MouseEvent) => { 
  event.preventDefault();
  console.log("Open Ancestry");

  setOpenAncestry(true);
}

const handleCloseAncestry = (event: MouseEvent) => {
  event.preventDefault();
  console.log("Close Ancestry");
  setOpenAncestry(false);
}

const handleChooseAncestry = (event: MouseEvent, ancestry: any) => {
  event.preventDefault();
  console.log("Choose Ancestry: ", ancestry);

  setRace(ancestry.name);
  const changedInfo = {
    ...basicInfo,
    ancestry: ancestry.id,
    race: ancestry.name
  };
  handleChangeInfo(changedInfo);
  loadHeritages(ancestry.id);
}

const switchAncestryRarity = (event: MouseEvent, category: string) => {
  event.preventDefault();
  console.log("category: ", category);
//  loadAncestries().then((res) => {
//    res.json().then((data) => { 
//      console.log("Ancestries: ", data);
//      setAncestries(data);
//    })
//  });
}

const getAncestryName = (id: number) => {
  return ancestries?.find((ancestry: any) => ancestry?.id === id)?.name;
}

const handleOpenHeritage = (event: MouseEvent) => { 
  event.preventDefault();
  console.log("Open Heritage");

  setOpenHeritage(true);
}


const handleCloseHeritage = (event: MouseEvent) => {
  event.preventDefault();
  console.log("Close Heritage");
  setOpenHeritage(false);
}

const handleChooseHeritage = (event: MouseEvent, heritage: any) => {
  event.preventDefault();
  console.log("Choose Heritage: ", heritage);

  const changedInfo = {
    ...basicInfo,
    heritage: heritage.id
  };
  handleChangeInfo(changedInfo);
  
}

const switchHeritageType = (event: MouseEvent, category: string) => {
  event.preventDefault();
  console.log("category: ", category);
//  loadAncestries().then((res) => {
//    res.json().then((data) => {
//      console.log("Ancestries: ", data);
//      setAncestries(data);
//    })
//  });
}

const getHeritageName = (id: number) => {
  return heritages?.find((heritage: any) => heritage?.id === id)?.name;
}

const handleOpenBackground = (event: MouseEvent) => {
  event.preventDefault();
  console.log("Open Background");

  if (!backgrounds || backgrounds.length === 0) {
    loadBackgroundList().then((res) => {
      res.json().then((data) => { 
        console.log("Backgrounds: ", data);
        setBackgrounds(data);
      })
    });
  }

  setOpenBackground(true);
}

const handleCloseBackground = (event: MouseEvent) => {
  event.preventDefault();
  console.log("Close Background");
  setOpenBackground(false);
}

const handleChooseBackground = (event: MouseEvent, background: any) => {
  event.preventDefault();
  console.log("Choose Background: ", background);

  const changedInfo = {
    ...basicInfo,
    background: background.id
  };

  loadBackground(background.id).then((res) => {
    res.json().then((data) => { 
      console.log("Background: ", data);

      const newBackgrounds2 = backgroundList;
      newBackgrounds2[data.id] = data;
      
      //console.log("DATA: ", dataArray);
      setBackgroundList(newBackgrounds2);
    })
  });

  handleChangeInfo(changedInfo);
}

const handleBackgroundChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    background: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const switchBackgroundType = (event: MouseEvent, category: string) => {
  event.preventDefault();
  console.log("category: ", category);
}

const getBackgroundName = (id: number) => {
  return backgroundList[id]?.name;
}

const handleLowLightVisionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    lowLightVision: event.target.checked
  };

  handleChangeInfo(changedInfo);
}

const handleDarkVisionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    darkVision: event.target.checked
  };

  handleChangeInfo(changedInfo);
}

const handleGreaterDarkVisionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    greaterDarkVision: event.target.checked
  };

  handleChangeInfo(changedInfo);
}

const handleScentChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    scent: event.target.checked
  };

  handleChangeInfo(changedInfo);
}

const handleTremorsenseChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    tremorsense: event.target.checked
  };

  handleChangeInfo(changedInfo);
}

const handleSimpleChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    simple: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleMartialChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    martial: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleMuseChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    muse: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleTraditionChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    tradition: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleLoreNameChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    loreName: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleBotMeChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    botMe: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleCastingAbilityChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    castingAbility: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleMoneyEarnedChange = (event: any) => {
  const changedInfo = {
    ...basicInfo,
    moneyEarned: event.target.value
  };

  handleChangeInfo(changedInfo);
}

const handleOpenSpell = (event :any, index : number) => {
  const newOpen: string[] = new Array(basicInfo.spells?.length).fill(null);
  newOpen[index] = "open";
  event.preventDefault();
  console.log("Open: ", index);
  setOpenSpell(newOpen);

  //const trait = "simple";
  
  const traits = ["Bard", "Focus"];

  loadSpellList(traits, 1).then((res) => {
    res.json().then((data) => { 
      //console.log("Spells for trait " + trait +  ": ", data);
      setSpellList(data);
    })
  });
  
}

const handleChooseSpell = (event: MouseEvent, index: number, spell: any) => {
  event.preventDefault();
  console.log("Choose: ", index);
  console.log("Spell: ", spell);
  const newSpells = [...basicInfo.spells];
  newSpells[index] = spell.id;
  handleChangeInfo({ 
    ...basicInfo,
    spells: newSpells
  });

  //Copied from handleFeatChange
  const newSpells2 = [...spells];
  loadSpell(spell.id).then((res) => {  
    res.json().then
    ((data) => {
      //parseInt(event.target.value)  
      newSpells2[data.id] = data;
      console.log("DATA: ", data);
      setSpells(newSpells2);
    });
  });
}

const handleCloseSpell = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const newOpen: string[] = new Array(basicInfo.spells?.length).fill(null);
  console.log("Close: ", index);
  setOpenSpell(newOpen);
}

const switchSpellListType = (event: MouseEvent, category: any) => {
  event.preventDefault();
  console.log("category: ", category);
  
  const newTraits = category.traits;
  if (category.name === "Focus") {
    newTraits.push(basicInfo.charClass);
  }

  if (category.name.length === 3 || category.name === "Cantrip") {
    loadSpellList(newTraits, category.level, basicInfo.tradition).then((res) => {
      res.json().then((data) => { 
        console.log("Spells for category " + category +  ": ", data);
        setSpellList(data);
      })
    });
  } else {
    loadSpellList(newTraits, category.level).then((res) => {
      res.json().then((data) => { 
        console.log("Spells for category " + category +  ": ", data);
        setSpellList(data);
      })
    });
  }
}

const handleLanguageChange = (index: number, event: any) => {
  const changedInfo = {
    ...basicInfo,
    languages: [ ...basicInfo.languages ]
  };
  changedInfo.languages[index] = event.target.value;

  handleChangeInfo(changedInfo);
}

const addNewLanguage = (event : any) => {
  event.preventDefault();

  const changedInfo = {
    ...basicInfo,
    languages: basicInfo.languages ? [...basicInfo.languages, ''] : ['']
  };
  handleChangeInfo(changedInfo);
}

const spellCategoryList = [
  { 
    name: "Focus",
    traits: ["Focus"],
    level: 1
  },
  { 
    name: "Composition",
    traits: ["Composition"],
    level: 1
  },
  { 
    name: "Cantrip",
    traits: ["Cantrip"],
    level: 1
  },
  { 
    name: "1st",
    traits: [],
    level: 1
  },
  { 
    name: "2nd",
    traits: [],
    level: 2
  },
  { 
    name: "3rd",
    traits: [],
    level: 3
  },
  { 
    name: "4th",
    traits: [],
    level: 4
  },
  { 
    name: "5th",
    traits: [],
    level: 5
  },
  { 
    name: "6th",
    traits: [],
    level: 6
  },
  { 
    name: "7th",
    traits: [],
    level: 7
  },
  { 
    name: "8th",
    traits: [],
    level: 8
  },
  { 
    name: "9th",
    traits: [],
    level: 9
  }
];

const trainedLevels = [ //TODO: later
  "untrained",
  "trained",
  "expert",
  "master",
  "legendary"
];

//Lots of ancestries missing
const traitList = [
//  "Ancestry",
  "Dwarf",
  "Elf",
  "Gnome",
  "Goblin",
  "Halfling",
  "Human",
  "Half-Elf",
  "Half-Orc", 
  "Archetype",
  //"Class",
  "Alchemist",
  "Bard",
  "Barbarian",
  "Champion",
  "Cleric",
  "Druid",
  "Fighter",
  "Investigator",
  "Monk",
  "Oracle",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Summoner",
  "Swashbuckler",
  "Witch",
  "Wizard",
  "General",
  "Skill"
];

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
        <div className="p-3">
          Perception
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.skills?.perception} onChange={(event) => handleSkillChange('perception', event)}></input>
        </div>
        <div className="p-3">
          Pfs
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.pfs} onChange={handlePfsChange}></input>
        </div>
        <div className="p-3">
          Faction
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.faction} onChange={handleFactionChange}></input>
        </div>
        <div className="p-3">
          XP Progression
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.xpProgression} onChange={handleXpProgressionChange}></input>
        </div>
        <div className="p-3">
          Speed
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.speed} onChange={handleSpeedChange}></input>
        </div>
        <div className="p-3">
          Exploration Mode
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.explorationMode} onChange={handleExplorationModeChange}></input>
        </div>
        <div className="p-3">
          Focus Points
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.focusPoints} onChange={handleFocusPointsChange}></input>
        </div>
        <div className="p-3">
          Size
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.size} onChange={handleSizeChange}></input>
        </div>
        <div className="p-3">
          Simple
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.simple} onChange={handleSimpleChange}></input>
        </div>
        <div className="p-3">
          Martial
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.martial} onChange={handleMartialChange}></input>
        </div>
        <div className="p-3">
          Muse
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.muse} onChange={handleMuseChange}></input>
        </div>
        <div className="p-3">
          Tradition
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.tradition} onChange={handleTraditionChange}></input>
        </div>
        <div className="p-3">
          Lore Name
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.loreName} onChange={handleLoreNameChange}></input>
        </div>
        <div className="p-3">
          Bot Me
          <textarea className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.botMe} onChange={(event) => handleBotMeChange(event)}></textarea>
        </div>
        <div className="p-3">
          Casting Ability
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.castingAbility} onChange={handleCastingAbilityChange}></input>
        </div>
        <div className="p-3">
          Money Earned
          <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={basicInfo.moneyEarned} onChange={handleMoneyEarnedChange}></input>
        </div>
        <div className="p-3 flex">
          Senses:
          <div className="rounded-[7px] px-3 py-2.5 border border-gray-300">
          <input type="checkbox" checked={ basicInfo.lowLightVision} onChange={ handleLowLightVisionChange } /> Low-light vision
          </div>
          <div className="rounded-[7px] px-3 py-2.5 border border-gray-300">
          <input type="checkbox" checked={ basicInfo.darkVision } onChange={ handleDarkVisionChange } /> Darkvision
          </div>
          <div className="rounded-[7px] px-3 py-2.5 border border-gray-300">
          <input type="checkbox" checked={ basicInfo.greaterDarkVision } onChange={ handleGreaterDarkVisionChange } /> Greater Darkvision
          </div>
          <div className="rounded-[7px] px-3 py-2.5 border border-gray-300">
          <input type="checkbox" checked={ basicInfo.scent } onChange={ handleScentChange } /> Scent
          </div>
          <div className="rounded-[7px] px-3 py-2.5 border border-gray-300">
          <input type="checkbox" checked={ basicInfo.tremorsense } onChange={ handleTremorsenseChange } /> Tremorsense
          </div>
        </div>
        <div className="p-3 fleax flex-justify-end">
        <div className="p-3">
                      <strong>Ancestry</strong>
   
                        <div className="p-1">
                          <input
                            className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                            value={basicInfo.ancestry}
                            onChange={(event) => handleAncestryChange(event)}
                          />
                          {"Some ancestry description? " + getAncestryName(basicInfo.ancestry)}
                          <button onClick={(event) => handleOpenAncestry(event)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>

     <dialog open={openAncestry}>
  {["Common", "Uncommon", "Rare"].map((trait: string, index2: number) => (
    <button onClick={(event) => switchAncestryRarity(event, trait)} key={index2}>{trait}</button>
  ))
  }
  <br></br>
  {ancestries.map((ancestry: any, index2: number) => (
    <button onClick={(event) => handleChooseAncestry(event, ancestry)} key={index2}>{ancestry.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleCloseAncestry(event)}>OK</button>
  </form>
</dialog>
                        </div>
                  </div>
                  <div className="p-3">
                      <strong>Heritage</strong>
   
                        <div className="p-1">
                          <input
                            className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                            value={basicInfo.heritage}
                            onChange={(event) => handleHeritageChange(event)}
                          />
                          {"Some heritage description? " + getHeritageName(basicInfo.heritage)}
                          <button onClick={(event) => handleOpenHeritage(event)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>

     <dialog open={openHeritage}>
  {["Race", "Versatile"].map((trait: string, index2: number) => (
    <button onClick={(event) => switchHeritageType(event, trait)} key={index2}>{trait}</button>
  ))
  }
  <br></br>
  {heritages.map((heritage: any, index2: number) => (
    <button onClick={(event) => handleChooseHeritage(event, heritage)} key={index2}>{heritage.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleCloseHeritage(event)}>OK</button>
  </form>
</dialog>
                        </div>
                  </div> 

                  <div className="p-3">
                      <strong>Background</strong>
   
                        <div className="p-1">
                          <input
                            className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
                            value={basicInfo.background}
                            onChange={(event) => handleBackgroundChange(event)}
                          />
                          {"Some background description? " + getBackgroundName(basicInfo.background)}
                          <button onClick={(event) => handleOpenBackground(event)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>

     <dialog open={openBackground}>
  {["BG type 1", "BG type 2"].map((trait: string, index2: number) => (
    <button onClick={(event) => switchBackgroundType(event, trait)} key={index2}>{trait}</button>
  ))
  }
  <br></br>
  {backgrounds.map((background: any, index2: number) => (
    <button onClick={(event) => handleChooseBackground(event, background)} key={index2}>{background.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleCloseBackground(event)}>OK</button>
  </form>
</dialog>
                        </div>
                  </div> 

                  </div>

<div>
  {basicInfo.languages?.map((language: string, index: number) => (
    <div key={index} className="p-1">
      <input
        className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
        value={language}
        onChange={(event) => handleLanguageChange(index, event)}
      />
      {language}
    </div>
  ))}
  <button type="button" onClick={(event) => addNewLanguage(event)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Add Language
  </button>
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
  {traitList.map((trait: string, index2: number) => (
    <button onClick={(event) => switchFeatListType(event, trait)} key={index2}>{trait}</button>
  ))
  }
  <br></br>
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

                          <button onClick={(event) => handleOpenWeapon(event, index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>

                          <dialog open={openWeapon[index]}>
  {categoryList.map((category: string, index2: number) => (
    <button onClick={(event) => switchWeaponListType(event, category)} key={index2}>{category}</button>
  ))
  }
  <br></br>
  {weaponList?.map((weapon: any, index2: number) => (
    <button onClick={(event) => handleChooseWeapon(event, index, weapon)} key={index2}>{weapon.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleCloseWeapon(event, index)}>OK</button>
  </form>
</dialog>

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

                <button onClick={(event) => handleOpenArmor(event, index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>

                <dialog open={openArmor[index]}>
  {armorCategoryList.map((category: string, index2: number) => (
    <button onClick={(event) => switchArmorListType(event, category)} key={index2}>{category}</button>
  ))
  }
  <br></br>
  {armorList?.map((onearmor: any, index2: number) => (
    <button onClick={(event) => handleChooseArmor(event, index, onearmor)} key={index2}>{onearmor.name}</button>
  ))}
  <form method="dialog">
    <button onClick={(event) => handleCloseArmor(event, index)}>OK</button>
  </form>
</dialog>

              </div>
            ))}
            <button type="button" onClick={addNewArmor} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Armor
            </button>
          </div>


      {/* Gear inputs */}
      <div className="p-3">
        <strong>Gear</strong>
        {basicInfo.gearCompact?.map((gearItem: any, index: number) => (
          <div key={index} className="p-1">
            <input
              className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300"
              value={gearItem.id}
              onChange={(event) => handleGearChange(index, event)}
            />
            { /* gear[gearItem.id]?.name */ }
            {getGearName(gearItem.id, gearItem.name, gearItem.subId)}
            <button onClick={(event) => handleOpenGear(event, index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>

            <dialog open={openGear[index]}>
              {gearList?.map((gear: any, index2: number) => (
                <button onClick={(event) => handleChooseGear(event, index, gear)} key={index2}>{gear.name}</button>
              ))}
              <form method="dialog">
                <button onClick={(event) => handleCloseGear(event, index)}>OK</button>
              </form>
            </dialog>


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
            <button onClick={(event) => handleOpenSpell(event, index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>

            <dialog open={openSpell[index]}>
              {spellCategoryList.map((category: any, index2: number) => (
                <button onClick={(event) => switchSpellListType(event, category)} key={index2}>{category.name}</button>
              ))}

              {spellList?.map((spell: any, index2: number) => (
                <button onClick={(event) => handleChooseSpell(event, index, spell)} key={index2}>{spell.name}</button>
              ))}
              <form method="dialog">
                <button onClick={(event) => handleCloseSpell(event, index)}>OK</button>
              </form>
            </dialog>
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
