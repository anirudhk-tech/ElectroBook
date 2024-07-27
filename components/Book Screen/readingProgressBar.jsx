// React
import { useState, useEffect } from 'react';
import { View } from 'react-native';

// Node Modules
import * as Animatable from "react-native-animatable";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from '../../hooks/useBookInfo';
import { useBookName } from '../../hooks/useBookName';
import { useEditRefresh } from '../../hooks/useEdit';
import { useBookUpdate } from '../../hooks/useBookUpdate';
import { useSpeed } from "../../hooks/useSpeed";



export const ElectroReadingProgressBar = () => {
    const { primaryColor } = useColor();
    const { bookName } = useBookName();
    const { speed } = useSpeed();
    const { 
      editRefreshCompleted, 
      setEditRefreshCompleted, 
      editRefreshPage 
    } = useEditRefresh();
    const [bookInfo, setBookInfo] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [pageRead, setPageRead] = useState(0);
    const [readTime, setReadTime] = useState(0);
    const [barPercentage, setBarPercentage] = useState(0);

    const setUpBar = () => {
      const readTime = speed == undefined ? "Not Available" : Math.round(((pageCount - pageRead) * 300)/speed);
      const barPercentage = pageCount == null ? 0 : (pageRead/pageCount) * 100;
      setReadTime(readTime);
      setBarPercentage(barPercentage);

      if (barPercentage == 100) {
        useBookUpdate("completed", bookName, "true");
        console.log("True: "+bookName)
        setEditRefreshCompleted();
      } else {
        useBookUpdate("completed", bookName, "false");
        console.log("False: "+bookName)
        setEditRefreshCompleted();
      };
    };

    const slideIntoFill = {
        0: {
          width: "0%"
        },
        0.2: {
          width: `${parseInt(barPercentage)/8}%`
        },
        0.4: {
          width: `${parseInt(barPercentage)/6}%`
        },
        0.6: {
          width: `${parseInt(barPercentage)/4}%`
        },
        0.8: {
          width: `${parseInt(barPercentage)/2}%`
        },
        1: {
          width: `${barPercentage}%`
        },
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefreshCompleted, editRefreshPage]);

    useEffect(() => {
        if (bookInfo != null && bookInfo.length != 0) {
            setPageCount(bookInfo.pageCount);
            setPageRead(bookInfo.page);
        };
    }, [bookInfo]);

    useEffect(() => {
      try {
        setUpBar()
      } catch {
        setUpBar()
      };
    }, [pageRead, pageCount]);
    

    return (
      <View style={styles.readingProgressBarMainView}>
        <Animatable.Text
        animation={"fadeIn"}
        useNativeDriver={true}
        style={[styles.readingProgressBarText, {color: primaryColor}]}
          >{readTime == "Not Available" ? "Reading Time Unknown" : pageCount == undefined ? "Open PDF to calculate read time" : `Read Time: ${readTime} min`}</Animatable.Text>
        <View 
          style={[styles.readingProgressBarView, { borderColor: primaryColor }]}>
          <Animatable.View
            animation={slideIntoFill}
            easing={"easeIn"}
            delay={500}
            style={[
              styles.progressBarView,
              { width: `${barPercentage}%`, backgroundColor: primaryColor },
            ]}
          ></Animatable.View>
        </View>
      </View>
    );
};