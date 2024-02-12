import closeButton from '../resource/images/closeButton.png';
import {useState, useEffect, useRef} from 'react';
function UploadImage(props) {
    const max = 10;
    
    // const [previewImages, setPreviewImages] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        // return 부분에서 uploadBoxRef.current로 직접 갖다 쓰면 이미 상태가 바뀌었을 확률이 있으므로
        // 변수에 할당하여 사용.
        const uploadBox = uploadBoxRef.current;
        const input = inputRef.current;
        
        // 
        const handleFiles = (files) => {
            // files는 index를 key값으로 하는 object.
            for (const file of files) {
                // image type인지 확인
                if (!file.type.startsWith("image/")) continue;
                const reader = new FileReader();
                // image가 load된 후 콜백함수
                reader.onloadend = (e) => {
                    const result = {
                        file: file,
                        reader: e.target.result
                    };
                    if (result) {
                        // 최대 갯수 넘지 않도록
                        // state가 아니라 uploadedImages로 state를 가져와서 쓰면 일부만 저장된다.
                        // (실행되는 시점의 state와 변경되는 시점의 state가 꼬이나 봄)
                        // 그래서 함수 인자로 state를 써주면 해당 시점의 state를 기준으로 함.
                        // upload된 이미지로 preview 컴
                        props.setUploadedImages((state) => {
                            const _result = [...state, result].slice(0, max);
                            return _result;
                        });
                    }
                };
                // 이미지 load
                reader.readAsDataURL(file);
            }
        };
        
        // 이벤트 기본 동작 방지 후 파일을 가져와 handleFiles로 넘김.
        const changeHandler = (event) => {
            console.log('changeHandler');
            console.log(event);
            const files = event.target.files;
            handleFiles(files);
        };
        
        const dropHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const files = event.dataTransfer.files;
            handleFiles(files);
            // input.value = files;
        };
        
        const dragOverHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const clickUploadBox = (e) => inputRef.current.click(e);
        
        uploadBox.addEventListener("drop", dropHandler);
        uploadBox.addEventListener("dragover", dragOverHandler);
        input.addEventListener("change", changeHandler);
        uploadBox.addEventListener("click", clickUploadBox);
        
        return () => {
            uploadBox.removeEventListener("drop", dropHandler);
            uploadBox.removeEventListener("dragover", dragOverHandler);
            input.removeEventListener("change", changeHandler);
            uploadBox.removeEventListener('click', clickUploadBox);
        };
      }, [max]);
      
      // useEffect(() => {
      //   // uploadedImages에 맞춰 previewImages 생성
      //   const imageJSXs = uploadedImages.map((image, index) => {
      //   //   const isDeleteImage = (element) => {
      //   //     return element === image;
      //   //   };
      //   //   const deleteFunc = () => {
      //   //     uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
      //   //     setUploadedImages([...uploadedImages]);
      //   //   };
      //       const preview = <ImagePreview image={image} key={index} />;
      //     return preview;
      //   });
      //   props.setPreviewImages(imageJSXs);
      // }, [uploadedImages]);

      // useEffect(() => {
      //   props.setPreviewImages()
      // },[previewImages]);

    return (
        <div className='upload-image' id={props.idx}>
            {/* <div className='blog-text-area-delete' onClick={props.clickDelete}>
                <img alt="X" src={closeButton} id={props.idx}/>
            </div> */}
            <div className='upload-image-box' ref={uploadBoxRef}>
                + IMAGE<br /> DRAG AND DROP
            </div>
            {/* <input className='test' type='file' accept="image/*" name='file' id={props.idx} ref={inputRef} style={{height: '30px'}}></input> */}
            <input className='upload-image-input' type='file' accept="image/*" name='file' id={props.idx} ref={inputRef}></input>
            {/* <div className='upload-image-preview'>
                {previewImages}
            </div> */}
        </div>
    );

}

// image preview component
function ImagePreview(props) {
    return (
        <div id={props.idx} className='image-preview' draggable>
            <div id={props.idx} className='blog-text-area-delete' onClick={props.clickDelete}>
                <img alt="X" src={closeButton} id={props.idx}/>
            </div>
            <img src={props.image} alt='preview' />
        </div>
    );
}

export { UploadImage, ImagePreview };