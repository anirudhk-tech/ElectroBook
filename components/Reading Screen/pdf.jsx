// Node Modules
import Pdf from "react-native-pdf";

// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { usePdf } from "../../hooks/usePdf";
import { useEffect, useState } from "react";


export const ElectroPdf = (props) => {

  const { bgColor, singlePage, headToPage } = usePdf();

  const handleSingleTap = () => {
    props.onSingleTap();
  };




  return (
      <View style={styles.electroPdfMainView}>
        <Pdf
          page={headToPage == null ? props.page : headToPage}
          trustAllCerts={false}
          enableDoubleTapZoom={false}
          minScale={1.0}
          scale={1.0}
          maxScale={10.0}
          onPageChanged={(e) => props.onPageChange(e)}
          source={
            props.readingTest
              ? require("../../assets/ElectroPdf.pdf")
              : { uri: props.source }
          }
          style={[styles.electroPdf, { backgroundColor: bgColor }]}
          onPageSingleTap={handleSingleTap}
          enablePaging={singlePage}
        />
      </View>
  );
};
