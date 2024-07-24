import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const allPath = `${FileSystem.documentDirectory}All`;
const imagePath = `${FileSystem.documentDirectory}Images`;

export const create_user = async () => {
  await FileSystem.makeDirectoryAsync(allPath, { intermediates: false });
  await FileSystem.makeDirectoryAsync(imagePath, { intermediates: false });
};

const splitImageUri = (imageUri) => {
  const splitImageUri = imageUri.split("/");
  const imageName = splitImageUri[splitImageUri.length-1];
  const newUri = `file:///data/user/0/com.anirudh_k.ElectroBook_Latest/cache/ImagePicker/${imageName}`;

  return newUri;
};

export const create_book = async (bookName, imageUri) => {
  const filesData = await DocumentPicker.getDocumentAsync({
    multiple: true,
    type: "application/*",
  });

  if (filesData.canceled != true) {
    const files = filesData.assets;
    const filesAdded = [];
    for (let x = 0; x < files.length; x++) {
      const uri = files[x].uri;
      const name = files.length > 1 ? files[x].name : bookName == "" ? files[x].name : bookName;
      const destinationUri = `${allPath}/${name}`;
      const imageDestinationUri=`${imagePath}/${name}`;

      await FileSystem.copyAsync({
        from: uri,
        to: destinationUri,
      });
      
      create_image(imageUri, imageDestinationUri);

      filesAdded.push(name);
    };

    return filesAdded;
  } else {
    return null;
  };
};

export const create_image = async (imageUri, imageDestinationUri) => {
  if (imageUri != "") {
    const newImageUri = splitImageUri(imageUri);
    await FileSystem.copyAsync({
      from: newImageUri,
      to: imageDestinationUri,
    });
  };
};

export const pickImage = async (handleImageSubmit) => {

  const getImageAfterPerms = async (perms) => {
    if (
      perms.accessPrivileges == "all" ||
      perms.accessPrivileges == "limited"
    ) {
      const imageData = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (imageData.canceled != true) {
        const imageUri = imageData.assets[0].uri;
        handleImageSubmit(imageUri);
        return imageUri;
      }
    } else {
      const perms = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perms.accessPrivileges != "none") {
        getImageAfterPerms(perms);
      }
    }
  };
  const perms = await ImagePicker.getMediaLibraryPermissionsAsync();
  getImageAfterPerms(perms);
};

export const delete_book = async (bookName) => {
  const deletePath = `${FileSystem.documentDirectory}All/${bookName}`;
  const imageDeletePath = `${FileSystem.documentDirectory}Images/${bookName}`;
  await FileSystem.deleteAsync(deletePath);
  await FileSystem.deleteAsync(imageDeletePath);
};

export const update_book = async (oldName, newName) => {
  await FileSystem.copyAsync({
    from: `${allPath}/${oldName}`,
    to: `${allPath}/${newName}`,
  });
};

export const delete_user = async () => {
  await FileSystem.deleteAsync(allPath);
  await FileSystem.deleteAsync(imagePath);
};
