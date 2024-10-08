import * as useFile from "../hooks/useFile";


export const useFileFunctions = (type) => {
  if (type == "title") {
    const { title, setTitle } = useFile.useTitle((state) => ({
      title: state.title,
      setTitle: state.setTitle,
    }));
    return {value: title, setValue: setTitle};
  } else if (type == "genre") {
    const { genres, addGenres, removeGenres, clearGenres } = useFile.useGenres(
      (state) => ({
        genres: state.genres,
        addGenres: state.addGenres,
        removeGenres: state.removeGenres,
        clearGenres: state.clearGenres,
      })
    );
    return {value: genres, setValue: addGenres, removeValue: removeGenres, clearValue: clearGenres};
  } else if (type == "trope") {
    const { tropes, addTropes, removeTropes, clearTropes } = useFile.useTropes(
      (state) => ({
        tropes: state.tropes,
        addTropes: state.addTropes,
        removeTropes: state.removeTropes,
        clearTropes: state.clearTropes,
      })
    );
    return {value: tropes, setValue: addTropes, removeValue: removeTropes, clearValue: clearTropes};
  } else if (type == "library") {
    const { library, setLibrary } = useFile.useLibrary((state) => ({
      library: state.library,
      setLibrary: state.setLibrary,
    }));
    return {value: library, setValue: setLibrary};
  } else if (type == "author") {
    const { author, setAuthor } = useFile.useAuthor((state) => ({
      author: state.author,
      setAuthor: state.setAuthor,
    }));
    return {value: author, setValue: setAuthor};
  } else if (type == "series") {
    const { series, setSeries } = useFile.useSeries((state) => ({
      series: state.series,
      setSeries: state.setSeries,
    }));
    return {value: series, setValue: setSeries};
  } else if (type == "fileColor") {
    const { fileColor, setFileColor } = useFile.useFileColor((state) => ({
      fileColor: state.fileColor,
      setFileColor: state.setFileColor,
    }));
    return {value: fileColor, setValue: setFileColor};
  } else if (type == "note") {
    const { notes, addNotes, removeNotes, clearNotes, editNote } = useFile.useNotes((state) => ({
        notes: state.notes,
        addNotes: state.addNotes,
        removeNotes: state.removeNotes,
        editNote: state.editNote,
        clearNotes: state.clearNotes,
      }));
    return {notes: notes, addNote: addNotes, removeNote: removeNotes, clearNotes: clearNotes, editNote: editNote};
  } else if (type == "image") {
    const { imageUri, setImageUri } = useFile.useImage((state) => ({
      imageUri: state.imageUri,
      setImageUri: state.setImageUri,
    }));
    return {value: imageUri, setValue: setImageUri};
  }
};
