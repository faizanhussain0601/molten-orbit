'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/canvasUtils';

export default function ImageCropper({ imageSrc, onCropComplete, onCancel, aspect = 4 / 3 }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (location) => {
        setCrop(location);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImageBlob = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels
                );
                if (croppedImageBlob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(croppedImageBlob);
                    reader.onloadend = () => {
                        onCropComplete(reader.result);
                    };
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [imageSrc, croppedAreaPixels, onCropComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-2xl h-96 bg-white rounded-lg overflow-hidden flex flex-col">
                <div className="relative flex-1 bg-gray-900">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteCallback}
                        onZoomChange={onZoomChange}
                    />
                </div>
                <div className="p-4 flex justify-between items-center bg-white">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-32"
                        />
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={showCroppedImage}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Crop & Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
