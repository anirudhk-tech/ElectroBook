// React
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

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
import { useProgressBarAnimation } from '../../hooks/useAnimation';



export const ElectroReadingProgressBar = () => {
    const { primaryColor } = useColor();
    const { bookName } = useBookName();
    const { speed } = useSpeed();
    const { editRefresh, setEditRefresh } = useEditRefresh();
    const { setProgressBarComplete } = useProgressBarAnimation();
    const [bookInfo, setBookInfo] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [pageRead, setPageRead] = useState(0);
    const [readTime, setReadTime] = useState(0);
    const barPercentage = (pageRead/pageCount) * 100;

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

    const handleAnimationEnd = () => {
      setProgressBarComplete(true);
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo.imageUri != undefined && bookInfo.library != null) {
            setPageCount(bookInfo.pageCount);
            setPageRead(bookInfo.page);
        };
    }, [bookInfo]);

    useEffect(() => {
      const readTime = Math.round(((pageCount - pageRead) * 300)/speed);
      setReadTime(readTime)
      if (barPercentage == 100) {
        useBookUpdate("completed", bookName, "true");
        setEditRefresh();
      } else {
        useBookUpdate("completed", bookName, "false");
        setEditRefresh();
      }
    }, [pageRead]);
  
    return (
      <View style={styles.readingProgressBarMainView}>
        <Animatable.Text
        animation={"fadeIn"}
        easing={"easeIn"}
        useNativeDriver={true}
        style={[styles.readingProgressBarText, {color: primaryColor}]}
          >Read Time: {readTime} min</Animatable.Text>
        <View 
          style={[styles.readingProgressBarView, { borderColor: primaryColor }]}>
          <Animatable.View
            animation={slideIntoFill}
            easing={"ease-in"}
            delay={500}
            onAnimationEnd={handleAnimationEnd}
            style={[
              styles.progressBarView,
              { width: `${barPercentage}%`, backgroundColor: primaryColor },
            ]}
          ></Animatable.View>
        </View>
      </View>
    );
};