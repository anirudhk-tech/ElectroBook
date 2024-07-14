import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const allPath = `${FileSystem.documentDirectory}All`;
const imagePath = `${FileSystem.documentDirectory}Images`;

export const create_user = async () => {
  await FileSystem.makeDirectoryAsync(allPath, { intermediates: false });
  await FileSystem.makeDirectoryAsync(imagePath, { intermediates: false });
  await FileSystem.makeDirectoryAsync(`${allPath}/Completed`, {
    intermediates: false,
  });
};

export const create_library = async (libName) => {
  await FileSystem.makeDirectoryAsync(`${allPath}/${libName}`);
};

export const create_book = async (bookName, libName, imageUri) => {
  const filesData = await DocumentPicker.getDocumentAsync({
    multiple: true,
    type: "application/*",
  });

  if (filesData.canceled != true) {
    const files = filesData.assets;
    if (files.length > 1) {
      for (let x = 0; x < files.length; x++) {
        const uri = files[x];
        const destinationUri =
          libName == "All"
            ? `${allPath}/${bookName}`
            : `${allPath}/${libName}/${bookName}`;
        await FileSystem.copyAsync({
          from: uri,
          to: destinationUri,
        });
      }
    } else {
      const file = filesData.assets;
      const uri = file.uri;
      const destinationUri =
        libName == "All"
          ? `${allPath}/${bookName}`
          : `${allPath}/${libName}/${bookName}`;
      const imageDestinationUri = imagePath;
      await FileSystem.copyAsync({
        from: uri,
        to: destinationUri,
      });
      await FileSystem.copyAsync({
        from: imageUri,
        to: imageDestinationUri,
      });
    }
  } else {
    return null;
  }
};

export const pickImage = async () => {
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

export const delete_book = async (lib, bookName) => {
  const deletePath =
    lib == "All"
      ? `${FileSystem.documentDirectory}All/${bookName}`
      : `${FileSystem.documentDirectory}All/${lib}/${bookName}`;
  await FileSystem.deleteAsync(deletePath);
};

export const update_lib = async (lib, newLib) => {
  const files = await FileSystem.readDirectoryAsync(`${allPath}/${lib}`);
  for (let x = 0; x < files.length; x++) {
    await FileSystem.copyAsync({
      from: `${allPath}/${lib}/${files[x]}`,
      to: `${allPath}/${newLib}/${files[x]}`,
    });
  }
  await FileSystem.deleteAsync(`${allPath}/${lib}`);
};

export const delete_lib = async (lib, newLib) => {
  if (newLib) {
    update_lib(lib, newLib);
  } else {
    await FileSystem.deleteAsync(`${allPath}/${lib}`);
  }
};

export const delete_user = async () => {
  await FileSystem.deleteAsync(allPath);
  await FileSystem.deleteAsync(imagePath);
};
