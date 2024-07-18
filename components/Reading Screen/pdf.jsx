// Node Modules
import Pdf from "react-native-pdf";
import MultiTap from "react-native-multitap";

// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

export const ElectroPdf = (props) => {
  return (
    <MultiTap
      onSingleTap={() => {
        props.singleTap();
      }}
      onDoubleTap={() => {
        props.doubleTap();
      }}
      onTripleTap={() => {
        props.tripleTap();
      }}
      delay={650}
      style={styles.fullScreen}
    >
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
        />
      </View>
    </MultiTap>
  );
};
