import { IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router';

const EmptyAddress = () => {
    const history = useHistory();
    const handelAddAddress=()=>{
        history.push("/add-address")
      }
  return (
    <div >
      
                        <h1>Empty Address</h1>
                        <div style={{display:"flex",justifyContent:"center",alignItem:"center",width:"100%"}}>
                        <IonButton onClick={handelAddAddress} shape='round' style={{width:"80%"}}>+ Add Address</IonButton>
                       </div>
                    
    </div>
  )
}

export default EmptyAddress
