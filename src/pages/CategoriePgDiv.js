import React from 'react'

function CategoriePgDiv(props) {

const {e , ids, CategorieOne ,Categoriedlt ,idsed}=props
  return (
    <div>
        
        <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginRight: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid  black",
                                    marginRight: "10px",
                                    padding: "10px",
                                    fontSize: "25px",
                                  }}
                                >
                                  {e?.Categorie_Name} 
                                </div>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => CategorieOne(ids, e.parent_id)}
                                >
                                  +
                                </button>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => Categoriedlt(idsed, ids)}
                                >
                                  Cancel
                                </button>
                              </div>
                              </div>

  )
}

export default CategoriePgDiv