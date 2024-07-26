// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import Pdf from "react-native-pdf";

export const ElectroReadingTestPDF = (props) => {
    return (
        <View style={styles.electroPdfMainView}>
            <Pdf
            trustAllCerts={false}
            enableDoubleTapZoom={false}
            minScale={1.0}
            scale={1.0}
            maxScale={10.0}
            source={require("../../assets/ElectroPdf.pdf")}
            style={styles.electroPdf}
            onPageSingleTap={props.handleSinglePress}
            />
        </View>
    );
};