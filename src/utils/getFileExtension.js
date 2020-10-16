export default function getFileExtension(filePath) {

    const regex = /(?:\.([^.]+))?$/

    return regex.exec(filePath)[1]

}