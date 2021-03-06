import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import './carousel.css'
function FileUpload(props) {
    
    var Url =window.location.protocol + '//' + window.location.host
    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files[0])
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/products/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    var replaceStr = "\\"
                    setImages([...Images, response.data.url])
                    var newUrl = response.data.url.replace(/\//g,replaceStr)
                    console.log('this is the new Url', newUrl)
                    props.refreshFunction([...Images, newUrl])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

  

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', flexWrap:"wrap",justifyContent: 'center' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',margin: '10px'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div className="carousel" style={{ display: 'flex', width: '350px', height: '260px', overflowX: 'scroll',margin: '10px'}}>

                {Images.map((image, index) => (
                    <div  onClick={() => onDelete(image)}>
                        
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${Url}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
