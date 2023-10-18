import Dropzone from 'react-dropzone'
import closeIcon from '../../shared/icons/delete-icon.svg'

export default function DropZone({ photos, setPhotos }) {
    const onDelete = (itemToDelete) => {
        const updatedFiles = photos.filter((item) => item !== itemToDelete)
        setPhotos(updatedFiles)
    }
    return (
        <div className="dropzone-block">
            <Dropzone onDrop={(acceptedFiles) => setPhotos((prev) => [...prev, ...acceptedFiles])}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Выберите фото или перетащите сюда</p>
                    </div>
                )}
            </Dropzone>
            <div className="photo-block">
                {photos.map((item, index) => {
                    return (
                        <div className="" key={index}>
                            <img
                                className="photo"
                                src={URL.createObjectURL(item)}
                                alt={item.name}
                                width={134}
                                height={81}
                            />
                            <button
                                className="photo__delete-icon"
                                onClick={() => onDelete(item)}
                                aria-label="Закрыть"
                                role="button"
                                type="button">
                                <img src={closeIcon} alt="close" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
