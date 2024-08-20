// Node Modules
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";

// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { usePdf } from "../../hooks/usePdf";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useBookName } from "../../hooks/useBookName";
import { useOrientation } from "../../hooks/useOrientation";


export const ElectroPdf = (props) => {
  const { bgColor, singlePage, headToPage } = usePdf();
  const { bookName } = useBookName();
  const { orient } = useOrientation();
  const source = `${FileSystem.documentDirectory}All/${bookName}`
  const handleSingleTap = () => {
    props.onSingleTap();
  };
  
  const setPagesCount = (count) => {
    useBookUpdate("pageCount", bookName, parseInt(count));
  };



  return (
      <View style={styles.electroPdfMainView}>
        <Pdf
          page={headToPage == null ? props.page : headToPage}
          trustAllCerts={false}
          enableDoubleTapZoom={false}
          minScale={1.0}
          scale={orient == "potraitUp" ? 1.0 : 2.0}
          maxScale={10.0}
          onPageChanged={(e) => props.onPageChange(e)}
          source={{ uri: source }}
          style={[styles.electroPdf, { backgroundColor: bgColor }]}
          onPageSingleTap={handleSingleTap}
          enablePaging={singlePage}
          onLoadComplete={(e) => setPagesCount(e)}
        />
      </View>
  );
};
