// Node Modules
import Pdf from "react-native-pdf";

// React
import { View } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

export const ElectroPdf = (props) => {
  
  const handleSingleTap = () => {
    props.onSingleTap();
  };

  return (
      <View style={styles.electroPdfMainView}>
        <Pdf
          trustAllCerts={false}
          enableDoubleTapZoom={false}
          minScale={1.0}
          scale={1.0}
          maxScale={10.0}
          source={
            props.readingTest
              ? require("../../assets/ElectroPdf.pdf")
              : { uri: props.source }
          }
          style={[styles.electroPdf, { backgroundColor: props.bgColor }]}
          onPageSingleTap={handleSingleTap}
        />
      </View>
  );
};
