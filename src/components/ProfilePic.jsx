import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from './setCanvasPreview';
import styles from './ProfilePic.module.css'
import { useRef, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MIN_DIMENSION=150;
const ASPECT_RATIO=1;

const ProfilePic = () => {
    const imgRef=useRef(null);
    const previousCanvasRef=useRef(null);
    const [imgSrc,setImgSrc]=useState("");
    const [crop,setCrop]=useState();
    const [showUploadBtn,setShowUploadBtn]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const onSelectFile=(e)=>{
        const file=e.target.files?.[0];
        if(!file) return;
        const reader=new FileReader();
        reader.addEventListener('load',()=>{
            const imageUrl = reader.result?.toString() || "";
            setImgSrc(imageUrl);
        })
        reader.readAsDataURL(file);
    }
    const onImageLoad=(e)=>{
        const {width,height}=e.currentTarget;
        const cropWidthInPercent=(MIN_DIMENSION/width)*100;
        const crop=makeAspectCrop(
            {
                unit:'%',
                width:cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }
  return (
    <div className={styles.mainPic}>
    <div className={styles.choosePhotoDiv}>
        <label>
            <span>Choose Profile Pic</span>
            <input type="file"  accept="image/*"
            onChange={onSelectFile} />
            <span onClick={()=>{
                navigate('/users',{state:{username:location.state.username}});
            }}className={styles.skipBtn}>Skip</span>
        </label>
        
    </div>
    {imgSrc&&
    <div>
        <ReactCrop
        crop={crop}
        onChange={
            (pixelCrop,percentCrop)=>setCrop(percentCrop)
        }
        circularCrop
        keepSelection
        aspect={ASPECT_RATIO}
        minWidth={MIN_DIMENSION}>
            <img src={imgSrc} ref={imgRef} alt="upload" style={{maxHeight:"70vh"}} onLoad={onImageLoad}/>
        </ReactCrop>
        <div className={styles.cropBtns}>
            <button
            onClick={()=>{
                setCanvasPreview(
                    imgRef.current,
                    previousCanvasRef.current,
                    convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                    )
                );
                setShowUploadBtn(true);
            }}>crop Image</button>
            {showUploadBtn&&<button
            onClick={async ()=>{
                const dataUrl=previousCanvasRef.current.toDataURL();
                const response=await axios.post('http://localhost:4000/profilepic',
                {imageUrl:dataUrl},
                {withCredentials:true}
                ) ;
                if(response.data.message=='successfully added profile pic'){
                    navigate('/users',{state:{username:location.state.username,myimageUrl:response.data.imageUrl}});
                }
            }
            }>Upload profile pic</button>}
        </div>
    </div>
    }
    {crop&&
        <canvas
        ref={previousCanvasRef}
        style={{
            border:'1px solid black',
            objectFit:'contain',
            width:150,
            height:150
        }}/>
    }
    </div>
  )
}

export default ProfilePic
