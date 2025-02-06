import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';


const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

  
const Upload = ({setImg, bgc}) => {
    const ikUploadRef =useRef(null);

    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg((prev)=>({...prev, isLoading:false, dbData:res}))
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = evt => {
        const file = evt.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
          setImg((prev) => ({
            ...prev,
            isLoading: true,
            aiData: {
              inlineData: {
                data: reader.result.split(",")[1],
                mimeType: file.type,
              },
            },
          }));
        };
        reader.readAsDataURL(file);
      };



return (
    <IKContext 
    publicKey={publicKey} 
    urlEndpoint={urlEndpoint} 
    authenticator={authenticator} 
   
  >

    <IKUpload
      fileName="test-upload.png"
      onError={onError}
      onSuccess={onSuccess}
      
      onUploadProgress={onUploadProgress}
      onUploadStart={onUploadStart}
      style={{display:"none"}}
      ref={ikUploadRef}
    />
    {
        <label className={`cursor-pointer ${bgc} rounded-full `}  onClick={()=>{
            ikUploadRef.current.click()
        }}>
            <img src="/attachment.png"  className="size-10 p-1.5" />
        </label>
    }
  </IKContext>
  )
}

export default Upload

