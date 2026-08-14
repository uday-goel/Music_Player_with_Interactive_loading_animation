interface Infoloader2Props {
  data?: string;
}


export const Timenode=({data}:Infoloader2Props)=>{
 return(
    <>
        <div className="project-item text-white text-[13px] text-center  m-[3px] p-2" style={{fontFamily:'AeroSpace'}}>
            {data}
        </div>
    
    
    
    
    </>
 )



}