import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import icon from "../../../../assets/appLogoX.png";
import img7 from "../../../../assets/hampton1.jpg";
import img5 from "../../../../assets/hampton2.jpg";
import img3 from "../../../../assets/hampton3.jpg";
import img1 from "../../../../assets/hampton4.jpg";
import img2 from "../../../../assets/hampton5.jpg";
import img6 from "../../../../assets/hampton6.jpg";
import img4 from "../../../../assets/hampton7.jpg";
import { getData, storeData } from "../../../util/LocalStorage";
import { USERINFO } from "../../../enums/StorageKeysEnum";
import moment from "moment";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const font = Platform.OS === "ios" ? "Helvetica" : "Roboto";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      loading: true,
      activeIndex: 0,
      carouselItems: [
        {
          src: img1,
        },
        {
          src: img2,
        },
        {
          src: img3,
        },
        {
          src: img4,
        },
        {
          src: img5,
        },
        {
          src: img6,
        },
        {
          src: img7,
        },
      ],
    };
  }

  componentDidMount() {
    this.getUserInfo()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((e) => console.log(e));
  }

  async getUserInfo() {
    let userInfo = await getData(USERINFO);
    this.setState({ fullname: userInfo.profile.fullname });
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.cardView}>
        <Image
          source={item.src}
          style={{ flex: 1, width: screenWidth - 30, bottom: 5 }}
          resizeMode="cover"
        ></Image>
        <Text
          style={{
            fontFamily: font,
            fontSize: 20,
            alignItems: "center",
            textAlign: "center",
            marginLeft: "1%",
            marginRight: "1%",
            marginBottom: "1%",
            alignContent: "center",
            color: "#006400",
          }}
        >
          Building A Better, Stronger Neighborhood for All Of Our Current and
          Future Families
        </Text>
      </View>
    );
  }

  render() {
    this.renderView();
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <ActivityIndicator size="large" color="#70AF1A" />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
          <View style={{ alignItems: "center" }}>
            <Image source={icon} style={styles.logo}></Image>
            <View style={styles.welcomeCard}>
              <Text style={{ fontFamily: font, fontSize: 20, top: 10, left: 5 }}>
                Good {this.getGreetingTime(moment())}, {this.state.fullname}
              </Text>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Carousel
              layout={"default"}
              ref={(ref) => (this.carousel = ref)}
              data={this.state.carouselItems}
              layout={"tinder"}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              autoplay={true}
              loop={true}
              autoplayDelay={3000}
              autoplayInterval={5000}
              renderItem={this._renderItem}
              onSnapToItem={(index) => this.setState({ activeIndex: index })}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  getGreetingTime(m) {
    var g = null; //return g

    if (!m || !m.isValid()) {
      return;
    }

    var split_afternoon = 12;
    var split_evening = 17;
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "afternoon";
    } else if (currentHour >= split_evening) {
      g = "evening";
    } else {
      g = "morning";
    }

    return g;
  }

  renderView() {
    if (screenHeight == 749 && screenWidth == 411) {
      styles.welcomeCard = {
        top: "20%",
        backgroundColor: "white",
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        width: screenWidth - 30,
        height: 50,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            bottom: 30,
          },
          android: {
            elevation: 2,
            bottom: 15,
          },
          default: {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 2,
            bottom: 20,
          },
        }),
      };

      styles.logo = {
        top: "30%",
        width: 100,
        height: 100,
        alignContent: "center",
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            bottom: 25,
          },
          default: {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          },
        }),
      };

      styles.cardView = {
        top: "9%",
        backgroundColor: "white",
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        ...Platform.select({
          ios: {
            height: screenHeight - 300,
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          },
          android: {
            height: screenHeight - 230,
            elevation: 2,
          },
          default: {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 2,
          },
        }),
      };
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  cardView: {
    backgroundColor: "white",
    borderRadius: 5,
    top: 5,
    marginLeft: 15,
    marginRight: 15,
    ...Platform.select({
      ios: {
        height: screenHeight - 300,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        height: screenHeight - 230,
        elevation: 2,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
      },
    }),
  },
  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    width: screenWidth - 30,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        bottom: 30,
      },
      android: {
        elevation: 2,
        bottom: 15,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        bottom: 20,
      },
    }),
  },
  logo: {
    width: 100,
    height: 100,
    alignContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        bottom: 25,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
    }),
  },
});

export default HomeScreen;
