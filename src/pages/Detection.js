import React, { useState } from 'react';
import '../styles/detection.scss';
import * as tmImage from '@teachablemachine/image';

const Detection = () => {
    const URL = "https://teachablemachine.withgoogle.com/models/dBPUzWgbV/";
    const [selectedImage, setSelectedImage] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    let model, webcam, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        setModelLoaded(true);
    }

    async function predict(image) {
        if (!modelLoaded) {
            await init();
        }
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(image);
        const results = [];
        for (let i = 0; i < maxPredictions; i++) {
            results.push({
                className: prediction[i].className,
                probability: prediction[i].probability.toFixed(2)
            });
        }
        return results;
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const image = await loadSelectedImage(file);
            setSelectedImage(image);
            const result = await predict(image);
            setPredictionResult(result);
        }
    };

    const loadSelectedImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <div className='text-center'>
                <h3>Click to detect food</h3>
                <div className="d-flex justify-content-evenly">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <button className="custom-button mb-3" type="button" onClick={init}>
                        Open Camera
                    </button>
                </div>
                {selectedImage && (
                    <div>
                        <img src={selectedImage.src} alt="Uploaded" />
                        {predictionResult && (
                            <ul>
                                {predictionResult.map((result, index) => (
                                    <li key={index}>
                                        {result.className}: {result.probability}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
            <div className='d-flex justify-content-center'>
                <div id="webcam-container" style={{ marginRight: '10px' }}></div>
                <div id="label-container"></div>
            </div>
        </>
    )
}

export default Detection;
