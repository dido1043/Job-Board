export default function resumeDownloader(resume) {
    if (!resume.filePath) return;

    try {
        const base64 = resume.filePath.split(',')[1];
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = resume.title || 'resume.pdf';
        link.click();

        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.log("Failed to download PDF:", error);
    }
}