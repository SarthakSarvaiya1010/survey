import React, { useState } from "react";
import "./Cheess.css";

function Cheess() {
  const [selected, setsSlected] = useState(null);

  console.log("selected", selected);

  
  let ref = 1;

//   let m=4
// let n=4


  return (
    <div>
      <div>
        <div>
          {[...Array(8)].map(( index) => {
            
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  // padding: "10px",
                }}
              >
                {[...Array(8)].map(( id) => {
                  
                  let actives;
                  let actives3;
                  let actives2 = "";
                  if (
                    (selected >= 3  && selected <= 6) ||
                    (selected >= 11 && selected <= 14) ||
                    (selected >= 19 && selected <= 22) ||
                    (selected >= 27 && selected <= 30) ||
                    (selected >= 35 && selected <= 38) ||
                    (selected >= 43 && selected <= 46) ||
                    (selected >= 51 && selected <= 54)
                    
                  ) {
                    actives2 =
                      parseInt(selected) + 10 === ref
                        ? "green"
                        : parseInt(selected) - 10 === ref
                        ? "green"
                        : parseInt(selected) - 17 === ref
                        ? "green"
                        : parseInt(selected) + 15 === ref
                        ? "green"
                        : parseInt(selected) - 15 === ref
                        ? "green"
                        : parseInt(selected) - 6 === ref
                        ? "green"
                        : parseInt(selected) + 6 === ref
                        ? "green"
                        : parseInt(selected) + 17 === ref
                        ? "green"
                        : "";
                  }

                  // 2*8-2
                  // -2n+9
                  let sum45 = ref %2;

                  actives = selected == ref ? "active" : "";
                  actives3 =
                    ref >= 1 && ref <= 8
                      ? !sum45
                        ? "Black"
                        : ""
                      : ref >= 9 && ref <= 16
                      ? sum45
                        ? "Black"
                        : ""
                      : ref >= 17 && ref <= 24
                      ? !sum45
                        ? "Black"
                        : ""
                      : ref >= 25 && ref <= 32
                      ? sum45
                        ? "Black"
                        : ""
                      : ref >= 33 && ref <= 40
                      ? !sum45
                        ? "Black"
                        : ""
                      : ref >= 41 && ref <= 48
                      ? sum45
                        ? "Black"
                        : ""
                      : ref >= 49 && ref <= 56
                      ? !sum45
                        ? "Black"
                        : ""
                      : ref >= 57 && ref <= 64
                      ? sum45
                        ? "Black"
                        : ""
                      : "";
                  return (
                    <label
                      key={ref++}
                      style={{
                        border: "1px solid",
                        // padding: "10px",
                        // margin: "10px",
                      }}
                      className={`bgdDiv ${actives2}${actives}${actives3}`}
                      htmlFor={ref}
                    >
                      <input
                        className="radioInputDiv"
                        name="radio1"
                        id={ref}
                        type="radio"
                        value={ref}
                        onChange={(e) => setsSlected(e.target.value)}
                      />

                      {ref}
                    </label>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cheess;
