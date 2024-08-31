import Image from 'next/image'
import Link from 'next/link';

interface Props {
  name: string;
  image: string;
  colour: string;
  basicInfo: any;
  id: string;
}

export default function Item({ name, image, colour, basicInfo, id } : Props) {
    // React / Next doesn't like 'null' as data, but "" gives an empty element.

    if (!colour) {
      colour = "";
    }

    if (!image) {
      image = "";
    }

    const charClass = basicInfo.charClass;
    
    const level = basicInfo.level;
    const fort = basicInfo.fort;
    const will = basicInfo.will;
    const ref = basicInfo.ref; 
    const AC = basicInfo.ac; //OK it loses capitalization somewhere
    const HP = basicInfo.hp;
    const race = basicInfo.race;
    const gender = basicInfo.gender;

    const classText = "m-1 border-solid border-4 hover:border-red-600 rounded-full " + colour;

    return (
      <div className="flex items-center justify-between p-1 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex-1 p-2">
            <p>
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
                    {gender} {race} {charClass} {level}
                  </div>
                  <div>
                    <strong>HP</strong> {HP} 
                    <strong> AC</strong> {AC} 
                    <strong> Fort</strong> +{fort} 
                    <strong> Ref</strong> +{ref} 
                    <strong> Will</strong> +{will} 
                  </div>
                </div>
              </div>
            </p>
        </div>
        <div className="flex flex-col">
          <Link href={"paizoforum/intro/" + id}>
            <button className="ml-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Intro
            </button>
          </Link>
          <Link href={"/paizoforum/sheet/" + id}>
            <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sheet
            </button>
          </Link>
        </div>
      </div>
    );
}