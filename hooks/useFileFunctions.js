import * as useFile from "../hooks/useFile";

export const useFileFunctions = (type) => {
  if (type == "title") {
    const { title, setTitle } = useFile.useTitle((state) => ({
      title: state.title,
      setTitle: state.setTitle,
    }));
    return [title, setTitle];
  } else if (type == "genre") {
    const { genres, addGenres, removeGenres, clearGenres } = useFile.useGenres(
      (state) => ({
        genres: state.genres,
        addGenres: state.addGenres,
        removeGenres: state.removeGenres,
        clearGenres: state.clearGenres,
      })
    );
    return [genres, addGenres, removeGenres, clearGenres];
  } else if (type == "trope") {
    const { tropes, addTropes, removeTropes, clearTropes } = useFile.useTropes(
      (state) => ({
        tropes: state.tropes,
        addTropes: state.addTropes,
        removeTropes: state.removeTropes,
        clearTropes: state.clearTropes,
      })
    );
    return [tropes, addTropes, removeTropes, clearTropes];
  } else if (type == "library") {
    const { library, setLibrary } = useFile.useLibrary((state) => ({
      library: state.library,
      setLibrary: state.setLibrary,
    }));
    return [library, setLibrary];
  } else if (type == "author") {
    const { author, setAuthor } = useFile.useAuthor((state) => ({
      author: state.author,
      setAuthor: state.setAuthor,
    }));
    return [author, setAuthor];
  } else if (type == "series") {
    const { series, setSeries } = useFile.useSeries((state) => ({
      series: state.series,
      setSeries: state.setSeries,
    }));
    return [series, setSeries];
  } else if (type == "color") {
    const { color, setColor } = useFile.useFileColor((state) => ({
      color: state.color,
      setColor: state.setColor,
    }));
    return [color, setColor];
  } else if (type == "note") {
    const { notes, addNotes, removeNotes, clearNotes, editNote } =
      useFile.useNotes((state) => ({
        notes: state.notes,
        addNotes: state.addNotes,
        removeNotes: state.removeNotes,
        editNote: state.editNote,
        clearNotes: state.clearNotes,
      }));
    return [notes, addNotes, removeNotes, clearNotes, editNote];
  }
};
