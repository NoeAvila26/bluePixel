import Card from "./Card";
import PreviewContext from "./PreviewContext";
import PreviewDialog from "./PreviewDialog";

const fileLabelHelper = (file, plural = false) => {
    const classId = file.type.class.id;
    if (classId === '2') return plural ? 'unas imágenes' : 'una imagen';
    if (classId === '3') return plural ? 'unos documentos' : 'un documento';
    if (classId === '4') return plural ? 'unos videos' : 'un video';
    if (classId === '5') return plural ? 'unos audios' : 'una audio';
    return plural ? 'unos archivos' : 'un archivo';
};

export default {
    Card,
    PreviewContext,
    PreviewDialog
};

export {
    Card,
    PreviewContext,
    PreviewDialog,
    fileLabelHelper
};
