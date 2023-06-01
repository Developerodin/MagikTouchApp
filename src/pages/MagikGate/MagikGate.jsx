import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react'
import React from 'react'
import './Explore.scss';
import Header from '../../components/Header/Header';
import HomeSwiper from '../../components/ExploreComp/HomeSwiper';
const MagikGate = () => {
    const ServicesData=[
        {icon:"assets/images/magikgate/community.png",title:"Members"},
        {icon:"assets/images/magikgate/noticboard.jpg",title:"Notice Board"},
        {icon:"assets/images/magikgate/events.png",title:"Events"},
        {icon:"assets/images/magikgate/graph.png",title:"Visitors"},
        {icon:"assets/images/magikgate/bills-3.png",title:"My Bills"},
        {icon:"assets/images/magikgate/balance.jpg",title:"Documents"},
        {icon:"assets/images/magikgate/forum.jpeg",title:"Feedback"},
        {icon:"assets/images/magikgate/gallary.png",title:"Gallery"},
        {icon:"assets/images/magikgate/sell.png",title:"Buy/Sell"},
        {icon:"assets/images/magikgate/balance.jpg",title:"Balance Sheet"},
        {icon:"assets/images/magikgate/community.png",title:"Emergency Numbers"},
        {icon:"assets/images/magikgate/building.png",title:"Building Details"},
       
      ]
  return (
    <IonPage>
        <Header/>
       <IonContent className="explore-bg explore-page" forceOverscroll={ false } style={{backgroundColor:"#F1F1F1"}}>
        <IonGrid>
            <IonRow style={{padding:"10px"}}>
            <IonCol size='12' style={{border:"1px solid blue",borderRadius:"40px",height:"210px",backgroundColor:"#193568"}}>
                <HomeSwiper/>
                </IonCol>
            </IonRow>

            <IonRow style={{marginTop:"30px"}}>
                {
                  ServicesData.map((el,index)=>{
                    return (
                 <IonCol key={index} size='3.3' style={{backgroundColor:"#FFFF",padding:"10px",margin:"10px",borderRadius:"10px"}}>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <img style={{width:"60px",height:"60px"}}  src={el.icon} alt='img'/>
                 
                  </div>
                  <IonText style={{display:"flex",fontSize:"12px",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>{el.title}</IonText>
                  
                </IonCol>
                    )
                  })
                }
                
              </IonRow>
        </IonGrid>
        </IonContent>
    </IonPage>
  )
}

export default MagikGate
