export const uploadFileToCloudinary = async (file, resourceType = 'auto') => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary env variables are missing');
    }

    const MAX_SIZE_BYTES = 1024 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
        throw new Error(`File Size is too large! Max 10 MB will be uploaded.`);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error?.message || 'File upload failed');
    }

    let finalUrl = data.secure_url;

    if (resourceType === 'raw' && file.name.endsWith('.pdf') && !finalUrl.endsWith('.pdf')) {
        finalUrl += '.pdf';
    }

    return finalUrl;
};