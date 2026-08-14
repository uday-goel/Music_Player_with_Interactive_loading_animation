import {createContext, useState} from "react";
import type { ReactNode } from "react";
type ContextType = {
    data: {
        Project: string[];
        Time: string[];
        Music: string[];
    }
    imgname: string[];
    startvid: string;
    setstartvid: React.Dispatch<React.SetStateAction<string>>;
    vidnames: string[];
};

const Context = createContext<ContextType | null>(null);

type ProviderProps = {
    children: ReactNode;
};

export const ContextProvider = ({ children }: ProviderProps) => {
    
    
    
    
    
    
    
    
    
    const[startvid,setstartvid] = useState('');
    
    const data = {
        Project: [
            "Personal Portfolio",
            "Interactive Quiz App", // Fixed: Added missing 'I'
            "Animated Landing Page",
            "React Blog App",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon",
            "coming soon"
        ],
        Time: [
            "5 Days",
            "5 Days",
            "7 Days",
            "6 Days",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD",
            "TBD"
        ],
        Music: [
            "Wavy",
            "Admirin' You",
            "Winning Speech",
            "52 Bars",
            "Softly",
            "Hass Hass",
            "Naina",
            "Courtside",
            "Mi Amor",
            "Everybody Wants You",
            "9:45",
            "Wallian",
            "Ontop",
            "Chaandaniya",
            "Afsos"
        ]
    };
    

    const imgname=[
        "52 Bars.jpg",
        "945.jpg",
        "admirin you.jpg",
        "afsos.jpg",
        "chandaniya.jpg",
        "Everybodywants you.jpg",
        "Hass Hass.jpg",
        "Mi amor.jpg",
        "Naina.jpg",
        "Ontop.jpg",
        "softly.jpg",
        "Wallian.jpg",
        "Wavy.jpg",
        "Winnig speech.jpg",
        "courtside.jpg"
    ]


    const vidnames=[
        "52 Bars.mp4",
        "945.mp4",
        "admirin you.mp4",
        "afsos.mp4",
        "chandaniya.mp4",
        "Everybodywants you.mp4",
        "Hass Hass.mp4",
        "Mi amor.mp4",
        "Naina.mp4",
        "Ontop.mp4",
        "softly.mp4",
        "Wallian.mp4",
        "Wavy.mp4",
        "Winnig speech.mp4",
        "courtside.mp4"
    ]


    return (
        <Context.Provider value={{ data,imgname,startvid,setstartvid, vidnames}}>
            {children}
        </Context.Provider>
    );
};

// Export the context for use in other components
export default Context;