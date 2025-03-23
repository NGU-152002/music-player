// import { useEffect, useState } from "react";
// import qala from "../assets/devera.ogg";
// import hello from "../assets/kurchi.flac";
// import { Howl } from "howler";
// import flies from '../assets/files.json'

// export default function Player() {
//   const [currentSong, setCurrentSong] = useState(qala);
//   const [nextSong, setNextSong] = useState(false);
//   const [inc, setInc] = useState(0);
//   const [sound, setSound] = useState(null); // State to hold the Howl object


//   const [searchValue, setSearchValue] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [showDropDown, setShowDropDown] = useState(false);
//   const songsList = flies.files;

//   const handleSearch = () => {
//     setShowDropDown(true);
//     setSearchResult(prev => songsList.filter((song) => song.toLowerCase().includes(searchValue.toLowerCase())))
//     // console.log(searchResult)
//   }



//   const handleSearchSelection = (songName) => {
//     const findIndex = songsList.indexOf(songName);
//     setInc(findIndex);
//     setCurrentSong(`/src/assets/${songsList[findIndex]}`);
//     setSearchValue("");
//   }

//   // Effect to update the Howl object when currentSong changes
//   useEffect(() => {
//     if (sound) {
//       sound.stop(); // Stop the current song if it's playing
//       sound.unload(); // Unload the current song to free up resources
//     }

//     // Create a new Howl object with the updated currentSong
//     const newSound = new Howl({
//       src: [currentSong],
//       // autoplay: true,
//       onend: handleNextSong
//     });

//     setSound(newSound); // Update the sound state
//     // sound.play()

//     // Cleanup function to stop and unload the sound when the component unmounts
//     return () => {
//       if (newSound) {
//         newSound.stop();
//         newSound.unload();
//       }
//     };
//   }, [currentSong]);

//   // Effect to handle the next song logic
//   useEffect(() => {
//     if (nextSong) {
//       const nextIndex = (inc + 1) % songsList.length; // Loop back to the first song if at the end
//       setInc(nextIndex);
//       setCurrentSong(`/src/assets/${songsList[nextIndex]}`);
//       console.log("Next song path:", `/src/assets/${songsList[nextIndex]}`);
//       setNextSong(false); // Reset the nextSong state
//     }
//   }, [nextSong]);

//   const playSong = () => {
//     if (sound) {
//       sound.play();
//     }
//   }

//   const handleNextSong = () => {
//     setNextSong(true); // Trigger the next song logic

//   };

// useEffect(()=>{

// if(searchValue  === ""){

//   setSearchResult([])
// }

// },[searchValue]);


//   return (
//     <>
//     <div className="w-full h-full space-y-3">

    
//       <div className="w-full items-start">

//       <div className='w-full flex space-x-3 items-center'>
//         <input className="border-1 w-full h-[35px] rounded-md" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} name="searchInput" id="searchInput" />
//         <button onClick={handleSearch} className="outline-1 p-1 active:bg-[#a8a8a8] rounded-md cursor-pointer">Search</button>
//       </div>
//       </div>

//       {
//         showDropDown && searchResult.length>0 && (

//           <div className='w-full mt-2 bg-[#d4d4d4] h-fit p-2 rounded-sm'>
//             {/* <p>hello</p> */}
//             <div className="w-full max-h-[300px] overflow-y-auto overflow-x-hidden space-y-1">
//               {
//                 searchResult.map((songName,idx) => {
//                   return (<div key={idx} onClick={() => { handleSearchSelection(songName); setShowDropDown(false);playSong();  }} className='w-full bg-white border-1 h-fit py-2 cursor-pointer rounded-md'>
//                     <h3>{songName}</h3>
//                   </div>
//                   )
//                 })

//               }


//             </div>
//           </div>
//         )
//       }

//       <h1>{songsList[inc]}</h1>
//       <button
//         onClick={playSong}
//         className="mr-2"
//       >
//         Play
//       </button>
//       <button onClick={handleNextSong}>Next Song</button>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Howl } from "howler";
import flies from '../assets/files.json';

export default function Player() {
  const [currentSong, setCurrentSong] = useState(`/src/assets/${flies.files[0]}`);
  const [nextSong, setNextSong] = useState(false);
  const [inc, setInc] = useState(0);
  const [sound, setSound] = useState(null); // State to hold the Howl object

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const songsList = flies.files;

  const handleSearch = () => {
    setShowDropDown(true);
    setSearchResult(prev => songsList.filter((song) => song.toLowerCase().includes(searchValue.toLowerCase())));
  };

  const handleSearchSelection = (songName) => {
    const findIndex = songsList.indexOf(songName);
    setInc(findIndex);
    setCurrentSong(`/src/assets/${songsList[findIndex]}`);
    setSearchValue("");
    setShowDropDown(false);
  };

  // Effect to update the Howl object when currentSong changes
  useEffect(() => {
    if (sound) {
      sound.stop(); // Stop the current song if it's playing
      sound.unload(); // Unload the current song to free up resources
    }

    // Create a new Howl object with the updated currentSong
    const newSound = new Howl({
      src: [currentSong],
      onend: handleNextSong, // Call handleNextSong when the current song ends
      autoplay:true
    });

    setSound(newSound); // Update the sound state

    // Cleanup function to stop and unload the sound when the component unmounts
    return () => {
      if (newSound) {
        newSound.stop();
        newSound.unload();
      }
    };
  }, [currentSong]);

  // Effect to handle the next song logic
  useEffect(() => {
    if (nextSong) {
      const nextIndex = (inc + 1) % songsList.length; // Loop back to the first song if at the end
      setInc(nextIndex);
      setCurrentSong(`/src/assets/${songsList[nextIndex]}`);
      console.log("Next song path:", `/src/assets/${songsList[nextIndex]}`);
      setNextSong(false); // Reset the nextSong state
    }
  }, [nextSong]);

  const playSong = () => {
    if (sound) {
      sound.play(); // Start playback after user interaction
    }
  };

  const handleNextSong = () => {
    setNextSong(true); // Trigger the next song logic
  };

  useEffect(() => {
    if (searchValue === "") {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <div className="w-full h-full space-y-3">
      <div className="w-full items-start">
        <div className='w-full flex space-x-3 items-center'>
          <input
            className="border-1 w-full h-[35px] rounded-md"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            name="searchInput"
            id="searchInput"
          />
          <button
            onClick={handleSearch}
            className="outline-1 p-1 active:bg-[#a8a8a8] rounded-md cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {showDropDown && searchResult.length > 0 && (
        <div className='w-full mt-2 bg-[#d4d4d4] h-fit p-2 rounded-sm'>
          <div className="w-full max-h-[300px] overflow-y-auto overflow-x-hidden space-y-1">
            {searchResult.map((songName, idx) => (
              <div
                key={idx}
                onClick={() => {
                  handleSearchSelection(songName);
                  playSong(); // Start playback after selecting a song
                }}
                className='w-full bg-white border-1 h-fit py-2 cursor-pointer rounded-md'
              >
                <h3>{songName}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      <h1>{songsList[inc]}</h1>
      <button
        onClick={playSong}
        className="mr-2"
      >
        Play
      </button>
      <button onClick={handleNextSong}>Next Song</button>
    </div>
  );
}