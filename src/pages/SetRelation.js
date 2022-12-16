import React, { useState } from "react";

function SetRelation() {
  const [name, setName] = useState(); // select name
  const [test, setTest] = useState([]); //store localstore
  const [test1, setTest1] = useState([]); //store localstore
  const [test2, setTest2] = useState([]); //store localstore
  const [secletReltion, setSecletReltion] = useState(); // Seclet Reltion
  const [findReltion, setFindReltion] = useState(); // Seclet Reltion

  //   on chenge funtion
  const onEnter = (e) => {
    setName(e.target.value);
  };

  const select = (e) => {
    console.log("dobne", e.target.value);
    const { name, value } = e.target;

    setSecletReltion({ ...secletReltion, [name]: value });
  };



const find_data=(e)=>{
    const { name, value } = e.target;
    setFindReltion({ ...findReltion, [name]: value });
    
}





  

  // on Click funtion

  const click = () => {
    if (name) {
      test.push(name);
      localStorage.setItem("name", JSON.stringify([...test]));
    }
    setName("");
  };
  
  const setRlt = () => {
    console.log(test1 ,"secletReltion");
    if(secletReltion.p &&secletReltion.p1 ){
      test1.push(secletReltion)
      localStorage.setItem("secleted", JSON.stringify([...test1 ]));
    }
    else{

    }
    setSecletReltion(null)
       
    };


    const fndRlt = () => {
        test2.push(findReltion)
        localStorage.setItem("Find_data", JSON.stringify([]));
        
        if(findReltion?.p &&findReltion?.p1 ){
          localStorage.setItem("Find_data", JSON.stringify([...test2 ]));
        }
        setFindReltion(null)
        setTest2([])
        };





//     ---------- Local Storage  Get Item------------
    
    let users = JSON.parse(localStorage.getItem("name") || "[]");
    let seclted_data = JSON.parse(localStorage.getItem("secleted") || "[]");
    let find_rln = JSON.parse(localStorage.getItem("Find_data") || "[]");


let rst
let rst1
let rst3
let rst4
let rst5

// eslint-disable-next-line array-callback-return
seclted_data.map((item)=>{
   let sum=find_rln.find((element)=>element.p===item.p1  )
   let sum1=find_rln.find((element)=>element.p===item.p  )
    if(sum || sum1){
        let sum3=find_rln.find((element)=>element.p1===item.p  )
        let sum2=find_rln.find((element)=>element.p1===item.p1  )
        if(sum2 || sum3){
        console.log("sum",sum ,sum1);
        rst=find_rln[0].p 
        rst1=find_rln[0].p1
        } 
    }

console.log("sum done",sum);
 } )




let subRec=[]

 // eslint-disable-next-line array-callback-return
 seclted_data.map((item)=>{   
  // eslint-disable-next-line array-callback-return
  find_rln.map((element)=>{
    if(item.p===element.p){
      console.log(item,"item");
      subRec.push(item)
    }
    else if(item.p1===element.p){
      subRec.push(item)

    }
  })
})
console.log("subrec",subRec);

// eslint-disable-next-line array-callback-return
subRec.map((item)=>{
  // eslint-disable-next-line array-callback-return
  seclted_data.map((element)=>{
    if(element.p===item.p1){
      if(find_rln[0].p1===element.p1)
      {
        console.log("loop 1");
        rst3=find_rln[0].p 
        rst4=item.p1
        rst5=find_rln[0].p1
      }
    }
    else if(element.p1===item.p){
      if(find_rln[0].p===element.p)
      {
        console.log("loop 2");

        rst3=find_rln[0].p 
        rst4=item.p
        rst5=find_rln[0].p1
      }
      
    }
    else if(element.p===item.p1){
      if(find_rln[0].p1===item.p1)
      {
        console.log("loop 3" , item);

        rst3=find_rln[0].p 
        rst4=item.p1
        rst5=find_rln[0].p1
      }
      else if(element.p1===item.p1){
        console.log("item.p1" , item.p1);
        // eslint-disable-next-line array-callback-return
        seclted_data.map((e)=>{
          if(e.p1=== item.p1){
            if(find_rln[0].p1===e.p){
              console.log("loop 4 ");
              rst3=find_rln[0].p 
              rst4=e.p1
              rst5=find_rln[0].p1
            }            
          } 
        })
      }
    }
  })  
})




console.log(rst);
// find_rln.map((element)=>{console.log("e.p",element.p) })










  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"red",
          color:"white",
          padding:"10px"

        }}
      >
        <div style={{
          
        }}>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => onEnter(e)}
          />
          <button onClick={() => click()}>Enter</button>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <h3>Enter your name</h3>
        </div>
      </div>
      <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        {/* -----------------------    Set  Relation--------------------------------      */}

        <div
          style={{
            display: "flex",
            flex: 0.4,
            // width:"50%",
            justifyContent: "flex-end",
            alignItems: "center",
            padding:"10px"
          }}
        >
          <select type="select " name="p" onChange={(e) => select(e)} style={{ padding:"10px"}}>
            <option></option>
            {users.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.2,
            //   width:"50%",

            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <button onClick={() => setRlt()}>Set Relation</button>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.4,
          }}
        >
          <select type="select " name="p1" onChange={(e) => select(e)} style={{ padding:"10px"}}>
            <option></option>
            {users.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
      </div>

      {/* -----------------------    Find  Relation--------------------------------      */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding:"10px"
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 0.4,
            // width:"50%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <select type="select " name="p"  onChange={(e)=> find_data(e)}  style={{ padding:"10px"}}>
            <option></option>
            {users.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.2,
            //   width:"50%",

            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <button onClick={()=>fndRlt()}>Find Relation</button>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.4,
          }}
        >
          <select type="select"  name="p1"  onChange={(e)=> find_data(e)}  style={{ padding:"10px"}}>
            <option></option>
            {users.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
      </div>
      {/*------------ show ------------------ */}
      <div style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
            marginTop:"100px"
        }} >
            <div style={{ marginRight:"100px"  }}>

       Find Data 
            </div>
        {rst ? 
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>

       <h3>
        { rst ? rst : null}
        </h3>
        <h3> ------{">"}</h3>
        <h3>        { rst1 ? rst1 : null} </h3>
        </div> :
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>

         <h3>     { rst3 ? rst3 : null} </h3>
         <h3>   { '---------> '}    { rst4 ? rst4 : null} </h3>
         <h3>   { '---------> '}    { rst5 ? rst5 : null} </h3>
        </div>}
      </div>
    </div>
  );
}

export default SetRelation;
