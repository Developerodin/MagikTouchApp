import React from 'react'
import PaymentMethod from './PaymentMethod'
import ConfirmBox from './ConfirmBox'
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react'

const Confirm = (props) => {
  return (
   
            <IonGrid>
    
             <IonRow>
                <IonCol size='12' >
                <PaymentMethod {...props} />
                
                </IonCol>
                <IonCol size='12' >
                <ConfirmBox {...props} />
                
                </IonCol>
             </IonRow>
            </IonGrid>
        
       
     
  )
}

export default Confirm
