import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import BlogWriteTextArea from './BlogWriteTextArea';
import {UploadImage, ImagePreview} from './UploadImage';
import DateUtil from '../util/DateUtil';

let IDX = 1;
let imageCnt = 0;
let textAreas = {};
const TXT = 'txt', IMG = 'img';
function BlogWrite(props) {
    const clickDelete = (e) => {
        const id = e.target.id;
        setPreviewDeleteId(id);
    }

    const setTxt = (idx, txt) => {
        textAreas[idx] = txt;
    }
    const getTextArea = (idx) => {
        return <BlogWriteTextArea type={TXT} key={idx} idx={idx} clickDelete={clickDelete} setTxt={setTxt}/>;
    }
    // const isDeleteImage = (element) => {
    //     return element === image;
    // };
    const deleteFunc = (image) => {
        // 지금 문제 : deleteFunc를 실행하는 시점의 uploadedImages가 현재의 것이 아니라, 
        //          이 컴포넌트 만들 시점의 것을 참조하고 있음.(삭제하려는 것까지만 추가되어 있는 시점임.)
        // const startIdx = uploadedImages.findIndex(isDeleteImage);
        // 여기 uploadedImages를 현재의 것으로 참조할 수 있는 방법은..?
        const startIdx = uploadedImages.findIndex((element) => {
            return element === image;
        });
        setLoadedDeleteId(startIdx);
    };
    const getPreviewImage = (idx, image, deleteFunc) => {
        return <ImagePreview type={IMG} image={image} key={idx} idx={idx} clickDelete={(e) => {deleteFunc(image);clickDelete(e);}}/>;
    }
    // const getImageUploader = (idx) => {
    //     const iu = <UploadImage key={idx} idx={idx} clickDelete={clickDelete} />
    //     return iu;
    // }

    const [uploadedImages, setUploadedImages] = useState([]);
    const [postingArea, setPostingArea] = useState([getTextArea(0)]);
    const [previewDeleteId, setPreviewDeleteId] = useState();
    const [loadedDeleteId, setLoadedDeleteId] = useState();
    const title = useRef();
    let textArr = postingArea;

    const padding = 60;

    useEffect(() => {
        return () => {
            IDX = 1;
            imageCnt = 0;
            textAreas = {};
        }
    }, []);
    useEffect(() => {
        deleteTextArea();
    }, [previewDeleteId]);

    useEffect(() => {
        uploadedImages.splice(loadedDeleteId, 1);
        setUploadedImages([...uploadedImages]);
    }, [loadedDeleteId]);

    useEffect(() => {
        // uploadedImages에 맞춰 previewImages 생성
        let idx = 1;
        // const imageJSXs = uploadedImages.map((image) => {
        const imageJSXs = [];
        uploadedImages.forEach((obj) => {
            const image = obj.reader;
            if(imageCnt < idx++) imageJSXs.push(getPreviewImage(IDX++, image, deleteFunc));
            // return getPreviewImage(IDX++, image);
        });
        textArr.push(...imageJSXs);
        setPostingArea([...textArr]);
        imageCnt += imageJSXs.length;
        console.log('update uploladedImages', uploadedImages);
      }, [uploadedImages]);

    /* 
     버튼으로 textArea, Image 추가하도록 한 이유
     기존 블로그들처럼 text와 image가 어울려서 있으려면 Html 형식으로 저장해야 함.
     (글자 따로, 이미지 따로 저장하면 이미지가 어디에 들어가는지 확인할 수 없으므로.)
     라이브러리 쓰지 않고 수정과 등록을 할 수 있는 방법은 문단별로 텍스트를 쉽게 수정할 수 있어야 하고
     image와 text의 순서를 사용자가 정할 수 있어야 한다.
     그래서 이미지와 이미지 사이의 텍스트를 하나의 textarea로 각각 관리함으로써
     바로바로 수정도 되고, 전체적인 순서 저장도 용이하도록 함.

     -- 티스토리 개발자도구 관찰
     커서가 있는 게 아니라 커서처럼 보이도록 css, js로 한 거 같음.
     입력받아서 엔터 치면 p태그 생성, 내용 쓰면 그 안에 내용값 넣기.
     문제는 수정 시 해당 글자를 클릭하면 그 부분을 입력한 텍스트 값에서 찾아야 함.
     시간이 꽤 걸릴 거 같으므로 보류
    */

    // useEffect(() => {
    //     postingArea[postingArea.length-1].
    // }, []);

    const addTextArea = () => {
        textArr.push(getTextArea(IDX++));
        setPostingArea([...textArr]);
    }

    const deleteTextArea = () => {
        let idx;
        if(previewDeleteId) {
            let _idx = 0;
            textArr.filter((textArea) => {
                if(textArea.key == previewDeleteId) {
                    idx = _idx;
                    return;
                }
                _idx++;
            });
            textArr.splice(idx, 1);
            setPostingArea([...textArr]);
        }
    }

    // const addImage = () => {
    //     textArr.push(getImageUploader(IDX++));
    //     setPostingArea([...textArr]);
    // }

    // 제목 작성 시 엔터 입력되지 않도록 함.
    const checkEnter = (e) => {
        if(e.key == 'Enter') e.nativeEvent.returnValue = false;
    }

    // textErea height 조절
    const setTitleHeight = (e) => {
        e.target.style.height = 'auto'; //height 초기화
        e.target.style.height = (e.target.scrollHeight - padding) + 'px';
    }

    const validationCheck = () => {
        console.log(postingArea, textAreas);
        if(title.current.value == null || title.current.value == '') {
            return false;
        } else if (uploadedImages.length == 0 && Object.keys(textAreas).length == 0) {
            return false;
        }
        return true;
    }

    const submit = (e) => {
        // 이미지 위치를 db에 저장해야하므로 여기서 content와 imageIdx를 같이 보내면 얀 됨.
        e.preventDefault();
        if(!validationCheck()) {
            alert('제목, 내용을 모두 입력하세요');
            return;
        };
        const formData = new FormData();
        formData.append('content', JSON.stringify(textAreas));
        formData.append('title', title.current.value);
        const utc = DateUtil.getUtc(new Date());
        formData.append('date', DateUtil.getDate(utc, "desc"));
        formData.append('sq', `SQ_${utc}`);
        const imgs = [];
        uploadedImages.forEach((img) => {
            const idx = postingArea.findIndex((element) => {
                return element.props.type == IMG && element.props.image === img.reader;
            });
            imgs.push(idx);
            formData.append('file', img.file);
        });
        formData.append('imageIdx', imgs);
        axios.post("/api/uploadImage", formData).then((res) => {
            console.log(res);
            const sq = res.data.param[0];
            props.setSelectedPost(sq);
        });
    }

    return (
        <div className="blog-write">
            <div className="blog-write-area">
                <div className="blog-write-title">
                    <textarea className='blog-write-title-input input-text' ref={title} type='text' placeholder='title' onKeyPress={checkEnter} onChange={setTitleHeight} rows={1}></textarea>
                </div>
                <div className="blog-write-content">
                    {postingArea}
                </div>
            </div>
            <UploadImage setUploadedImages={setUploadedImages} />
            <div className="blog-write-button">
                <div className="add-textarea btn" onClick={addTextArea}> + TEXT</div>
                <div className="submit-posting btn" onClick={submit} >SUBMIT</div>
                {/* <div className="add-image" onClick={addImage}>드래그하거나 <br /> 클릭하여<br />이미지 추가</div> */}
            </div>
            {/* <textarea className='input-text' onKeyDown={handleOnKeyPress}/> */}
        </div>
    );
}

export default BlogWrite;