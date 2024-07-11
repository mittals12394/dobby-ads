import folderOperations from "./folderOperations";
import imageOperations from "./imageOperations";
import authOperations from "./authOperations";

export default {
    ...folderOperations,
    ...imageOperations,
    ...authOperations,
}