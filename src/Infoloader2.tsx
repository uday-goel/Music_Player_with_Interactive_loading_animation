interface Infoloader2Props {
  data?: string;
}


export const Infoloader2=({data}:Infoloader2Props)=>{
 return(
    <>
        <div className="project-item text-white text-[13px] text-center m-[11px]" style={{fontFamily:'AeroSpace'}}>
            {data}
        </div>
    
    
    
    
    </>
 )



}