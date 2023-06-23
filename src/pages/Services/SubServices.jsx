import { IonContent, IonPage } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ServicesCard from './ServicesCard'
import { CatalogContext, SessionContext } from '../../contexts'
import { httpService } from '../../services'
import { useParams } from 'react-router'
import SubServiceCard from './SubServiceCard'
import HeaderSub from '../../components/Header/HeaderSub'

const SubServices = () => {
    

    const {productsList,topBanners}=useContext(CatalogContext);
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const [allCategories, setAllCategories] = useState([]);
    const{id}=useParams();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: allCats } = await httpService.get(
            httpService.apiEndpoint + `categories&parent=${id}`,
            { headers: httpService.headers }
          );
          console.log("allcats",allCats);
          if (allCats && "success" in allCats && allCats.success === 1) {
            setAllCategories(allCats.data);
          }
        } catch (error) {
          console.log("error");
          // showToast("error", "Somrthing went wrong!", "");
        }
      };
      console.log("Session id 2", sessionId);
      if (sessionId) {
        fetchData();
      }
    }, [sessionId]);


    useEffect(()=>{
    //  console.log("Product List",productsList);
     console.log("topBanners List",topBanners);
    console.log("In Services is it working")
    },[])
  return (
    <IonPage>
    <HeaderSub Title="Services"/>
    <IonContent className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}>
        {
          sessionId &&  allCategories.map((category,index) => {
              
                  return (
                    <div key={index}>
                         <SubServiceCard  Data={category}/>
                    </div>
                   
                  );
             
              })
        }
    </IonContent>
   </IonPage>
  )
}

export default SubServices
