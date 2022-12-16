import React from 'react'
import { useSelector , useDispatch} from "react-redux";
import "./Footer.css"
import  {submission } from "../../../Redux/Action/SurveyData"
// import { useNavigate } from "react-router-dom";


function Footer() {
  let dispatch= useDispatch()
  let Surveydata = useSelector((state) => state.postsurveyData);
  let worker_data=JSON.parse(localStorage.getItem("worker_data_selected")  );
  let uuid=localStorage.getItem("uuid")  
  let subUUID=uuid 
  
// const navigate = useNavigate();

const submission_data=()=>{
  
  alert("submited")
  dispatch(submission(  {  uuid:subUUID, surveydata:Surveydata?.surveydata , wuuid:worker_data  }))
  // navigate("/")
  // window.location.reload(false)
}
let login_data = JSON.parse(localStorage.getItem("login_data"));


  return (
    <div className='footerBttn'>
        <div className='finishBttn' >
          {login_data?.role_id===2 ?
          
             <button className='bttnDiv'
            disabled={!Surveydata?.surveydata[2]?.comment}
            onClick={()=>submission_data()}
            >Finish</button> : null} 
        </div></div>
  )
}

export default Footer