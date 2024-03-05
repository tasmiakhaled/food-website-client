import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

function Detection() {
    const modelRef = useRef(null);
    const labelContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [showDetectButton, setShowDetectButton] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const URL = 'https://teachablemachine.withgoogle.com/models/dBPUzWgbV/';
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        try {
            modelRef.current = await tmImage.load(modelURL, metadataURL);
            setIsModelLoaded(true);
        } catch (error) {
            console.error('Error loading model:', error);
        }
    };

    const loadImage = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImageURL(e.target.result);
                setShowDetectButton(true);

                // Clear previous prediction results when a new image is uploaded
                clearLabelContainer();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    // Helper function to clear child nodes of labelContainerRef
    const clearLabelContainer = () => {
        const labelContainer = labelContainerRef.current;
        while (labelContainer.firstChild) {
            labelContainer.removeChild(labelContainer.firstChild);
        }
    };

    const detect = () => {
        if (isModelLoaded) {
            const img = new Image();
            img.src = imageURL;

            img.onload = function () {
                predict(img);
            };
        } else {
            console.warn('Model is not loaded yet.');
        }
    };

    const predict = async (image) => {
        const predictions = await modelRef.current.predict(image);

        if (labelContainerRef.current) {
            // Clear previous predictions
            clearLabelContainer();

            // Append predictions to labelContainerRef
            predictions.forEach((prediction) => {
                const predictionElement = document.createElement('div');
                predictionElement.innerText = `${prediction.className}: ${prediction.probability.toFixed(2)}`;
                labelContainerRef.current.appendChild(predictionElement);
            });
        }
    };

    return (
        <div className='text-center'>
            <h3>Click to Detect Food</h3>
            <div className="d-flex justify-content-center">
                <div className="input-group mb-3 w-25 d-flex justify-content-center">
                    <label className="input-group-text" htmlFor="inputGroupFile02">
                        Upload
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={loadImage}
                        ref={inputRef}
                        style={{ display: 'none' }} // Hide the input element
                        id="inputGroupFile02"
                    />
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => inputRef.current.click()} // Trigger the input click when button is clicked
                    >
                        Choose File
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4">
                    {imageURL && (
                        <div style={{ marginBottom: '20px' }}>
                            <img src={imageURL} style={{ width: '300px' }} alt="Uploaded" />
                        </div>
                    )}
                    {showDetectButton && (
                        <button type="button" className="btn btn-danger" onClick={detect} style={{ marginBottom: '20px' }}>
                            Detect
                        </button>
                    )}
                </div>
                <div className="col-4">
                    <div
                        id="label-container"
                        ref={labelContainerRef}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Detection;
